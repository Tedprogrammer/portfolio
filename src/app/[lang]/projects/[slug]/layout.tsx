import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localePath } from "@/lib/i18n";
import { getProject } from "@/lib/projects";

export default async function ProjectLayout({
  children,
  params,
}: LayoutProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const project = getProject(slug, lang);

  if (!project) {
    notFound();
  }

  const t = getDictionary(lang);

  return (
    <>
      <nav
        aria-label={t.project.breadcrumb}
        className="border-b border-border bg-surface/70"
      >
        <ol className="mx-auto flex min-h-12 w-full max-w-5xl items-center gap-2 overflow-hidden px-6 font-mono text-xs sm:px-10">
          <li className="shrink-0">
            <Link
              className="text-muted transition-colors hover:text-accent"
              href={localePath(lang, "/#projects")}
            >
              {t.project.projects}
            </Link>
          </li>
          <li aria-hidden="true" className="text-subtle">
            /
          </li>
          <li className="min-w-0 truncate font-bold text-foreground">
            <span aria-current="page">{project.title}</span>
          </li>
        </ol>
      </nav>
      {children}
    </>
  );
}
