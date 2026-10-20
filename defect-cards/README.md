# Defect Cards — portable module

A dependency-free renderer for the collapsible "category → defects" cards
(advice, FAQ resources, Recommended Action card, and CTA buttons), extracted
from the DBR portal. No build step, no framework, no globals required — two
files and one function call.

## Files

| file               | what it is                                                  |
| ------------------ | ----------------------------------------------------------- |
| `defect-cards.js`  | the renderer — exposes `window.DefectCards`                  |
| `defect-cards.css` | all card styles, with the GYG design tokens bundled in       |
| `sample-data.js`   | example data covering every card variation                  |
| `example.html`     | a minimal working page — open it to see the cards            |

Copy `defect-cards.js` and `defect-cards.css` into the other project. That's it.

## Usage

```html
<link rel="stylesheet" href="defect-cards.css">
<div id="cards"></div>
<script src="defect-cards.js"></script>
<script>
  DefectCards.render("#cards", DATA);
</script>
```

`DefectCards.render(target, data, options)`
- **target** — a DOM element or a CSS selector string.
- **data** — array of categories (below).
- **options** *(optional)* —
  - `raCopy` — override the Recommended-Action copy map (see below).
  - `accordion` — `true` (default) opens one category at a time; `false` lets each toggle independently.
  - `emptyText` — message shown when `data` is empty.

Call `render` again any time to re-render (e.g. after filtering the data).

## Data shape

```js
[
  {
    category: "Activity not as advertised",   // card title + picks the icon
    defects: [
      {
        name: "Activity not as described",     // defect title (required)
        description: "The activity delivered…",// subtitle
        recAction: "Booking defect - Not as advertised", // key into the RA copy map
        recommendations: ["bullet 1", "bullet 2"],       // "What you can do"
        relatedReviews: true,                  // shows "See related reviews"
        faqLinks: [                            // URLs → links; plain strings → labels
          "https://…/Adding-Description…",
          "Introducing Meeting Point Pictures" // label-only (no URL)
        ],
        pageLinkLabel: "Review activity details", // CTA button label ("" = none)
        count: 8                               // optional; fills {count} in the RA title
      }
    ]
  }
]
```

### What each field drives (the card variation matrix)

- **recommendations** → the "What you can do" list (always shown; falls back to generic copy if empty).
- **faqLinks** → the "FAQ resources" column (only when non-empty).
- **recAction** → a **Recommended Action card** at the bottom, *only* when the value is a key in the RA copy map. When shown, it replaces the CTA buttons.
- **relatedReviews** / **pageLinkLabel** → the bottom button row ("See related reviews" / your CTA label) — shown only when there is **no** RA card.
- **count** → injected wherever the RA title contains `{count}` (falls back to "recent" if omitted).

## Recommended Action copy

The RA card's title/description/button/icon come from a map keyed by
`recAction`. The default (GYG) map is `DefectCards.DEFAULT_RA_COPY`. Override it:

```js
DefectCards.render("#cards", DATA, {
  raCopy: {
    "my-action-key": {
      title: "Address {count} reviews about X",
      description: "Do this to fix it.",
      buttonLabel: "Take action",
      icon: "<svg …></svg>"   // optional
    }
  }
});
```

A defect only shows an RA card if its `recAction` exists in this map.

## Icons & fonts

- **Category icons** are built in (GYG compass set), chosen by the exact `category`
  string. Unknown categories get a default icon — extend `CATEGORY_ICONS` in
  `defect-cards.js` to add more.
- **Fonts**: the styles reference "GT Eesti Pro Display". If the host page ships
  the GYG webfont, cards match exactly; otherwise they fall back to the system
  sans-serif stack automatically.

## Not included (intentionally)

This is *only* the card rendering. The DBR portal's supplier switcher, CSV
parsing, counts/filtering, and the disrupted-booking-rate chart are separate and
not part of this module — feed the renderer whatever `data` array you build.
