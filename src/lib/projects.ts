import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { defaultLocale, type Locale } from "@/lib/i18n";

const projectsDirectory = path.join(process.cwd(), "content", "projects");
const assetExtensions = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
  ".webp",
]);

export type ProjectSummary = {
  slug: string;
  title: string;
  description: string;
  date: string;
  cover?: string;
  coverAlt?: string;
  hero?: string;
  heroAlt?: string;
  /** False when a translation was requested but the English file was used. */
  translated: boolean;
};

export type Project = ProjectSummary & {
  content: string;
};

function projectDirectory(slug: string) {
  return path.join(projectsDirectory, slug);
}

function requiredString(value: unknown, field: string, slug: string) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Project "${slug}" needs a non-empty ${field} field.`);
  }

  return value.trim();
}

function projectDate(value: unknown, slug: string) {
  const date =
    value instanceof Date
      ? value.toISOString().slice(0, 10)
      : requiredString(value, "date", slug);

  if (Number.isNaN(Date.parse(date))) {
    throw new Error(`Project "${slug}" has an invalid date.`);
  }

  return date;
}

function optionalString(value: unknown, field: string, slug: string) {
  if (value === undefined) {
    return undefined;
  }

  return requiredString(value, field, slug);
}

export function getProjectSlugs() {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(projectsDirectory, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        fs.existsSync(path.join(projectsDirectory, entry.name, "index.md")),
    )
    .map((entry) => entry.name);
}

/**
 * Translations live beside the English source as `index.<locale>.md`
 * (e.g. `index.vi.md`). Missing translations fall back to `index.md`.
 */
function projectSourceName(slug: string, locale: Locale) {
  if (locale !== defaultLocale) {
    const translatedName = `index.${locale}.md`;

    if (fs.existsSync(path.join(projectsDirectory, slug, translatedName))) {
      return { name: translatedName, translated: true };
    }
  }

  return { name: "index.md", translated: locale === defaultLocale };
}

export function getProject(
  slug: string,
  locale: Locale = defaultLocale,
): Project | null {
  if (!getProjectSlugs().includes(slug)) {
    return null;
  }

  const { name, translated } = projectSourceName(slug, locale);
  const source = fs.readFileSync(
    path.join(projectsDirectory, slug, name),
    "utf8",
  );
  const { data, content } = matter(source);

  return {
    slug,
    title: requiredString(data.title, "title", slug),
    description: requiredString(data.description, "description", slug),
    date: projectDate(data.date, slug),
    cover: optionalString(data.cover, "cover", slug),
    coverAlt: optionalString(data.coverAlt, "coverAlt", slug),
    hero: optionalString(data.hero, "hero", slug),
    heroAlt: optionalString(data.heroAlt, "heroAlt", slug),
    translated,
    content,
  };
}

export function getAllProjects(
  locale: Locale = defaultLocale,
): ProjectSummary[] {
  return getProjectSlugs()
    .map((slug) => getProject(slug, locale))
    .filter((project): project is Project => project !== null)
    .sort((first, second) => second.date.localeCompare(first.date))
    .map(({ content: _content, ...project }) => project);
}

function walkAssets(directory: string, prefix: string[] = []): string[][] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relativePath = [...prefix, entry.name];
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return walkAssets(absolutePath, relativePath);
    }

    return assetExtensions.has(path.extname(entry.name).toLowerCase())
      ? [relativePath]
      : [];
  });
}

export function getProjectAssetParams() {
  return getProjectSlugs().flatMap((slug) =>
    walkAssets(projectDirectory(slug)).map((assetPath) => ({
      slug,
      path: assetPath,
    })),
  );
}

export function readProjectAsset(slug: string, assetPath: string[]) {
  const params = getProjectAssetParams().find(
    (asset) =>
      asset.slug === slug && asset.path.join("/") === assetPath.join("/"),
  );

  if (!params) {
    return null;
  }

  return fs.readFileSync(path.join(projectDirectory(slug), ...assetPath));
}

export function projectAssetUrl(slug: string, assetPath: string) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(assetPath)) {
    return assetPath;
  }

  const parts = assetPath.replace(/^\.\//, "").split("/").filter(Boolean);

  if (parts.length === 0 || parts.some((part) => part === "..")) {
    throw new Error(`Invalid asset path "${assetPath}" in project "${slug}".`);
  }

  return `/projects/${encodeURIComponent(slug)}/media/${parts
    .map(encodeURIComponent)
    .join("/")}`;
}
