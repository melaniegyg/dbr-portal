#!/usr/bin/env python3
"""
sync-databricks.py — pull supplier defect data from Databricks and write the
per-supplier CSVs + manifest that the DBR portal reads at runtime.

WHY A SCRIPT (not a live call from the site): the portal is a public static
page. It cannot hold a Databricks token (it would be visible in "View Source")
and Databricks blocks anonymous browser (CORS) requests. So the data is pulled
here — locally or in CI — and committed as files the static site fetches.

WHAT IT WRITES (matches data/suppliers/README.md):
  data/suppliers/<supplier-id>.csv   columns: category,defect,defect_name,count
  data/suppliers/suppliers.json      [{ id, name, company, file }, ...]

SETUP
  pip install databricks-sql-connector
  export DATABRICKS_SERVER_HOSTNAME="dbc-d10db17d-b6c4.cloud.databricks.com"
  export DATABRICKS_HTTP_PATH="/sql/1.0/warehouses/xxxxxxxx"   # SQL warehouse
  export DATABRICKS_TOKEN="dapi........"                        # personal access token

  Then set QUERY below to a query that returns one row per (supplier, flagged
  defect) with these columns (aliases matter, order does not):
      supplier_id, supplier_name, supplier_company, category, defect, defect_name, count

USAGE
  python scripts/sync-databricks.py            # pull + write files
  python scripts/sync-databricks.py --dry-run  # print a summary, write nothing

NOTE: the token is read only from the environment — never hard-code it and never
commit it. In GitHub Actions, provide it via a repository secret.
"""

import argparse
import csv
import json
import os
import re
import sys
from collections import OrderedDict, defaultdict

# --- Edit this query for your dashboard/warehouse ----------------------------
# Must return the aliased columns listed in the SETUP docstring above.
QUERY = """
SELECT
    supplier_id,
    supplier_name,
    supplier_company,
    category,
    defect,
    defect_name,
    count
FROM your_catalog.your_schema.supplier_flagged_defects
WHERE count > 0
ORDER BY supplier_name, category, defect
"""

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(REPO_ROOT, "data", "suppliers")

REQUIRED_COLS = [
    "supplier_id", "supplier_name", "supplier_company",
    "category", "defect", "defect_name", "count",
]


def slugify(value):
    s = re.sub(r"[^a-z0-9]+", "-", str(value).strip().lower())
    return re.sub(r"(^-|-$)", "", s) or "supplier"


def fetch_rows():
    """Run QUERY against Databricks and return a list of dict rows."""
    try:
        from databricks import sql
    except ImportError:
        sys.exit("Missing dependency. Run: pip install databricks-sql-connector")

    host = os.environ.get("DATABRICKS_SERVER_HOSTNAME")
    http_path = os.environ.get("DATABRICKS_HTTP_PATH")
    token = os.environ.get("DATABRICKS_TOKEN")
    missing = [k for k, v in {
        "DATABRICKS_SERVER_HOSTNAME": host,
        "DATABRICKS_HTTP_PATH": http_path,
        "DATABRICKS_TOKEN": token,
    }.items() if not v]
    if missing:
        sys.exit("Missing env var(s): " + ", ".join(missing))

    with sql.connect(server_hostname=host, http_path=http_path, access_token=token) as conn:
        with conn.cursor() as cur:
            cur.execute(QUERY)
            cols = [c[0] for c in cur.description]
            return [dict(zip(cols, row)) for row in cur.fetchall()]


def group_by_supplier(rows):
    """Return OrderedDict: supplier_id -> {meta, rows[]} preserving first-seen order."""
    suppliers = OrderedDict()
    for r in rows:
        for c in REQUIRED_COLS:
            if c not in r:
                sys.exit("Query is missing required column: " + c +
                         "\nReturned columns: " + ", ".join(r.keys()))
        sid = slugify(r["supplier_id"] or r["supplier_name"])
        if sid not in suppliers:
            suppliers[sid] = {
                "id": sid,
                "name": (r["supplier_name"] or "").strip(),
                "company": (r["supplier_company"] or "").strip(),
                "file": sid + ".csv",
                "rows": [],
            }
        suppliers[sid]["rows"].append(r)
    return suppliers


def write_files(suppliers, dry_run=False):
    if not dry_run:
        os.makedirs(OUT_DIR, exist_ok=True)
    manifest = []
    for sid, s in suppliers.items():
        manifest.append({"id": s["id"], "name": s["name"],
                         "company": s["company"], "file": s["file"]})
        path = os.path.join(OUT_DIR, s["file"])
        print("  %-24s %3d defects -> %s" % (sid, len(s["rows"]), s["file"]))
        if dry_run:
            continue
        with open(path, "w", newline="", encoding="utf-8") as f:
            w = csv.writer(f)
            w.writerow(["category", "defect", "defect_name", "count"])
            for r in s["rows"]:
                w.writerow([r.get("category", ""), r.get("defect", ""),
                            r.get("defect_name", ""), r.get("count", "")])
    if not dry_run:
        with open(os.path.join(OUT_DIR, "suppliers.json"), "w", encoding="utf-8") as f:
            json.dump(manifest, f, indent=2, ensure_ascii=False)
            f.write("\n")
    print("\n%s %d supplier(s), %d rows total."
          % ("Would write" if dry_run else "Wrote",
             len(suppliers), sum(len(s["rows"]) for s in suppliers.values())))


def main():
    ap = argparse.ArgumentParser(description="Sync supplier defect CSVs from Databricks.")
    ap.add_argument("--dry-run", action="store_true", help="print summary, write nothing")
    args = ap.parse_args()

    print("Querying Databricks...")
    rows = fetch_rows()
    if not rows:
        sys.exit("Query returned no rows.")
    suppliers = group_by_supplier(rows)
    write_files(suppliers, dry_run=args.dry_run)


if __name__ == "__main__":
    main()
