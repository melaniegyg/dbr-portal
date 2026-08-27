// ============================================================
// SUPPLIERS
// Loads the supplier manifest + per-supplier defect CSVs, wires the
// top-nav user element into a supplier switcher, and filters
// DEFECTS_DATA down to the flagged defects (with counts) for the
// selected supplier before handing off to renderDefectCards().
// ============================================================
(function () {
  "use strict";

  var MANIFEST_URL = "data/suppliers/suppliers.json";
  var SUPPLIER_DIR = "data/suppliers/";

  // --- tiny CSV parser ---------------------------------------
  // Handles quoted fields, embedded commas, escaped quotes ("")
  // and CRLF/LF. Returns an array of row-objects keyed by header.
  function parseCSV(text) {
    var rows = [];
    var row = [];
    var field = "";
    var inQuotes = false;
    text = text.replace(/^﻿/, ""); // strip BOM
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (inQuotes) {
        if (c === '"') {
          if (text[i + 1] === '"') { field += '"'; i++; }
          else inQuotes = false;
        } else field += c;
      } else if (c === '"') {
        inQuotes = true;
      } else if (c === ",") {
        row.push(field); field = "";
      } else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(field); field = "";
        if (row.length > 1 || row[0] !== "") rows.push(row);
        row = [];
      } else field += c;
    }
    if (field !== "" || row.length) { row.push(field); rows.push(row); }
    if (!rows.length) return [];
    var headers = rows[0].map(function (h) { return h.trim().toLowerCase(); });
    return rows.slice(1).map(function (r) {
      var obj = {};
      headers.forEach(function (h, idx) { obj[h] = (r[idx] || "").trim(); });
      return obj;
    });
  }

  // --- matching ----------------------------------------------
  var norm = function (s) {
    return String(s || "").toLowerCase().replace(/\s+/g, " ").trim();
  };

  var intOrNull = function (v) {
    var n = parseInt(v, 10);
    return isNaN(n) ? null : n;
  };

  // Which period's count the cards display. The "Key drivers" section is
  // scoped to the past 90 days, so default to defects_90d.
  function pickCount(r) {
    if (r.count !== undefined && r.count !== "") return intOrNull(r.count);
    var periods = [r.defects_90d, r.defects_60d, r.defects_30d,
                   r.reviews, r.bookings, r.volume, r.total];
    for (var i = 0; i < periods.length; i++) {
      if (periods[i] !== undefined && periods[i] !== "") return intOrNull(periods[i]);
    }
    return null;
  }

  // Build a lookup: normalized defect key -> { count, counts } from a CSV.
  // Accepts the canonical format (defect/defect_name/count) and the raw
  // Databricks export (final_tagging + defects_30d/60d/90d).
  function buildFlagged(csvRows) {
    var map = {};
    csvRows.forEach(function (r) {
      var entry = {
        count: pickCount(r),
        counts: { d30: intOrNull(r.defects_30d), d60: intOrNull(r.defects_60d), d90: intOrNull(r.defects_90d) },
      };
      [r.defect, r.final_tagging, r["defect_name"], r["defect name"], r.name].forEach(function (k) {
        if (k) map[norm(k)] = entry;
      });
    });
    return map;
  }

  // How many categories a CSV-backed supplier shows (top N by volume).
  var TOP_CATEGORIES = 3;

  // Filter DEFECTS_DATA to flagged categories/defects, annotating counts,
  // then keep only the top categories by total defect volume.
  function filterData(flagged) {
    var out = [];
    DEFECTS_DATA.forEach(function (cat) {
      var defects = [];
      cat.defects.forEach(function (d) {
        var hit = flagged[norm(d.defect)] || flagged[norm(d.name)];
        if (hit) {
          var copy = {};
          for (var k in d) copy[k] = d[k];
          copy.count = hit.count;
          defects.push(copy);
        }
      });
      if (defects.length) {
        var catCopy = {};
        for (var k in cat) catCopy[k] = cat[k];
        catCopy.defects = defects;
        catCopy._total = defects.reduce(function (s, d) { return s + (d.count || 0); }, 0);
        out.push(catCopy);
      }
    });
    // Rank by total volume, keep the top N, drop the rest.
    out.sort(function (a, b) { return b._total - a._total; });
    var top = out.slice(0, TOP_CATEGORIES);
    top.forEach(function (c) { delete c._total; });
    return top;
  }

  // --- disrupted-booking-rate stat ---------------------------
  // Driven by an optional per-supplier rate CSV
  // (tour_id,activity_title,period,total_bookings,defective_bookings,defect_rate_pct).
  var RECOMMENDED_MAX = 5; // % — the chart's recommended-max line
  var currentRates = null; // { 30:{rate,total,defective}, 60:{...}, 90:{...} }
  var origDbrValueHtml = null;
  var origActivityTitle = null;

  // Parse the rate CSV into { rates: {days:{...}}, activityTitle }.
  function parseRates(text) {
    var rates = {};
    var activityTitle = null;
    parseCSV(text).forEach(function (r) {
      if (!activityTitle && r["activity_title"]) activityTitle = r["activity_title"];
      var days = intOrNull((r.period || "").replace(/[^0-9]/g, ""));
      if (!days) return;
      rates[days] = {
        rate: parseFloat(r["defect_rate_pct"]),
        total: intOrNull(r["total_bookings"]),
        defective: intOrNull(r["defective_bookings"]),
      };
    });
    return { rates: rates, activityTitle: activityTitle };
  }

  function setActivityTitle(text) {
    var el = document.querySelector(".page-title");
    if (el && text) el.textContent = text;
  }

  function fmtRate(n) {
    return (Math.round(n * 100) / 100).toString();
  }

  // Update the "Disrupted booking rate" value + tag for a period (days).
  window.updateDbrRate = function (days) {
    var valueEl = document.querySelector(".dbr-card__value");
    if (!valueEl) return;
    if (!currentRates) {
      if (origDbrValueHtml != null) valueEl.innerHTML = origDbrValueHtml;
      return;
    }
    var r = currentRates[days] ||
      currentRates[90] || currentRates[60] || currentRates[30] ||
      currentRates[Object.keys(currentRates)[0]];
    if (!r || isNaN(r.rate)) { if (origDbrValueHtml != null) valueEl.innerHTML = origDbrValueHtml; return; }
    var atRisk = r.rate >= RECOMMENDED_MAX;
    valueEl.innerHTML = fmtRate(r.rate) + "% " +
      '<span class="dbr-tag ' + (atRisk ? "dbr-tag--risk" : "dbr-tag--good") + '">' +
      (atRisk ? "At risk" : "On track") + "</span>";
  };

  function currentPeriodDays() {
    return (typeof window.getDbrPeriodDays === "function") ? window.getDbrPeriodDays() : 90;
  }

  function applyRate(supplier) {
    if (!supplier.rateFile) {
      currentRates = null;
      window.updateDbrRate(currentPeriodDays()); // restores original value
      return;
    }
    fetch(SUPPLIER_DIR + supplier.rateFile)
      .then(function (r) { return r.text(); })
      .then(function (text) {
        var parsed = parseRates(text);
        currentRates = parsed.rates;
        window.updateDbrRate(currentPeriodDays());
        if (parsed.activityTitle) setActivityTitle(parsed.activityTitle);
      })
      .catch(function (err) {
        console.error("Failed to load rate CSV", err);
        currentRates = null;
        window.updateDbrRate(currentPeriodDays());
      });
  }

  // --- switcher UI -------------------------------------------
  var els = {};
  var suppliers = [];
  var current = null;

  function setUser(s) {
    if (els.name) els.name.textContent = s.name || "";
    if (els.company) els.company.textContent = s.company || "";
  }

  function openMenu(open) {
    if (!els.menu) return;
    els.menu.hidden = !open;
    els.switcher.setAttribute("aria-expanded", open ? "true" : "false");
    els.switcher.classList.toggle("is-open", open);
  }

  function buildMenu() {
    if (!els.menu) return;
    els.menu.innerHTML = "";
    suppliers.forEach(function (s) {
      var li = document.createElement("li");
      li.className = "supplier-menu__item";
      li.setAttribute("role", "option");
      li.tabIndex = 0;
      li.innerHTML =
        '<span class="supplier-menu__name">' + s.name + "</span>" +
        '<span class="supplier-menu__company">' + s.company + "</span>";
      var choose = function () { selectSupplier(s.id); openMenu(false); };
      li.addEventListener("click", choose);
      li.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(); }
      });
      els.menu.appendChild(li);
    });
  }

  function selectSupplier(id) {
    var s = suppliers.filter(function (x) { return x.id === id; })[0];
    if (!s) return;
    current = s;
    setUser(s);
    setActivityTitle(s.activityTitle || origActivityTitle);
    suppliers.forEach(function (x) {
      var i = suppliers.indexOf(x);
      var item = els.menu && els.menu.children[i];
      if (item) item.setAttribute("aria-selected", x.id === id ? "true" : "false");
    });
    if (s.allDefects) {
      // "Show everything" view — every category/defect, unfiltered.
      window.renderDefectCards(DEFECTS_DATA);
    } else {
      fetch(SUPPLIER_DIR + s.file)
        .then(function (r) { return r.text(); })
        .then(function (text) {
          var flagged = buildFlagged(parseCSV(text));
          window.renderDefectCards(filterData(flagged));
        })
        .catch(function (err) {
          console.error("Failed to load supplier CSV", err);
          window.renderDefectCards([]);
        });
    }

    applyRate(s); // update the disrupted-booking-rate stat card
  }

  function initSwitcher() {
    els.switcher = document.getElementById("supplier-switcher");
    els.name = document.getElementById("supplier-name");
    els.company = document.getElementById("supplier-company");
    els.menu = document.getElementById("supplier-menu");
    if (els.switcher) {
      els.switcher.addEventListener("click", function (e) {
        // ignore clicks that originated inside the menu items
        if (els.menu && els.menu.contains(e.target)) return;
        openMenu(els.menu.hidden);
      });
      document.addEventListener("click", function (e) {
        if (els.switcher && !els.switcher.contains(e.target)) openMenu(false);
      });
    }
  }

  // --- boot ---------------------------------------------------
  function boot() {
    initSwitcher();
    var dbrValue = document.querySelector(".dbr-card__value");
    if (dbrValue && origDbrValueHtml == null) origDbrValueHtml = dbrValue.innerHTML;
    var titleEl = document.querySelector(".page-title");
    if (titleEl && origActivityTitle == null) origActivityTitle = titleEl.textContent;
    if (typeof window.renderDefectCards !== "function") return;

    fetch(MANIFEST_URL)
      .then(function (r) { return r.json(); })
      .then(function (list) {
        suppliers = list || [];
        if (!suppliers.length) throw new Error("empty manifest");
        buildMenu();
        selectSupplier(suppliers[0].id);
      })
      .catch(function (err) {
        // Fallback (e.g. opened via file:// where fetch is blocked):
        // show the full unfiltered set so the page is not empty.
        console.warn("Supplier manifest unavailable, showing all defects.", err);
        if (typeof DEFECTS_DATA !== "undefined") window.renderDefectCards(DEFECTS_DATA);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else boot();
})();
