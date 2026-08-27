# Supplier defect data

Each supplier is one CSV of the defects flagged for them, read by the portal at
runtime to filter the category cards. **These starter files are mock samples** —
replace them with real exports from the Databricks dashboard (manual export now,
or `scripts/sync-databricks.py` later).

## CSV format

One row per flagged defect. Recognised columns (case-insensitive, tolerant):

| column          | required | purpose                                                          |
| --------------- | -------- | ---------------------------------------------------------------- |
| `defect`        | yes\*    | internal defect key — matched against `DEFECT` in the CLAUDE MAP |
| `final_tagging` | yes\*    | same as `defect` — the raw Databricks export column name         |
| `defect_name`   | yes\*    | supplier-facing defect name — used as a fallback match key       |
| `category`      | no       | informational / disambiguation                                  |
| `count`         | no       | volume shown in the Recommended Action title                     |
| `defects_90d` / `defects_60d` / `defects_30d` | no | raw export counts; the cards use **90d** (the "past 90 days" section) |

\* at least one of `defect` / `final_tagging` / `defect_name` must be present;
matching is normalised (trim + lowercase). Extra columns are ignored.

Two shapes are accepted: the canonical `category,defect,defect_name,count`, and
the raw Databricks tagging export `final_tagging,defects_30d,defects_60d,defects_90d`
(dropped in as-is — see `tina.csv`).

## Registering a supplier

Add the CSV here and one entry to `suppliers.json`:

```json
{ "id": "acme-tours", "name": "Jane", "company": "Acme Tours", "file": "acme-tours.csv" }
```

`id` must be unique; `name` + `company` show in the top-nav switcher; `file` is
the CSV filename in this folder.
