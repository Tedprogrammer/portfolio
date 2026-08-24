# Mechatronics Engineering Portfolio

This is a mechatronics engineering student's personal portfolio website. It showcases engineering projects, technical skills, and experience for prospective employers, collaborators, and other professional visitors.

The site is built with [Next.js](https://nextjs.org) and was bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
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
coverAspect: "16:10"
hero: "hero.jpg"
heroAlt: "Description of the project hero image"
---

Project content goes here.

![Description of another image](another-photo.jpg)
```

`cover` is used in the homepage project card. Set `coverAspect` to `"9:16"` for portrait mobile images; it defaults to `"16:10"`. `hero` is used in the project page header. If `hero` is omitted, the header falls back to `cover` and preserves its configured aspect ratio.

At build time, the app scans these folders, sorts projects by date, and statically generates `/projects/<slug>` and each colocated image URL. Supported image formats are AVIF, GIF, JPEG, PNG, SVG, and WebP. `/projects` redirects to the projects section on the homepage.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
