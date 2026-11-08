import Image from "next/image";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { HomeBootController } from "@/components/home-boot-controller";
import { HomeScrollMemory } from "@/components/home-scroll-memory";
import { ProjectList } from "@/components/project-list";
import { ResumePreviewDialog } from "@/components/resume-preview-dialog";
import { SmoothScrollLink } from "@/components/smooth-scroll-link";
import { getDictionary, type SkillGroupKey } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import { getAllProjects } from "@/lib/projects";

// Copy lives in the dictionaries; this only sets the order and grid layout.
const skillGroupLayout: Array<{ key: SkillGroupKey; gridClassName: string }> = [
  { key: "design", gridClassName: "lg:col-span-2" },
  { key: "manufacturing", gridClassName: "lg:col-span-2" },
  { key: "electronics", gridClassName: "lg:col-span-2" },
  { key: "programming", gridClassName: "lg:col-span-3" },
  { key: "leadership", gridClassName: "lg:col-span-3" },
];

const contactLinks: Array<{
  label: "email" | "linkedin" | "github" | "phone";
  value: string;
  href: string;
}> = [
  {
    label: "email",
    value: "luonghieutrinh@gmail.com",
    href: "mailto:luonghieutrinh@gmail.com",
  },
  {
    label: "linkedin",
    value: "linkedin.com/in/luonghieutrinh",
    href: "https://linkedin.com/in/luonghieutrinh",
  },
  {
    label: "github",
    value: "github.com/Tedprogrammer",
    href: "https://github.com/Tedprogrammer",
  },
  {
    label: "phone",
    value: "+61 401 966 608",
    href: "tel:+61401966608",
  },
];

const heroName = "Luong Hieu Trinh";
const heroNameCenter = (heroName.length - 1) / 2;
const heroNameWords = [
  { id: "luong", text: "Luong", startIndex: 0 },
  { id: "hieu", text: "Hieu", startIndex: 6 },
  { id: "trinh", text: "Trinh", startIndex: 11 },
];
const heroSymbolOffsets = [
  0, -71, -23, -109, -47, -131, -11, -83, -59, -149, -31, -97, -67, -127, -17,
  -113,
];
const heroSymbolDirections = [
  "normal",
  "reverse",
  "reverse",
  "normal",
  "reverse",
  "normal",
  "normal",
  "reverse",
  "normal",
  "reverse",
  "reverse",
  "normal",
  "normal",
  "reverse",
  "normal",
  "reverse",
];

