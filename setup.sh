#!/bin/bash
npm install
echo "GEMINI_API_KEY=your_api_key_here" > .env.local
npm run dev &
