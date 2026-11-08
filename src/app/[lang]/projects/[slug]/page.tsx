import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { type ComponentProps, ViewTransition } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getDictionary } from "@/lib/dictionaries";
import { intlLocales, isLocale, languageAlternates } from "@/lib/i18n";
import { getProject, getProjectSlugs, projectAssetUrl } from "@/lib/projects";

type ProjectPageProps = PageProps<"/[lang]/projects/[slug]">;

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const project = getProject(slug, lang);

  if (!project) {
    notFound();
  }

  const alternates = languageAlternates(lang, `/projects/${slug}`);

  return {
    title: project.title,
    description: project.description,
    alternates,
  };
}

function ProjectImage({
  alt,
  node: _node,
  slug,
  src,
  ...props
}: ComponentProps<"img"> & { node?: unknown; slug: string }) {
  const isRemote =
    typeof src !== "string" || /^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(src);

  return (
    <>
      {/* biome-ignore lint/performance/noImgElement: Markdown images have author-defined dimensions and may be local or remote. */}
      <img
        {...props}
        alt={alt ?? ""}
        className="my-10 h-auto w-full rounded-2xl outline outline-1 -outline-offset-1 outline-foreground/10"
        loading="lazy"
        src={
          isRemote || typeof src !== "string" ? src : projectAssetUrl(slug, src)
        }
      />
    </>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { lang, slug } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const project = getProject(slug, lang);

  if (!project) {
    notFound();
  }

  const t = getDictionary(lang);
  const dateFormatter = new Intl.DateTimeFormat(intlLocales[lang], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const hero = project.hero ?? project.cover;
  const heroAlt = project.heroAlt ?? project.coverAlt ?? "";
  const heroUsesCover = hero === project.cover;

  return (
    <main
      className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-10 sm:py-20"
      id="main-content"
    >
      <section>
        <header className="mb-12">
          <time className="text-sm text-subtle" dateTime={project.date}>
            {dateFormatter.format(new Date(project.date))}
          </time>
          {hero ? (
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-balance text-foreground sm:text-5xl">
              {project.title}
            </h1>
          ) : (
            <ViewTransition
              default="none"
              name={`project-title-${project.slug}`}
              share="project-title"
            >
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-balance text-foreground sm:text-5xl">
                {project.title}
              </h1>
            </ViewTransition>
          )}
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted text-pretty">
            {project.description}
          </p>
          {!project.translated && t.project.untranslated ? (
            <p className="mt-6 inline-flex rounded-full border border-border px-4 py-2 font-mono text-xs text-subtle">
              {t.project.untranslated}
            </p>
          ) : null}
          {hero && heroUsesCover ? (
            <ViewTransition
              default="none"
              name={`project-cover-${project.slug}`}
              share="project-cover"
            >
              {/* biome-ignore lint/performance/noImgElement: Project images may be local or remote authored media. */}
              <img
                alt={heroAlt}
                className="mt-10 h-auto w-full rounded-2xl outline outline-1 -outline-offset-1 outline-foreground/10"
                fetchPriority="high"
                src={projectAssetUrl(project.slug, hero)}
              />
            </ViewTransition>
          ) : hero ? (
            // A distinct hero is a new image, so it should not morph from the cover thumbnail.
            // biome-ignore lint/performance/noImgElement: Project hero images are authored media with varying intrinsic dimensions.
            <img
              alt={heroAlt}
              className="mt-10 h-auto w-full rounded-2xl outline outline-1 -outline-offset-1 outline-foreground/10"
              fetchPriority="high"
              src={projectAssetUrl(project.slug, hero)}
            />
          ) : null}
        </header>
        <div
          className="text-[1.0625rem] leading-8 text-muted"
          lang={project.translated ? undefined : "en"}
        >
          <ReactMarkdown
            components={{
              a: ({ children, ...props }) => (
                <a
                  {...props}
                  className="font-bold text-accent underline decoration-border underline-offset-4 transition-colors hover:text-accent-hover"
                >
                  {children}
                </a>
              ),
              blockquote: ({ children }) => (
                <blockquote className="my-8 border-s-2 border-border ps-6 italic text-muted">
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
                  {children}
                </code>
              ),
              h2: ({ children }) => (
                <h2 className="mb-4 mt-14 text-2xl font-bold tracking-tight text-foreground text-balance">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-3 mt-10 text-xl font-bold tracking-tight text-foreground text-balance">
                  {children}
                </h3>
              ),
              hr: () => (
                <hr className="my-12 border-0 border-t border-border" />
              ),
              img: (props) => <ProjectImage {...props} slug={slug} />,
              ol: ({ children }) => (
                <ol className="my-6 list-decimal space-y-2 ps-6 marker:text-subtle">
                  {children}
                </ol>
              ),
              p: ({ children }) => <p className="my-6">{children}</p>,
              pre: ({ children }) => (
                <pre className="my-8 overflow-x-auto rounded-xl bg-foreground p-5 text-sm leading-6 text-background [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit">
                  {children}
                </pre>
              ),
              ul: ({ children }) => (
                <ul className="my-6 list-disc space-y-2 ps-6 marker:text-subtle">
                  {children}
                </ul>
              ),
            }}
            remarkPlugins={[remarkGfm]}
          >
            {project.content}
          </ReactMarkdown>
        </div>
      </section>
    </main>
  );
}