function HeroNameCharacters({ animated = false }: { animated?: boolean }) {
  return (
    <span aria-hidden="true" className="hero-name__text">
      {heroNameWords.map((word) => (
        <span className="hero-name__word" key={word.id}>
          {Array.from(word.text).map((character, characterIndex) => {
            const index = word.startIndex + characterIndex;
            const revealStep = Math.floor(Math.abs(index - heroNameCenter));

            return (
              <span
                className={
                  animated
                    ? "hero-name__character boot-name__character"
                    : "hero-name__character"
                }
                key={character}
                style={
                  animated
                    ? ({
                        "--character-start": `${534 + revealStep * 48}ms`,
                        "--character-delay": `${754 + revealStep * 48}ms`,
                        "--symbol-offset": `${heroSymbolOffsets[index]}ms`,
                        "--symbol-direction": heroSymbolDirections[index],
                      } as CSSProperties)
                    : undefined
                }
              >
                {character}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

function SkillIcon({ name }: { name: SkillGroupKey }) {
  if (name === "design") {
    return (
      <svg
        aria-hidden="true"
        className="size-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="m3 17 14-14 4 4L7 21H3v-4Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="m14 6 4 4M11 9l2 2M8 12l2 2"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (name === "manufacturing") {
    return (
      <svg
        aria-hidden="true"
        className="size-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="M14.5 6.5a4 4 0 0 0-5 5L3 18l3 3 6.5-6.5a4 4 0 0 0 5-5l-2.5 2.5-3-3 2.5-2.5Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (name === "electronics") {
    return (
      <svg
        aria-hidden="true"
        className="size-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (name === "programming") {
    return (
      <svg
        aria-hidden="true"
        className="size-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const t = getDictionary(lang);
  const projects = getAllProjects(lang);

  return (
    <>
      <HomeBootController />
      <HomeScrollMemory />
      <div aria-hidden="true" className="boot-sequence">
        <div className="boot-sequence__positioner mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-5xl items-center px-6 py-20 sm:px-10 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="invisible font-mono text-xs font-bold uppercase tracking-[0.2em]">
              {t.hero.eyebrow}
            </p>
            <div className="boot-sequence__name-frame mt-6 max-w-3xl text-[3.6rem] font-black leading-[0.95] tracking-[-0.04em] text-balance sm:text-[5.4rem]">
              <span className="boot-sequence__symbols">
                <span className="boot-sequence__symbol">{"{ }"}</span>
                <span className="boot-sequence__symbol">{"</>"}</span>
                <span className="boot-sequence__symbol">λ</span>
                <span className="boot-sequence__symbol">⌬</span>
                <span className="boot-sequence__symbol">0x</span>
                <span className="boot-sequence__symbol">#</span>
                <span className="boot-sequence__symbol">⌁</span>
              </span>
              <span className="boot-name">
                <HeroNameCharacters animated />
              </span>
            </div>
            <p className="invisible mt-8 max-w-2xl text-lg leading-8 text-pretty sm:text-xl sm:leading-9">
              {t.hero.intro}
            </p>
            <div className="invisible mt-10 flex flex-wrap justify-center gap-3">
              <span className="inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-bold">
                {t.resume.open}
              </span>
              <span className="inline-flex min-h-12 items-center justify-center rounded-full border px-6 text-sm font-bold">
                {t.hero.exploreWork}
              </span>
            </div>
          </div>
        </div>
      </div>
      <main id="main-content">
        <div
          aria-hidden="true"
          className="pointer-events-none sticky top-[34px] z-[55] hidden h-0 lg:block"
        >
          <div className="mr-[10px] ml-auto w-[clamp(18rem,28vw,30rem)] overflow-hidden rounded-bl-3xl">
            <Image
              alt=""
              className="h-auto w-full"
              height={1024}
              sizes="(min-width: 1024px) 28vw, 0px"
              src="/assets/robot.png"
              width={1536}
            />
          </div>
        </div>

        <section
          className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-5xl items-center px-6 py-20 sm:px-10 sm:py-28"
          id="top"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
              {t.hero.eyebrow}
            </p>
            <h1
              aria-label={heroName}
              className="hero-name--static mt-6 max-w-3xl text-[3.6rem] font-black leading-[0.95] tracking-[-0.04em] text-balance text-foreground sm:text-[5.4rem]"
            >
              <HeroNameCharacters />
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted text-pretty sm:text-xl sm:leading-9">
              {t.hero.intro}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <ResumePreviewDialog labels={t.resume} />
              <SmoothScrollLink
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-6 text-sm font-bold text-foreground transition-[border-color,color,transform] hover:border-accent hover:text-accent active:scale-[0.96]"
                href="#projects"
              >
                {t.hero.exploreWork}
              </SmoothScrollLink>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="about-heading"
          className="scroll-mt-24 bg-foreground text-background"
          id="about"
        >
          <div className="mx-auto grid w-full max-w-5xl gap-12 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-hover">
                {t.about.eyebrow}
              </p>
              <h2
                className="mt-4 text-3xl font-black tracking-tight sm:text-4xl"
                id="about-heading"
              >
                {t.about.heading}
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-8 text-background/70 text-pretty">
                {t.about.body}
              </p>
            </div>

            <div>
              <div className="max-w-sm overflow-hidden rounded-2xl">
                <Image
                  alt={t.about.portraitAlt}
                  className="h-auto w-full"
                  height={1355}
                  sizes="(min-width: 1024px) 26rem, (min-width: 640px) 24rem, calc(100vw - 3rem)"
                  src="/assets/me.png"
                  width={1161}
                />
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="projects-heading"
          className="scroll-mt-24 border-t border-border bg-surface"
          id="projects"
        >
          <div className="mx-auto w-full max-w-5xl px-6 py-24 sm:px-10 sm:py-32">
            <div className="mb-12">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  {t.projects.eyebrow}
                </p>
                <h2
                  className="mt-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl"
                  id="projects-heading"
                >
                  {t.projects.heading}
                </h2>
              </div>
            </div>
            <ProjectList
              emptyLabel={t.projects.empty}
              lang={lang}
              projects={projects}
            />
          </div>
        </section>

        <section
          aria-labelledby="experience-heading"
          className="scroll-mt-24"
          id="experience"
        >
          <div className="mx-auto grid w-full max-w-5xl gap-14 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
                {t.experience.eyebrow}
              </p>
              <h2
                className="mt-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl"
                id="experience-heading"
              >
                {t.experience.heading}
              </h2>
              <p className="mt-6 max-w-md leading-7 text-muted text-pretty">
                {t.experience.intro}
              </p>
            </div>

            <div className="space-y-12">
              <article className="grid gap-3 border-s-2 border-accent ps-6 sm:grid-cols-[9rem_1fr] sm:gap-8">
                <p className="font-mono text-sm text-subtle">
                  {t.experience.education.label}
                </p>
                <div>
                  <h3 className="text-xl font-black tracking-tight text-foreground">
                    {t.experience.education.degree}
                  </h3>
                  <p className="mt-1 font-bold text-foreground">
                    {t.experience.education.program}
                  </p>
                  <p className="mt-1 font-mono text-sm text-subtle">
                    {t.experience.education.period}
                  </p>
                  <p className="mt-3 leading-7 text-muted text-pretty">
                    {t.experience.education.summary}
                  </p>
                </div>
              </article>
              {t.experience.roles.map((role) => (
                <article
                  className="grid gap-3 border-s-2 border-border ps-6 sm:grid-cols-[9rem_1fr] sm:gap-8"
                  key={`${role.organization}-${role.role}`}
                >
                  <div className="font-mono text-sm text-subtle">
                    <p>{role.period}</p>
                    <p className="mt-1">{role.location}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight text-foreground">
                      {role.role}
                    </h3>
                    <p className="mt-1 font-bold text-foreground">
                      {role.organization}
                    </p>
                    <p className="mt-3 leading-7 text-muted text-pretty">
                      {role.summary}
                    </p>
                  </div>
                </article>
              ))}
              <article className="grid gap-3 border-s-2 border-border ps-6 sm:grid-cols-[9rem_1fr] sm:gap-8">
                <p className="font-mono text-sm text-subtle">
                  {t.experience.leadership.period}
                </p>
                <div>
                  <h3 className="text-xl font-black tracking-tight text-foreground">
                    {t.experience.leadership.role}
                  </h3>
                  <p className="mt-1 font-bold text-foreground">
                    {t.experience.leadership.organization}
                  </p>
                  <p className="mt-3 leading-7 text-muted text-pretty">
                    {t.experience.leadership.summary}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="skills-heading"
          className="scroll-mt-24"
          id="skills"
        >
          <div className="mx-auto w-full max-w-5xl px-6 py-24 sm:px-10 sm:py-32">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
              {t.skills.eyebrow}
            </p>
            <h2
              className="mt-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl"
              id="skills-heading"
            >
              {t.skills.heading}
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted text-pretty">
              {t.skills.intro}
            </p>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
              {skillGroupLayout.map(({ key, gridClassName }) => (
                <article
                  className={`rounded-2xl border border-border bg-surface p-6 ${gridClassName}`}
                  key={key}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent-hover">
                      <SkillIcon name={key} />
                    </span>
                    <h3 className="font-black tracking-tight text-foreground">
                      {t.skills.groups[key].title}
                    </h3>
                  </div>
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {t.skills.groups[key].skills.map((skill) => (
                      <li
                        className="rounded-full border border-accent/25 bg-accent/5 px-3.5 py-2 text-sm font-bold text-accent-hover transition-[background-color,border-color,box-shadow,transform] duration-150 ease-out hover:border-accent/50 hover:bg-accent/10 hover:shadow-sm motion-safe:hover:-translate-y-0.5"
                        key={skill}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="contact-heading"
          className="scroll-mt-24 bg-surface"
          id="contact"
        >
          <div className="mx-auto grid w-full max-w-5xl gap-12 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
                {t.contact.eyebrow}
              </p>
              <h2
                className="mt-4 text-3xl font-black tracking-tight text-balance text-foreground sm:text-4xl"
                id="contact-heading"
              >
                {t.contact.heading}
              </h2>
              <p className="mt-6 max-w-md leading-7 text-muted text-pretty">
                {t.contact.intro}
              </p>
            </div>

            <address className="not-italic">
              <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
                {contactLinks.map((link) => (
                  <li className="bg-background" key={link.label}>
                    <a
                      className="group flex min-h-36 flex-col justify-between p-6 transition-colors hover:bg-surface-raised"
                      href={link.href}
                    >
                      <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-accent">
                        {t.contact.labels[link.label]}
                      </span>
                      <span className="mt-8 break-words font-bold text-foreground underline decoration-border underline-offset-4 transition-colors group-hover:decoration-accent">
                        {link.value}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </address>
          </div>
        </section>
      </main>
    </>
  );
}
