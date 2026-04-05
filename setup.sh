#!/bin/bash
set -e

echo "Setting up Aesthetic Alchemy Lab..."

echo "1. Installing dependencies..."
npm install

echo "2. Setting up environment variables..."
if [ ! -f .env.local ]; then
  cat << 'ENVEOF' > .env.local
GEMINI_API_KEY=your_gemini_api_key_here
ENVEOF
  echo "Created .env.local template."
fi

echo "3. Starting development server..."
echo "Run 'npm run dev' to start the server."

echo "Setup complete."
