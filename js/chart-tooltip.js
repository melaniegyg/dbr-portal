// ============================================================
// Disrupted-booking-rate chart hover tooltip
// Snaps to the nearest plotted point (published by js/chart-render.js
// on window.DBR_CHART_STATE), shows a dot + guide line on the chart
// and a popover with the date, that point's rate, and the
// recommended max (5%). Re-hides itself whenever the chart
// re-renders for a new date range.
// ============================================================
(function () {
  "use strict";

  const wrapper = document.querySelector(".dbr-card .chart-wrapper");
  if (!wrapper) return;
  const svg = wrapper.querySelector("svg");
  if (!svg) return;

  const RECOMMENDED_MAX = 5.0;
  const VB_W = 1150, VB_H = 230, BASE_Y = 180;

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

  function show(p) {
    const m = metrics();

    guide.setAttribute("x1", String(p.x));
    guide.setAttribute("x2", String(p.x));
    guide.style.display = "";
    dot.setAttribute("cx", String(p.x));
    dot.setAttribute("cy", String(p.y));
    dot.style.display = "";

    tt.innerHTML =
      '<div class="chart-tt__date">' + p.label + "</div>" +
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
    const state = window.DBR_CHART_STATE;
    if (!state || !state.points || !state.points.length) {
      hide();
      return;
    }
    const m = metrics();
    const mx = (e.clientX - m.r.left) / m.sx; // → SVG x
    const step = state.points.length > 1 ? (state.X1 - state.X0) / (state.points.length - 1) : 0;
    if (mx < state.X0 - step || mx > state.X1 + step) {
      hide();
      return;
    }
    let nearest = 0;
    let best = Infinity;
    for (let i = 0; i < state.points.length; i++) {
      const dist = Math.abs(state.points[i].x - mx);
      if (dist < best) {
        best = dist;
        nearest = i;
      }
    }
    show(state.points[nearest]);
  });
  svg.addEventListener("mouseleave", hide);
  svg.addEventListener("dbr-chart:rendered", hide);
})();
