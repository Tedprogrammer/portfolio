import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects";

export default async function ProjectLayout({
  children,
  params,
}: LayoutProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="border-b border-border bg-surface/70"
      >
        <ol className="mx-auto flex min-h-12 w-full max-w-5xl items-center gap-2 overflow-hidden px-6 font-mono text-xs sm:px-10">
          <li className="shrink-0">
            <Link
              className="text-muted transition-colors hover:text-accent"
              href="/#projects"
            >
              Projects
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
