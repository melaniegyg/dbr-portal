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

  // Build a lookup: normalized defect key -> { count } from a CSV.
  function buildFlagged(csvRows) {
    var map = {};
    csvRows.forEach(function (r) {
      var count = parseInt(
        r.count || r.reviews || r.bookings || r.volume || r.total || "",
        10
      );
      var entry = { count: isNaN(count) ? null : count };
      [r.defect, r["defect_name"], r["defect name"], r.name].forEach(function (k) {
        if (k) map[norm(k)] = entry;
      });
    });
    return map;
  }

  // Filter DEFECTS_DATA to flagged categories/defects, annotating counts.
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
        out.push(catCopy);
      }
    });
    return out;
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
    suppliers.forEach(function (x) {
      var i = suppliers.indexOf(x);
      var item = els.menu && els.menu.children[i];
      if (item) item.setAttribute("aria-selected", x.id === id ? "true" : "false");
    });
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
