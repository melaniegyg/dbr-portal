# DBR Portal — Disrupted Bookings concept

A static, front-end prototype of the **Performance Hub → Disrupted bookings** view for the
GetYourGuide Supplier Portal. Built to explore the "disrupted bookings" experience: a
disrupted-booking-rate chart with a recommended-max threshold, and a data-driven **Key drivers**
section where each defect category expands to show what suppliers can do, recommended actions,
and FAQ resources.

## Running it

It's plain HTML/CSS/JS — no build step. Serve the folder over HTTP and open `index.html`:

```bash
python3 -m http.server 8123
# then open http://localhost:8123/index.html
```

## Structure

| Path | Purpose |
|------|---------|
| `index.html` | Page markup: top nav, tabs, Disrupted bookings header + chart, Key drivers |
| `css/tokens.css` | GYG design tokens (colors, type, radii) + fonts |
| `css/styles.css` | Component styles |
| `js/defects-data.js` | Categories / defects / recommendations / FAQ links (from the source sheet) |
| `js/defects-render.js` | Renders the Key drivers category cards + recommended-action variant |
| `js/chart-tooltip.js` | Hover tooltip for the disrupted-booking-rate chart |
| `js/date-range.js` | Date-range picker that drives the chart's date label |
| `js/interactions.js` | Misc UI interactions |
| `assets/` | Logo + GT Eesti Pro Display fonts |

## Notes

Icons are inlined from GetYourGuide's design system (`@getyourguide/compass`). Content and
designs are derived from internal Figma files and a source spreadsheet. **Internal use only.**
