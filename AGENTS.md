<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Context

This repository is a mechatronics engineering student's personal portfolio website. Product, content, and design decisions should present the student's engineering projects, technical skills, experience, and writing clearly to prospective employers, collaborators, and other professional visitors.

# Project Content Structure

Portfolio projects are content-driven. Each published project lives at `content/projects/<slug>/index.md`, and its slug becomes the `/projects/<slug>` URL. Keep project-specific images beside that file and reference them with relative Markdown paths such as `![Description](photo.jpg)`.

Use `content/projects/_template.md` as the reusable starting point: copy it into a new slug directory as `index.md`, then replace its placeholders. The template remains at the root of `content/projects` because the loader only discovers directories containing an `index.md`, so the template itself is not rendered.

Project discovery, frontmatter validation, sorting, and asset URL handling live in `src/lib/projects.ts`. Project pages are rendered by `src/app/projects/[slug]/page.tsx`, while the homepage project list reads the same content through `src/app/page.tsx` and `src/components/project-list.tsx`.
