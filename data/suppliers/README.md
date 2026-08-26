# Supplier defect data

Each supplier is one CSV of the defects flagged for them, read by the portal at
runtime to filter the category cards. **These starter files are mock samples** —
replace them with real exports from the Databricks dashboard (manual export now,
or `scripts/sync-databricks.py` later).

## CSV format

One row per flagged defect. Recognised columns (case-insensitive, tolerant):

| column        | required | purpose                                                        |
| ------------- | -------- | -------------------------------------------------------------- |
| `defect`      | yes\*    | internal defect key — matched against `DEFECT` in the CLAUDE MAP |
| `defect_name` | yes\*    | supplier-facing defect name — used as a fallback match key      |
| `category`    | no       | informational / disambiguation                                 |
| `count`       | no       | volume shown on the card (e.g. "Address {count} reviews…")      |

\* at least one of `defect` / `defect_name` must be present; matching is
normalised (trim + lowercase). Extra columns are ignored.

## Registering a supplier

Add the CSV here and one entry to `suppliers.json`:

```json
{ "id": "acme-tours", "name": "Jane", "company": "Acme Tours", "file": "acme-tours.csv" }
```

`id` must be unique; `name` + `company` show in the top-nav switcher; `file` is
the CSV filename in this folder.
