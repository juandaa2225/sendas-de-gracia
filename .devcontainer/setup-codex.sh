#!/usr/bin/env bash
set -euo pipefail

if ! command -v codex >/dev/null 2>&1; then
  echo "Codex CLI is not installed; skipping MCP setup."
  exit 0
fi

if codex mcp get playwright >/dev/null 2>&1; then
  echo "Codex Playwright MCP is already configured."
  exit 0
fi

echo "Configuring Codex Playwright MCP..."
codex mcp add playwright -- npx -y @playwright/mcp@latest --headless
