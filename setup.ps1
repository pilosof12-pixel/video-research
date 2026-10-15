# Setup for Windows (PowerShell). Run from repo root:  powershell -ExecutionPolicy Bypass -File .\setup.ps1
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
foreach ($c in "node","npx","git") { if (-not (Get-Command $c -ErrorAction SilentlyContinue)) { throw "Missing: $c (install Node 22+ and git)" } }
$major = [int](node -p "process.versions.node.split('.')[0]")
if ($major -lt 22) { throw "Node $major found; Node 22+ required." }
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) { Write-Warning "ffmpeg not found: winget install Gyan.FFmpeg" }

# --copy: Windows symlinks need admin/dev mode, so copy into each agent dir instead.
$agents = @("-a","claude-code","-a","cursor","-a","codex")
npx -y skills add heygen-com/hyperframes --skill '*' @agents -y --copy
npx -y skills add remotion-dev/skills --skill '*' @agents -y --copy
npx -y skills add https://github.com/greensock/gsap-skills --skill '*' @agents -y --copy

Push-Location remotion; npm install; npx tsc --noEmit; Pop-Location
Write-Host "Done. Copy mcp.example.json to .cursor\mcp.json / .mcp.json and add your ElevenLabs key. Start with prompts\00-full-reel.md"
