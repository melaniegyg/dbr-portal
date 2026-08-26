// ============================================================
// Date-range picker → drives the chart card's date range label
// The "Last 30 days" control becomes a dropdown; selecting a
// range updates the .dbr-card__range text (anchored to Jul 19 2026).
// ============================================================
(function () {
  "use strict";

  const control = document.querySelector(".disrupted-controls .select-input");
  const rangeEl = document.querySelector(".dbr-card__range");
  if (!control || !rangeEl) return;
  const labelEl = control.querySelector("span");

  const END = new Date(2026, 6, 19); // Jul 19, 2026 (period anchor)
  const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fmt = (d) => MON[d.getMonth()] + " " + d.getDate();

  function rangeText(days) {
    const start = new Date(END);
    start.setDate(END.getDate() - days + 1);
    const sameYear = start.getFullYear() === END.getFullYear();
    const startStr = fmt(start) + (sameYear ? "" : " " + start.getFullYear());
    const endStr = fmt(END) + " " + END.getFullYear();
    return startStr + " – " + endStr;
  }

  const OPTIONS = [
    { label: "Last 7 days", days: 7 },
    { label: "Last 30 days", days: 30 },
    { label: "Last 90 days", days: 90 },
    { label: "Last 12 months", days: 365 },
  ];

  control.classList.add("select-input--interactive");
  control.setAttribute("role", "button");
  control.setAttribute("aria-haspopup", "listbox");
  control.setAttribute("aria-expanded", "false");

  const menu = document.createElement("ul");
  menu.className = "select-menu";
  menu.setAttribute("role", "listbox");
  menu.hidden = true;

  function close() {
    menu.hidden = true;
    control.classList.remove("is-open");
    control.setAttribute("aria-expanded", "false");
  }
  function open() {
    menu.hidden = false;
    control.classList.add("is-open");
    control.setAttribute("aria-expanded", "true");
  }

  OPTIONS.forEach((o) => {
    const li = document.createElement("li");
    li.className = "select-menu__item" + (o.label === labelEl.textContent ? " is-active" : "");
    li.setAttribute("role", "option");
    li.textContent = o.label;
    li.addEventListener("click", (e) => {
      e.stopPropagation();
      labelEl.textContent = o.label;
      rangeEl.textContent = rangeText(o.days);
      menu.querySelectorAll(".select-menu__item").forEach((x) => x.classList.remove("is-active"));
      li.classList.add("is-active");
      if (window.DBR_CHART) window.DBR_CHART.render(o.days);
      close();
    });
    menu.appendChild(li);
  });
  control.appendChild(menu);

  control.addEventListener("click", () => (menu.hidden ? open() : close()));
  document.addEventListener("click", (e) => {
    if (!control.contains(e.target)) close();
  });

  // Initialize the range label from the default selection.
  const def = OPTIONS.find((o) => o.label === labelEl.textContent) || OPTIONS[1];
  rangeEl.textContent = rangeText(def.days);
})();
