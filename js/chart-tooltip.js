// ============================================================
// Disrupted-booking-rate chart hover tooltip
// Snaps to the nearest daily data point, shows a dot + guide
// line on the chart and a popover with the date, that day's
// rate, and the recommended max (5%).
// ============================================================
(function () {
  "use strict";

  const wrapper = document.querySelector(".dbr-card .chart-wrapper");
  if (!wrapper) return;
  const svg = wrapper.querySelector("svg");
  if (!svg) return;

  const RECOMMENDED_MAX = 5.0;

  // Sample daily rates (%) matching the drawn curve, Jun 20 → Jul 18 2026.
  const VALUES = [
    0.2, 1.5, 5.5, 8.3, 8.0, 5.5, 2.5, 2.0, 5.0, 8.5, 8.0, 5.0, 3.0, 2.2, 2.0,
    2.1, 2.4, 2.9, 3.5, 4.2, 4.7, 5.0, 5.5, 6.0, 6.4, 6.7, 6.9, 7.0, 7.1,
  ];

  // Chart coordinate system (matches the SVG in index.html)
  const X0 = 60, X1 = 1130, BASE_Y = 180, PX_PER_PCT = 16;
  const VB_W = 1150, VB_H = 230;
  const n = VALUES.length;
  const step = (X1 - X0) / (n - 1);

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const start = new Date(2026, 5, 20); // Jun 20 2026
  const points = VALUES.map((v, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return {
      x: X0 + i * step,
      y: BASE_Y - v * PX_PER_PCT,
      v: v,
      date: MONTHS[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear(),
    };
  });

  const fmtPct = (v) => (v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)) + "%";

  // --- SVG guide line + dot ---
  const NS = "http://www.w3.org/2000/svg";
  const guide = document.createElementNS(NS, "line");
  guide.setAttribute("stroke", "#c9ced6");
  guide.setAttribute("stroke-width", "1");
  guide.setAttribute("y1", "20");
  guide.setAttribute("y2", String(BASE_Y));
  guide.setAttribute("pointer-events", "none");
  guide.style.display = "none";

  const dot = document.createElementNS(NS, "circle");
  dot.setAttribute("r", "5");
  dot.setAttribute("fill", "#1a2b49");
  dot.setAttribute("stroke", "#ffffff");
  dot.setAttribute("stroke-width", "2");
  dot.setAttribute("pointer-events", "none");
  dot.style.display = "none";

  svg.appendChild(guide);
  svg.appendChild(dot);

  // --- HTML tooltip ---
  wrapper.style.position = "relative";
  const tt = document.createElement("div");
  tt.className = "chart-tt";
  tt.style.display = "none";
  wrapper.appendChild(tt);

  function metrics() {
    const r = svg.getBoundingClientRect();
    return { r: r, sx: r.width / VB_W, sy: r.height / VB_H };
  }

  function show(i) {
    const p = points[i];
    const m = metrics();

    guide.setAttribute("x1", String(p.x));
    guide.setAttribute("x2", String(p.x));
    guide.style.display = "";
    dot.setAttribute("cx", String(p.x));
    dot.setAttribute("cy", String(p.y));
    dot.style.display = "";

    tt.innerHTML =
      '<div class="chart-tt__date">' + p.date + "</div>" +
      '<div class="chart-tt__value">' + fmtPct(p.v) + "</div>" +
      '<div class="chart-tt__label">Recommended max</div>' +
      '<div class="chart-tt__max">' + RECOMMENDED_MAX.toFixed(1) + "%</div>";
    tt.style.display = "block";

    const px = p.x * m.sx;
    const py = p.y * m.sy;
    const tw = tt.offsetWidth;
    const th = tt.offsetHeight;
    let left = px + 16;
    if (left + tw > m.r.width) left = px - tw - 16;
    if (left < 0) left = 8;
    let top = py - th / 2;
    if (top < 0) top = 8;
    if (top + th > m.r.height) top = m.r.height - th - 8;
    tt.style.left = left + "px";
    tt.style.top = top + "px";
  }

  function hide() {
    guide.style.display = "none";
    dot.style.display = "none";
    tt.style.display = "none";
  }

  svg.addEventListener("mousemove", function (e) {
    const m = metrics();
    const mx = (e.clientX - m.r.left) / m.sx; // → SVG x
    if (mx < X0 - step || mx > X1 + step) {
      hide();
      return;
    }
    let i = Math.round((mx - X0) / step);
    i = Math.max(0, Math.min(n - 1, i));
    show(i);
  });
  svg.addEventListener("mouseleave", hide);
})();
