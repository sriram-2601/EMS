#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

# Restore exactly the dependencies committed by the merged task.
npm ci --no-audit --no-fund --include=dev

# Verify and rebuild both the client and server without altering database data.
npm run build
