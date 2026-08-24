import { SmoothScrollLink } from "@/components/smooth-scroll-link";

export function SiteHeader() {
  return (
    <>
      <a
        className="fixed start-4 top-4 z-[60] -translate-y-24 rounded-lg bg-foreground px-4 py-3 text-sm font-bold text-background transition-transform focus:translate-y-0"
        href="#main-content"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex min-h-16 w-full max-w-5xl items-center justify-between gap-4 px-6 sm:px-10"
        >
          <SmoothScrollLink
            className="flex min-h-11 items-center text-base font-black tracking-tight text-foreground transition-colors hover:text-accent focus-visible:rounded-md"
            href="/#top"
          >
            Luong Hieu Trinh
          </SmoothScrollLink>
          <div className="flex items-center text-xs font-bold sm:gap-3 sm:text-sm">
            <SmoothScrollLink
              className="flex min-h-11 items-center rounded-md px-1 text-muted transition-colors hover:text-foreground sm:px-3"
              href="/#about"
            >
              About
            </SmoothScrollLink>
            <SmoothScrollLink
              className="flex min-h-11 items-center rounded-md px-1 text-muted transition-colors hover:text-foreground sm:px-3"
              href="/#projects"
            >
              Projects
            </SmoothScrollLink>
            <SmoothScrollLink
              className="flex min-h-11 items-center rounded-md px-1 text-muted transition-colors hover:text-foreground sm:px-3"
              href="/#experience"
            >
              Experience
            </SmoothScrollLink>
            <SmoothScrollLink
              className="flex min-h-11 items-center rounded-md px-1 text-muted transition-colors hover:text-foreground sm:px-3"
              href="/#skills"
            >
              Skills
            </SmoothScrollLink>
            <SmoothScrollLink
              className="flex min-h-11 items-center rounded-md px-1 text-muted transition-colors hover:text-foreground sm:px-3"
              href="/#contact"
            >
              Contact
            </SmoothScrollLink>
          </div>
        </nav>
      </header>
    </>
  );
}
