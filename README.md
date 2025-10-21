<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Aesthetic Alchemy Lab

This repository contains the source code for the Aesthetic Alchemy Lab, a web application that allows you to explore the creative potential of generative AI. By systematically varying aesthetic parameters such as style, lighting, and composition, you can discover unique visual styles and generate a "style blueprint" to guide future creative work.

View your app in AI Studio: https://ai.studio/apps/drive/1dZuGRJmxlIyKPy_XGCpFf5NHAE5c6r0a

## Features

*   **Systematic Exploration:** Instead of relying on trial-and-error, the Aesthetic Alchemy Lab allows you to systematically explore the effect of different aesthetic parameters on a base prompt.
*   **Style Blueprint Generation:** By rating the generated images, you can create a "style blueprint" that captures the essence of a particular aesthetic. This blueprint can be used as a starting point for future creative work.
*   **Prompt History and Presets:** The application keeps a history of your prompts and allows you to save your favorite prompt configurations as presets.
*   **Example Prompts:** A curated list of example prompts is provided to help you get started.

## Run Locally

**Prerequisites:**

*   Node.js
*   npm

**Instructions:**

1.  Clone the repository:
    `git clone https://github.com/your-username/aesthetic-alchemy-lab.git`
2.  Install dependencies:
    `npm install`
3.  Create a `.env.local` file in the root of the project and add your Gemini API key:
    `GEMINI_API_KEY=your-api-key`
4.  Run the app:
    `npm run dev`

The application will be available at `http://localhost:3000`.

## Usage

1.  Enter a base prompt in the "Enter your core subject" text area.
2.  Choose a parameter to vary from the "Choose a parameter to vary" dropdown.
3.  Select one or more variations from the list of available options.
4.  Adjust the creativity (temperature) and seed (optional) to your liking.
5.  Click the "Generate" button to generate the images.
6.  Rate the generated images to create a style blueprint.
7.  Copy the style blueprint to your clipboard to use in other applications.

## Project Structure

The project is structured as follows:

*   `src/components`: Contains the React components that make up the UI.
*   `src/data`: Contains the example prompts.
*   `src/services`: Contains the logic for interacting with the Gemini API.
*   `src/types`: Contains the TypeScript types used throughout the application.
*   `public`: Contains the static assets for the application.
*   `index.html`: The entry point of the application.
*   `vite.config.ts`: The configuration for Vite.
*   `tsconfig.json`: The configuration for TypeScript.
*   `package.json`: The project's dependencies and scripts.
*   `README.md`: This file.
