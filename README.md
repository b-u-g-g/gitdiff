# GitDiff - Code Comparison Tool

A professional code comparison tool with a clean interface featuring:
- Black top bar with white text
- Navy blue background
- Large grey editor boxes (side-by-side)
- Powered by Monaco Editor (VS Code's editor)

## Features
- Side-by-side code editing
- Visual diff comparison
- Swap panels
- Reset functionality
- Syntax highlighting
- Minimap support

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The app will open automatically at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

## Usage
1. Paste your original code in the left editor
2. Paste your modified code in the right editor
3. Click "Compare" to see the diff view
4. Use "Swap" to exchange left/right content
5. Use "Reset" to clear both editors

## Technologies Used
- React 18
- Vite
- Monaco Editor
- Tailwind CSS
- Lucide Icons
