# Mechatronics Engineering Portfolio

This is a mechatronics engineering student's personal portfolio website. It showcases engineering projects, technical skills, and experience for prospective employers, collaborators, and other professional visitors.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Adding projects

Projects live in `content/projects`, with one folder per URL slug:

```text
content/projects/my-project/
├── index.md
├── cover.jpg
└── hero.jpg
```

Each `index.md` starts with frontmatter and can reference images from the same folder with standard Markdown syntax:

```md
---
title: "My project"
description: "A short summary used in project lists and page metadata."
date: "2026-08-24"
cover: "cover.jpg"
coverAlt: "Description of the cover image"
hero: "hero.jpg"
heroAlt: "Description of the project hero image"
---

Project content goes here.

![Description of another image](another-photo.jpg)
```

`cover` is used at its intrinsic aspect ratio in the homepage project card. `hero` is used in the project page header. If `hero` is omitted, the header falls back to `cover`.

At build time, the app scans these folders, sorts projects by date, and statically generates `/projects/<slug>` and each colocated image URL. Supported image formats are AVIF, GIF, JPEG, PNG, SVG, and WebP. `/projects` redirects to the projects section on the homepage.

The homepage lives in `src/app/page.tsx` and updates automatically while the development server is running.
