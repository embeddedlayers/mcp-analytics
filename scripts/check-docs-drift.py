#!/usr/bin/env python3
"""
Verify this repo's public docs against the live platform.

WHY THIS EXISTS (LAT-1878)
--------------------------
The signup grant has been wrong in public twice:

  LAT-1680 (2026-07-27)  hardcoded in 7 places in the API; when LAT-1485 cut the
                         grant 2,000 -> 500, two were missed. For nine days the
                         first sentence many prospects read promised 4x the real
                         amount. Fixed, and gated by an invariant test.
  LAT-1876 (2026-08-01)  the same stale 2,000, in 6 files across 2 PUBLIC repos
                         — including the github.com/embeddedlayers org landing
                         page. Nineteen days after the API was fixed and gated.

The gate is exactly why the first stayed fixed and the second did not. The root
cause is not that someone forgot: a doc author had no way to DERIVE the number,
because the source of truth (Postgres config.platform) sits behind a tunnel this
repo's CI cannot and should not reach.

So the API now PUBLISHES the figure on a public, unauthenticated endpoint, and
this script checks the docs against it. No secrets, no DB, no tunnel.

DESIGN NOTES — the failure modes this is shaped around
------------------------------------------------------
* A check that passes because it found nothing to compare is worse than no
  check: it reports green forever while the docs rot. If the docs are reworded
  so no figure is found, this FAILS (see --expect-min).
* A check that passes because the endpoint was unreachable is the same bug in a
  different coat. A non-200 is a hard failure, never a skip.
* Only claims that are actually derivable are checked. Adding a rule here for
  something the platform does not publish would recreate the original problem.

Usage:
    python3 scripts/check-docs-drift.py
    python3 scripts/check-docs-drift.py --api https://api.mcpanalytics.ai
    python3 scripts/check-docs-drift.py --root .

Exit codes:
    0  docs agree with the platform
    1  drift found, or nothing found to compare, or the platform was unreachable
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

DEFAULT_API = "https://api.mcpanalytics.ai"
TIERS_PATH = "/api/v1/pipeline/tiers"

# Files whose customer-facing claims must track the platform. Paths are relative
# to --root. A missing file is not an error (the repo layout may change) but is
# reported, because a silently-vanished file means silently-dropped coverage.
DOC_FILES = [
    "README.md",
    "docs/pricing.md",
    "docs/quickstart.md",
    "CHANGELOG.md",
    ".github/profile/README.md",
]

# Any "<number> welcome credits" / "welcome credits: <number>" style claim.
# Deliberately loose on surrounding markdown (**bold**, links) and tight on the
# noun, so a reworded sentence is still caught but a dollar figure is not.
WELCOME_RE = re.compile(
    r"\*{0,2}([0-9][0-9,]*)\*{0,2}\s+(?:free\s+)?welcome\s+credits",
    re.IGNORECASE,
)

# Retired tiers must never reappear in customer-facing copy or the registry
# listing. atlas/stats/survey/capstone were retired 2026-07-09; a copy-pasteable
# example naming one is an instant, confusing failure for the reader.
RETIRED_TIERS = ("atlas", "capstone")


def fetch_platform(api_base: str) -> dict:
    """Fetch live platform facts. A non-200 is fatal, never a skip."""
    url = api_base.rstrip("/") + TIERS_PATH
    try:
        req = urllib.request.Request(
            url, headers={"User-Agent": "mcp-analytics-docs-drift/1.0"})
        with urllib.request.urlopen(req, timeout=20) as r:
            if r.status != 200:
                raise RuntimeError(f"HTTP {r.status}")
            return json.load(r)
    except (urllib.error.URLError, urllib.error.HTTPError,
            TimeoutError, OSError, ValueError) as e:
        print(f"FATAL: could not read {url}: {e}", file=sys.stderr)
        print("       Refusing to pass — an unreachable platform is not "
              "evidence that the docs are correct.", file=sys.stderr)
        raise SystemExit(1)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--api", default=DEFAULT_API, help="API base URL")
    ap.add_argument("--root", default=str(Path(__file__).resolve().parent.parent),
                    help="repo root to check")
    ap.add_argument("--expect-min", type=int, default=1,
                    help="fail if fewer than N claims were found to compare "
                         "(guards against a vacuous pass)")
    args = ap.parse_args()

    root = Path(args.root).resolve()
    platform = fetch_platform(args.api)

    welcome = platform.get("welcome_credits")
    if welcome is None:
        print("FATAL: the platform did not publish 'welcome_credits'.",
              file=sys.stderr)
        print("       That key is what this check compares against (LAT-1878). "
              "Without it this script can only pass vacuously, so it fails "
              "instead.", file=sys.stderr)
        return 1
    live_tiers = {t["tier_key"] for t in platform.get("tiers", [])}

    print(f"platform: welcome_credits={welcome}  tiers={sorted(live_tiers)}")
    print()

    problems: list[str] = []
    claims_checked = 0
    missing_files: list[str] = []

    for rel in DOC_FILES:
        path = root / rel
        if not path.is_file():
            missing_files.append(rel)
            continue
        text = path.read_text(encoding="utf-8")

        for m in WELCOME_RE.finditer(text):
            claims_checked += 1
            claimed = int(m.group(1).replace(",", ""))
            line = text[:m.start()].count("\n") + 1
            if claimed != welcome:
                problems.append(
                    f"{rel}:{line}: claims {claimed:,} welcome credits, "
                    f"platform grants {welcome:,}")

        for tier in RETIRED_TIERS:
            for m in re.finditer(rf"\btier\s*=\s*['\"]{tier}['\"]", text):
                line = text[:m.start()].count("\n") + 1
                problems.append(
                    f"{rel}:{line}: uses retired tier '{tier}' "
                    f"(live: {sorted(live_tiers)})")

    if missing_files:
        print(f"note: {len(missing_files)} listed doc(s) not present: "
              f"{', '.join(missing_files)}")

    print(f"checked {claims_checked} welcome-credit claim(s) across "
          f"{len(DOC_FILES) - len(missing_files)} file(s)")

    # VACUOUS-PASS GUARD. If a rewording means we found nothing to compare, this
    # script would otherwise report success forever while the docs drift freely.
    if claims_checked < args.expect_min:
        print()
        print(f"FAIL: found only {claims_checked} claim(s) to compare, "
              f"expected at least {args.expect_min}.", file=sys.stderr)
        print("      This is a FAILURE, not a pass: either the docs stopped "
              "stating the grant, or WELCOME_RE no longer matches how they "
              "state it. Both mean this check has gone blind.", file=sys.stderr)
        return 1

    if problems:
        print()
        print("DRIFT:", file=sys.stderr)
        for p in problems:
            print(f"  {p}", file=sys.stderr)
        print(file=sys.stderr)
        print(f"FIX: the platform is the source of truth. Read it with:",
              file=sys.stderr)
        print(f"  curl -s {args.api}{TIERS_PATH} | "
              f"python3 -c \"import json,sys;print(json.load(sys.stdin)['welcome_credits'])\"",
              file=sys.stderr)
        return 1

    print("OK — docs agree with the platform.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
