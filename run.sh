#!/usr/bin/env bash
set -e

echo "installing dependencies..."
npm install --silent

echo "converting articles..."
node scripts/tex2html.mjs

echo "building..."
npm run build --silent

echo "done. starting preview server..."
echo ""

npx vite preview --open
