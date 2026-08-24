import Image from "next/image";
import type { CSSProperties } from "react";
import { HomeBootController } from "@/components/home-boot-controller";
import { ProjectList } from "@/components/project-list";
import { ResumePreviewDialog } from "@/components/resume-preview-dialog";
import { SmoothScrollLink } from "@/components/smooth-scroll-link";
import { getAllProjects } from "@/lib/projects";

type SkillIconName =
  | "design"
  | "manufacturing"
  | "electronics"
  | "programming"
  | "leadership";

const skillGroups: Array<{
  title: string;
  icon: SkillIconName;
  skills: string[];
  gridClassName: string;
}> = [
  {
    title: "CAD & product design",
    icon: "design",
    skills: [
      "SolidWorks",
      "AutoCAD",
      "Onshape",
      "Shapr3D",
      "Blender",
      "Mechanical design",
    ],
    gridClassName: "lg:col-span-2",
  },
  {
    title: "Manufacturing & prototyping",
    icon: "manufacturing",
    skills: [
      "Mastercam",
      "CNC machining",
      "3D printing",
      "Laser cutting",
      "Precision components",
      "Mechanical assembly",
    ],
    gridClassName: "lg:col-span-2",
  },
  {
    title: "Electronics & robotics",
    icon: "electronics",
    skills: [
      "KiCad",
      "PCB design",
      "Robot wiring",
      "Chassis prototyping",
      "Electromechanical systems",
      "Wireless power",
    ],
    gridClassName: "lg:col-span-2",
  },
  {
    title: "Programming & digital systems",
    icon: "programming",
    skills: [
      "C",
      "C++",
      "Python",
      "MATLAB",
      "HTML & CSS",
      "WordPress",
      "GitHub",
      "IT troubleshooting",
    ],
    gridClassName: "lg:col-span-3",
  },
  {
    title: "Leadership & operations",
    icon: "leadership",
    skills: [
      "Event leadership",
      "Logistics planning",
      "Volunteer coordination",
      "Fundraising",
      "Inventory management",
      "Customer service",
      "Cross-team collaboration",
    ],
    gridClassName: "lg:col-span-3",
  },
];

