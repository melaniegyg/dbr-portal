// ============================================================
// Disrupted-booking-rate series for each date-range option.
// Each series' last point is "today" (Jul 18, 2026), so switching
// ranges reads as zooming the same trend out, not jumping to
// unrelated data. Consumed by js/chart-render.js.
// ============================================================
window.DBR_DATASETS = {
  7: {
    unit: "day",
    values: [5.5, 6.0, 6.4, 6.7, 6.9, 7.0, 7.1],
  },
  30: {
    unit: "day",
    values: [
      0.2, 1.5, 5.5, 8.3, 8.0, 5.5, 2.5, 2.0, 5.0, 8.5, 8.0, 5.0, 3.0, 2.2,
      2.0, 2.1, 2.4, 2.9, 3.5, 4.2, 4.7, 5.0, 5.5, 6.0, 6.4, 6.7, 6.9, 7.0, 7.1,
    ],
  },
  90: {
    unit: "week",
    values: [3.5, 4.0, 6.5, 8.5, 8.0, 5.0, 4.0, 3.0, 2.0, 3.0, 5.0, 6.5, 7.1],
  },
  365: {
    unit: "month",
    values: [3.0, 3.5, 4.5, 6.0, 7.5, 8.0, 6.5, 5.0, 4.0, 5.5, 6.5, 7.1],
  },
};
