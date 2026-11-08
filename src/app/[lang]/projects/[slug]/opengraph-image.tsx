import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, locales } from "@/lib/i18n";
import { getProject, getProjectSlugs } from "@/lib/projects";
import { ogContentType, ogSize, renderOgCard } from "../../../_og/shared";

export const size = ogSize;
export const contentType = ogContentType;
export const dynamicParams = false;
export const alt =
  "Project share card from Luong Hieu Trinh's mechatronics engineering portfolio.";

// Image routes don't inherit the [lang] params from the layout, so list every
// locale and project combination here.
export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getProjectSlugs().map((slug) => ({ lang, slug })),
  );
}

export default async function Image({
  params,
}: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const project = getProject(slug, lang);

  if (!project) {
    notFound();
  }

  const year = project.date.slice(0, 4);

  return renderOgCard({
    lang,
    title: project.title,
    tagline: getDictionary(lang).og.projectTagline(year),
    // Shrink long titles so they stay on one line inside the 1000px card.
    titleSize: Math.max(
      44,
      Math.min(96, Math.floor(1900 / project.title.length)),
    ),
  });
}
