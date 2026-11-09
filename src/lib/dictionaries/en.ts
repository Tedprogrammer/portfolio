export type SkillGroupKey =
  | "design"
  | "manufacturing"
  | "electronics"
  | "programming"
  | "leadership";

const en = {
  site: {
    name: "Luong Hieu Trinh",
    title: "Luong Hieu Trinh | Mechatronics Engineering Student",
    description:
      "The engineering projects, experience, and technical work of RMIT mechatronics student Luong Hieu Trinh.",
  },
  header: {
    skipToContent: "Skip to content",
    primaryNavigation: "Primary navigation",
    about: "About",
    projects: "Projects",
    experience: "Experience",
    skills: "Skills",
    contact: "Contact",
  },
  languageSwitch: {
    label: "Language",
    en: { short: "EN", name: "English" },
    vi: { short: "VI", name: "Tiếng Việt" },
  },
  hero: {
    eyebrow: "Mechatronics engineering student",
    intro:
      "I'm an RMIT mechatronics engineering student working across product design, manufacturing, electronics, and software.",
    exploreWork: "Explore my work",
  },
  about: {
    eyebrow: "01 / About",
    heading: "Built across disciplines",
    body: "I enjoy turning concepts into physical results, from CAD and CNC machining to robotics, PCB design, and software. This site documents the projects and practical experience behind that work.",
    portraitAlt: "Portrait of Luong Hieu Trinh",
  },
  projects: {
    eyebrow: "02 / Projects",
    heading: "Selected work",
    empty: "No projects published yet.",
  },
  experience: {
    eyebrow: "03 / Experience",
    heading: "Learning by making",
    intro:
      "My studies and industry experience connect engineering theory with product design, CNC manufacturing, digital systems, and practical prototyping.",
    education: {
      label: "Education",
      degree: "Bachelor of Engineering",
      program: "Advanced Manufacturing and Mechatronics, RMIT University",
      period: "Jul 2025 - Jun 2029",
      summary:
        "Coursework includes advanced mathematics, engineering design, electrical and electronic engineering, and digital fundamentals. I participate in Advanced RMIT Competitive Robotics, RUASRT, and RMIT Rover Payload, and I am a member of Engineers Australia.",
    },
    roles: [
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
    ],
    leadership: {
      period: "Jan 2024 - Aug 2025",
      role: "Tournament Leader and Event Organizer",
      organization: "IB CAS Tournament Leadership and Fundraising",
      summary:
        "Organized chess and badminton tournaments for more than 100 participants, coordinating logistics and volunteers while raising approximately AUD $1,000 for local charities.",
    },
  },
  skills: {
    eyebrow: "04 / Skills",
    heading: "Technical skills",
    intro:
      "Practical capabilities developed through engineering coursework, industry experience, robotics teams, and hands-on projects.",
    groups: {
      design: {
        title: "CAD & product design",
        skills: [
          "SolidWorks",
          "AutoCAD",
          "Onshape",
          "Shapr3D",
          "Blender",
          "Mechanical design",
        ],
      },
      manufacturing: {
        title: "Manufacturing & prototyping",
        skills: [
          "Mastercam",
          "CNC machining",
          "3D printing",
          "Laser cutting",
          "Precision components",
          "Mechanical assembly",
        ],
      },
      electronics: {
        title: "Electronics & robotics",
        skills: [
          "KiCad",
          "PCB design",
          "Robot wiring",
          "Chassis prototyping",
          "Electromechanical systems",
          "Wireless power",
        ],
      },
      programming: {
        title: "Programming & digital systems",
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
      },
      leadership: {
        title: "Leadership & operations",
        skills: [
          "Event leadership",
          "Logistics planning",
          "Volunteer coordination",
          "Fundraising",
          "Inventory management",
          "Customer service",
          "Cross-team collaboration",
        ],
      },
    } satisfies Record<SkillGroupKey, { title: string; skills: string[] }>,
  },
  contact: {
    eyebrow: "05 / Contact",
    heading: "Let's build something useful.",
    intro:
      "Have a project, role, or collaboration in mind? Email me directly or connect with me online.",
    labels: {
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      phone: "Phone",
    },
  },
  resume: {
    open: "View resume",
    title: "Luong Hieu Trinh - Resume",
    pages: "1 page",
    close: "Close resume preview",
    openPdf: "Open PDF",
    download: "Download",
    openInNewTab: "Open resume PDF in a new tab",
    previewAlt: "Preview of Luong Hieu Trinh's resume",
  },
  project: {
    breadcrumb: "Breadcrumb",
    projects: "Projects",
    back: "Back to projects",
    untranslated: null as string | null,
  },
  og: {
    homeTagline: "Mechatronics engineering · RMIT",
    projectTagline: (year: string) => `Project · ${year} · Luong Hieu Trinh`,
  },
};

export type Dictionary = typeof en;

export default en;
