#!/usr/bin/env bash
# Setup for macOS/Linux. Run from the repo root: ./setup.sh
set -euo pipefail
cd "$(dirname "$0")"

need() { command -v "$1" >/dev/null 2>&1 || { echo "Missing: $1 — $2"; exit 1; }; }
need node "install Node 22+ from https://nodejs.org"
need npx  "comes with Node"
need git  "install git"
MAJOR=$(node -p 'process.versions.node.split(".")[0]')
if [ "$MAJOR" -lt 22 ]; then echo "Node $MAJOR found; Node 22+ required (skills CLI + HyperFrames)."; exit 1; fi
command -v ffmpeg >/dev/null || echo "WARN: ffmpeg not found (needed for cutting/audio). mac: brew install ffmpeg | linux: apt install ffmpeg"

# One source of truth: .agents/skills (Cursor + Codex read it). Claude Code gets symlinks in .claude/skills.
AGENTS=(-a claude-code -a cursor -a codex)
echo ">> HyperFrames skills"
npx -y skills add heygen-com/hyperframes --skill '*' "${AGENTS[@]}" -y
echo ">> Remotion skills"
npx -y skills add remotion-dev/skills --skill '*' "${AGENTS[@]}" -y
echo ">> GSAP skills"
npx -y skills add https://github.com/greensock/gsap-skills --skill '*' "${AGENTS[@]}" -y

# Fallback: if Claude dir is missing, link it to the shared folder.
if [ -d .agents/skills ] && [ ! -e .claude/skills ]; then mkdir -p .claude && ln -s ../.agents/skills .claude/skills; fi

echo ">> Remotion project deps"
(cd remotion && npm install)
(cd remotion && npx tsc --noEmit && echo "Typecheck OK")

[ -f .cursor/mcp.json ] || { mkdir -p .cursor; echo "TIP: copy mcp.example.json to .cursor/mcp.json / .mcp.json and add your ElevenLabs key"; }
echo "Done. Open the folder in Cursor / Claude Code / Codex and start with prompts/00-full-reel.md"
