import Link from "next/link";
import { ViewTransition } from "react";
import { intlLocales, type Locale, localePath } from "@/lib/i18n";
import { type ProjectSummary, projectAssetUrl } from "@/lib/projects";

export function ProjectList({
  emptyLabel,
  lang,
  projects,
}: {
  emptyLabel: string;
  lang: Locale;
  projects: ProjectSummary[];
}) {
  if (projects.length === 0) {
    return <p className="text-muted">{emptyLabel}</p>;
  }

  const dateFormatter = new Intl.DateTimeFormat(intlLocales[lang], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <div className="columns-1 gap-10 sm:columns-2">
      {projects.map((project) => (
        <div
          className="group mb-10 inline-block w-full break-inside-avoid"
          key={project.slug}
        >
          <Link
            className="block overflow-hidden rounded-2xl border border-border bg-background outline-none transition-[border-color,box-shadow] duration-200 hover:border-accent/40 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            href={localePath(lang, `/projects/${project.slug}`)}
          >
            {project.cover && (
              <ViewTransition
                default="none"
                name={`project-cover-${project.slug}`}
                share="project-cover"
              >
                {/* Project images are authored content with dimensions that vary by project. */}
                {/* biome-ignore lint/performance/noImgElement: Covers may be local or remote authored media. */}
                <img
                  alt={project.coverAlt ?? ""}
                  className="h-auto w-full rounded-2xl outline outline-1 -outline-offset-1 outline-foreground/10 transition-transform duration-200 group-hover:scale-[1.01]"
                  loading="lazy"
                  src={projectAssetUrl(project.slug, project.cover)}
                />
              </ViewTransition>
            )}
            <div className="p-6">
              <time className="text-sm text-subtle" dateTime={project.date}>
                {dateFormatter.format(new Date(project.date))}
              </time>
              {project.cover || project.hero ? (
                <h3 className="mt-2 text-xl font-bold leading-tight tracking-tight text-foreground text-balance">
                  {project.title}
                </h3>
              ) : (
                <ViewTransition
                  default="none"
                  name={`project-title-${project.slug}`}
                  share="project-title"
                >
                  <h3 className="mt-2 text-xl font-bold leading-tight tracking-tight text-foreground text-balance">
                    {project.title}
                  </h3>
                </ViewTransition>
              )}
              <p className="mt-3 leading-7 text-muted text-pretty">
                {project.description}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
