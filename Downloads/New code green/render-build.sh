#!/bin/bash
# Build script for Render
set -e

echo "Current directory: $(pwd)"
echo "Checking for package.json..."
if [ ! -f "package.json" ]; then
  echo "ERROR: package.json not found in $(pwd)"
  echo "Available files:"
  ls -la
  exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building React app..."
npm run build

echo "✅ Build complete!"

