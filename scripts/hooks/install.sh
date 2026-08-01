#!/usr/bin/env bash
# Install this repo's git hooks (LAT-1878).
#
# Hooks live in scripts/hooks/ (tracked) and are symlinked into .git/hooks/
# (untracked). Symlink rather than copy, so an updated hook takes effect on the
# next pull instead of silently running a stale version — a hook that everyone
# has a different copy of is worse than no hook.
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
SRC="$REPO/scripts/hooks"
DST="$REPO/.git/hooks"

[ -d "$DST" ] || { echo "no .git/hooks — not a git checkout?" >&2; exit 1; }

for hook in pre-push; do
    if [ -e "$DST/$hook" ] && [ ! -L "$DST/$hook" ]; then
        echo "backing up existing $hook -> $hook.bak"
        mv "$DST/$hook" "$DST/$hook.bak"
    fi
    ln -sf "../../scripts/hooks/$hook" "$DST/$hook"
    chmod +x "$SRC/$hook"
    echo "installed: .git/hooks/$hook -> scripts/hooks/$hook"
done

echo
echo "Verify with:  python3 scripts/check-docs-drift.py"
echo "Bypass once:  git push --no-verify"
