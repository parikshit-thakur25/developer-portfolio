#!/bin/bash
# ==============================================================================
# Parikshit Thakur Developer Portfolio — Automated Local Setup & Verification Script
# ==============================================================================

echo "============================================================"
echo "⚡ Parikshit Thakur — Developer Portfolio & Cyber Terminal"
echo "============================================================"
echo ""

# Check Python 3
if command -v python3 &>/dev/null; then
    echo "✅ Python 3 is installed."
else
    echo "⚠️ Python 3 not detected. Please install Python 3 or open index.html directly."
fi

# Check Git
if command -v git &>/dev/null; then
    echo "✅ Git is installed."
    echo "📍 Current Branch: $(git rev-parse --abbrev-ref HEAD)"
    echo "📍 Last Commit: $(git log -1 --pretty=format:'%h - %s (%cr)')"
else
    echo "⚠️ Git not detected."
fi

echo ""
echo "------------------------------------------------------------"
echo "🚀 Starting Local HTTP Server on http://localhost:8000 ..."
echo "------------------------------------------------------------"
echo "Press Ctrl+C to stop the server."
echo ""

python3 -m http.server 8000
