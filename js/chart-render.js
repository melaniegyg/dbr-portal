// ============================================================
// Disrupted-booking-rate chart renderer.
// Draws the line + amber-above-max area + x-axis labels from
// js/chart-data.js for the selected date range, and republishes
// the plotted points on window.DBR_CHART_STATE so
// js/chart-tooltip.js can hit-test against whatever is on screen.
// ============================================================
(function () {
  "use strict";

  const svg = document.querySelector(".dbr-card .line-chart");
  const areaPath = document.getElementById("dbr-area-path");
  const linePath = document.getElementById("dbr-line-path");
  const xAxisGroup = document.getElementById("dbr-x-axis");
  if (!svg || !areaPath || !linePath || !xAxisGroup) return;

  // Chart coordinate system (matches the SVG viewBox in index.html)
  const X0 = 60, X1 = 1130, BASE_Y = 180, PX_PER_PCT = 16;
  const NS = "http://www.w3.org/2000/svg";
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Last plotted day for every range, so ranges read as zooming out from "today".
  const END = new Date(2026, 6, 18); // Jul 18, 2026

  const RANGE_DESCRIPTIONS = {
    7: "the last 7 days",
    30: "the last 30 days",
    90: "the last 90 days",
    365: "the last 12 months",
  };

  const round1 = (n) => Math.round(n * 10) / 10;

  function pointDate(unit, stepsBack) {
    const d = new Date(END);
    if (unit === "day") d.setDate(d.getDate() - stepsBack);
    else if (unit === "week") d.setDate(d.getDate() - stepsBack * 7);
    else d.setMonth(d.getMonth() - stepsBack);
    return d;
  }

  const shortLabel = (date, unit) =>
    unit === "month"
      ? MONTHS[date.getMonth()] + " " + date.getFullYear()
      : MONTHS[date.getMonth()] + " " + date.getDate();

  const fullLabel = (date) =>
    MONTHS[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();

  // Catmull-Rom -> cubic Bezier smoothing through arbitrary points.
  function smoothPath(points) {
    let d = "M " + points[0].x + "," + points[0].y;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;
      const c1x = round1(p1.x + (p2.x - p0.x) / 6);
      const c1y = round1(p1.y + (p2.y - p0.y) / 6);
      const c2x = round1(p2.x - (p3.x - p1.x) / 6);
      const c2y = round1(p2.y - (p3.y - p1.y) / 6);
      d += " C " + c1x + "," + c1y + " " + c2x + "," + c2y + " " + round1(p2.x) + "," + round1(p2.y);
    }
    return d;
  }

  // A handful of evenly-spaced label indexes; label every point for short ranges.
  function labelIndexes(n) {
    if (n <= 8) return Array.from({ length: n }, (_, i) => i);
    const fractions = [0, 0.25, 0.5, 0.75, 1];
    return [...new Set(fractions.map((f) => Math.round(f * (n - 1))))];
  }

  // When a breach is not allowed, the line's peak is scaled to this value
  // so it stays just under the 5% recommended-max line.
  const CAP_PCT = 4.8;

  function render(days) {
    const ds = window.DBR_DATASETS[days];
    if (!ds) return;
    const n = ds.values.length;
    const step = (X1 - X0) / (n - 1);

    // New logic: the line may only rise above the 5% max when a breach is
    // allowed (set from the supplier's 30/60/90 numbers). Otherwise scale
    // the whole series down so its peak stays just below the max line.
    let values = ds.values;
    if (window.DBR_ALLOW_BREACH === false) {
      const peak = Math.max.apply(null, values);
      if (peak > CAP_PCT) {
        const f = CAP_PCT / peak;
        values = values.map((v) => round1(v * f));
      }
    }

    const points = values.map((v, i) => {
      const date = pointDate(ds.unit, n - 1 - i);
      return {
        x: round1(X0 + i * step),
        y: round1(BASE_Y - v * PX_PER_PCT),
        v: v,
        date: date,
        label: fullLabel(date),
      };
    });

    const curve = smoothPath(points);
    linePath.setAttribute("d", curve);
    areaPath.setAttribute(
      "d",
      curve + " L " + points[n - 1].x + "," + BASE_Y + " L " + points[0].x + "," + BASE_Y + " Z"
    );

    xAxisGroup.innerHTML = "";
    labelIndexes(n).forEach((i) => {
      const p = points[i];
      const text = document.createElementNS(NS, "text");
      text.setAttribute("x", String(p.x));
      text.setAttribute("y", "205");
      text.setAttribute("text-anchor", i === 0 ? "start" : i === n - 1 ? "end" : "middle");
      text.setAttribute("class", "chart-axis");
      text.textContent = shortLabel(p.date, ds.unit);
      xAxisGroup.appendChild(text);
    });

    svg.setAttribute(
      "aria-label",
      "Disrupted booking rate over " + (RANGE_DESCRIPTIONS[days] || "the selected period") +
        ", with a recommended maximum of 5%"
    );

    window.DBR_CHART_STATE = { points: points, X0: X0, X1: X1 };
    svg.dispatchEvent(new CustomEvent("dbr-chart:rendered"));
  }

  window.DBR_CHART = { render: render };
  render(30);
})();
