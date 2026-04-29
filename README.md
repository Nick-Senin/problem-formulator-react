# Problem Formulator

Interactive visual tool for formulating inventive problems based on TRIZ methodology (Theory of Inventive Problem Solving).

Built with React, Konva (HTML5 Canvas), and Redux.

## What it does

Users construct a problem model as a directed graph of **factors** connected by arrows:

- **Useful factors** — desirable outcomes
- **Harmful factors** — undesirable effects
- **Contradictions** — factors that must both exist and not exist simultaneously

Based on the graph structure, the tool automatically generates natural-language task formulations like:

> Find an alternative way to achieve **X** that does not require **Y** and provides **Z** without causing **W**.

## Features

- Visual canvas editor for building factor graphs (drag-and-drop blocks and arrows)
- Automatic task formulation engine (TRIZ-based logic)
- Markdown preview of generated tasks with syntax highlighting
- Edit mode / preview mode toggle

## Tech stack

- **React 18** + Redux for state management
- **Konva** / react-konva for canvas rendering
- **react-markdown** + rehype-raw for rich markdown output

## Getting started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).
