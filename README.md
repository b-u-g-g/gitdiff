
# GitDiff – Understand Code Changes, Not Just See Them

GitDiff is a lightweight web tool for comparing two versions of code and understanding what actually changed.
Instead of scanning raw diffs, developers get a clean, side-by-side view with clear visual differences to speed up reviews, debugging, and learning.

**Live demo:** [https://gitdiff.vercel.app/](https://gitdiff.vercel.app/)

---

# Why this exists

Standard diff tools show *what changed*.
But during reviews or debugging, the real question is:

> What does this change actually do?

GitDiff was built to make code comparison faster, clearer, and distraction-free. The focus is on simplicity, speed, and a clean developer experience.

---

## Key Features

* Side-by-side code editors
* Visual diff highlighting (additions, deletions, modifications)
* Syntax highlighting for multiple languages
* Monaco Editor (same editor that powers VS Code)
* Minimap for large files
* Swap panels (quick left/right comparison)
* Reset editors instantly
* Clean, distraction-free UI

---

## Tech Stack

* React 18
* Vite
* Monaco Editor
* Tailwind CSS
* Lucide Icons

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run locally

```bash
npm run dev
```

Open:
[http://localhost:5173](http://localhost:5173)

## How to Use

1. Paste original code into the **left editor**
2. Paste modified code into the **right editor**
3. Click **Compare**
4. View highlighted changes
5. Use:

   * **Swap** to exchange editors
   * **Reset** to clear both sides

---

## Product Thinking (PM Perspective)

### Target Users

* Developers reviewing pull requests
* Students learning code changes
* Engineers debugging regressions
* Anyone comparing code snippets quickly without setting up a repo

### Design Principles

* **Zero friction** – paste and compare instantly
* **Local-first experience** – no repo setup required
* **Fast rendering** for large files
* **Familiar environment** using Monaco (VS Code feel)

---

## Key Trade-offs

**1. Simplicity vs. Deep Git Integration**
Chosen: paste-based comparison
Trade-off: No repo/branch support
Reason: Faster usage, no authentication or setup

**2. Client-side Processing vs. Server Diff**
Chosen: client-side
Trade-off: Limited by browser memory
Benefit: Faster, private, and no backend cost

**3. Monaco Editor vs. Lightweight Editor**
Chosen: Monaco
Trade-off: Larger bundle size
Benefit: Professional editing experience and reliability

**4. Minimal UI vs. Feature-heavy Tool**
Chosen: clean interface
Trade-off: fewer advanced controls
Benefit: faster learning curve and better usability

---

## Limitations

* No direct GitHub/Git integration
* No file history or version tracking
* Performance may degrade with extremely large files
* Single-file comparison only

---

## Future Roadmap

* GitHub PR integration
* AI-based change impact explanation
* Multi-file comparison
* Shareable diff links
* Dark/light theme toggle
* Keyboard shortcuts
* Drag-and-drop file upload

---

## Why this project matters

Built alongside college to explore:

* Developer tooling UX
* Performance-focused frontend architecture
* Product decision-making and trade-offs
* Real-world usability over feature overload

---

## Feedback

This project is actively evolving.
Suggestions, issues, and feature ideas are welcome.

If you find it useful, consider starring the repo.