const contactLinks = [
  {
    label: "Email",
    value: "luonghieutrinh@gmail.com",
    href: "mailto:luonghieutrinh@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/luonghieutrinh",
    href: "https://linkedin.com/in/luonghieutrinh",
  },
  {
    label: "GitHub",
    value: "github.com/Tedprogrammer",
    href: "https://github.com/Tedprogrammer",
  },
  {
    label: "Phone",
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
                        "--character-start": `${360 + revealStep * 48}ms`,
                        "--character-delay": `${580 + revealStep * 48}ms`,
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

const experience = [
  {
    period: "May 2026 - Present",
    role: "Product Design Intern",
    organization: "ElectraWireless",
    location: "Remote",
    summary:
      "Designing wireless kitchen appliances in SolidWorks, applying wireless power principles, and collaborating with the electrical team to prepare products for manufacturing and assembly.",
  },
  {
    period: "Dec 2025 - Present",
    role: "IT and Digital Systems Support Volunteer",
    organization: "VoteGuard International Ltd.",
    location: "Claymore, NSW",
    summary:
      "Maintaining the organization's WordPress website, troubleshooting email, hosting, and DNS issues, and supporting cloud file management and cybersecurity protocols.",
  },
  {
    period: "Nov 2025 - Feb 2026",
    role: "CNC Machine Operator",
    organization: "Point Precision Engineering Pty Ltd.",
    location: "Nunawading, VIC",
    summary:
      "Built hands-on experience across CNC machining workflows, manufacturing a product with SolidWorks and Mastercam while learning precision production and assembly techniques.",
  },
  {
    period: "Jun 2022 - Present",
    role: "Retail Operations and Customer Service",
    organization: "Simon Oz, Queen Victoria Market",
    location: "Melbourne, VIC",
    summary:
      "Managing inventory, stock replenishment, product displays, and customer service in a high-traffic retail environment.",
  },
];

function SkillIcon({ name }: { name: SkillIconName }) {
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

export default function Home() {
  const projects = getAllProjects();

  return (
    <>
      <HomeBootController />
      <div aria-hidden="true" className="boot-sequence">
        <div className="boot-sequence__positioner mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-5xl items-center px-6 py-20 sm:px-10 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="invisible font-mono text-xs font-bold uppercase tracking-[0.2em]">
              Mechatronics engineering student
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
              I&apos;m an RMIT mechatronics engineering student working across
              product design, manufacturing, electronics, and software.
            </p>
            <div className="invisible mt-10 flex flex-wrap justify-center gap-3">
              <span className="inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-bold">
                View resume
              </span>
              <span className="inline-flex min-h-12 items-center justify-center rounded-full border px-6 text-sm font-bold">
                Explore my work
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
              Mechatronics engineering student
            </p>
            <h1
              aria-label={heroName}
              className="hero-name--static mt-6 max-w-3xl text-[3.6rem] font-black leading-[0.95] tracking-[-0.04em] text-balance text-foreground sm:text-[5.4rem]"
            >
              <HeroNameCharacters />
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted text-pretty sm:text-xl sm:leading-9">
              I&apos;m an RMIT mechatronics engineering student working across
              product design, manufacturing, electronics, and software.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <ResumePreviewDialog />
              <SmoothScrollLink
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-6 text-sm font-bold text-foreground transition-[border-color,color,transform] hover:border-accent hover:text-accent active:scale-[0.96]"
                href="#projects"
              >
                Explore my work
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
                01 / About
              </p>
              <h2
                className="mt-4 text-3xl font-black tracking-tight sm:text-4xl"
                id="about-heading"
              >
                Built across disciplines
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-8 text-background/70 text-pretty">
                I enjoy turning concepts into physical results, from CAD and CNC
                machining to robotics, PCB design, and software. This site
                documents the projects and practical experience behind that
                work.
              </p>
            </div>

            <div>
              <div className="max-w-sm overflow-hidden rounded-2xl">
                <Image
                  alt="Portrait of Luong Hieu Trinh"
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
                  02 / Projects
                </p>
                <h2
                  className="mt-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl"
                  id="projects-heading"
                >
                  Selected work
                </h2>
              </div>
            </div>
            <ProjectList projects={projects} />
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
                03 / Experience
              </p>
              <h2
                className="mt-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl"
                id="experience-heading"
              >
                Learning by making
              </h2>
              <p className="mt-6 max-w-md leading-7 text-muted text-pretty">
                My studies and industry experience connect engineering theory
                with product design, CNC manufacturing, digital systems, and
                practical prototyping.
              </p>
            </div>

            <div className="space-y-12">
              <article className="grid gap-3 border-s-2 border-accent ps-6 sm:grid-cols-[9rem_1fr] sm:gap-8">
                <p className="font-mono text-sm text-subtle">Education</p>
                <div>
                  <h3 className="text-xl font-black tracking-tight text-foreground">
                    Bachelor of Engineering
                  </h3>
                  <p className="mt-1 font-bold text-foreground">
                    Advanced Manufacturing and Mechatronics, RMIT University
                  </p>
                  <p className="mt-1 font-mono text-sm text-subtle">
                    Jul 2025 - Jun 2029
                  </p>
                  <p className="mt-3 leading-7 text-muted text-pretty">
                    Coursework includes advanced mathematics, engineering
                    design, electrical and electronic engineering, and digital
                    fundamentals. I participate in Advanced RMIT Competitive
                    Robotics, RUASRT, and RMIT Rover Payload, and I am a member
                    of Engineers Australia.
                  </p>
                </div>
              </article>
              {experience.map((role) => (
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
                  Jan 2024 - Aug 2025
                </p>
                <div>
                  <h3 className="text-xl font-black tracking-tight text-foreground">
                    Tournament Leader and Event Organizer
                  </h3>
                  <p className="mt-1 font-bold text-foreground">
                    IB CAS Tournament Leadership and Fundraising
                  </p>
                  <p className="mt-3 leading-7 text-muted text-pretty">
                    Organized chess and badminton tournaments for more than 100
                    participants, coordinating logistics and volunteers while
                    raising approximately AUD $1,000 for local charities.
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
              04 / Skills
            </p>
            <h2
              className="mt-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl"
              id="skills-heading"
            >
              Technical skills
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted text-pretty">
              Practical capabilities developed through engineering coursework,
              industry experience, robotics teams, and hands-on projects.
            </p>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
              {skillGroups.map((group) => (
                <article
                  className={`rounded-2xl border border-border bg-surface p-6 ${group.gridClassName}`}
                  key={group.title}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent-hover">
                      <SkillIcon name={group.icon} />
                    </span>
                    <h3 className="font-black tracking-tight text-foreground">
                      {group.title}
                    </h3>
                  </div>
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
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
                05 / Contact
              </p>
              <h2
                className="mt-4 text-3xl font-black tracking-tight text-balance text-foreground sm:text-4xl"
                id="contact-heading"
              >
                Let&apos;s build something useful.
              </h2>
              <p className="mt-6 max-w-md leading-7 text-muted text-pretty">
                Have a project, role, or collaboration in mind? Email me
                directly or connect with me online.
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
                        {link.label}
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
