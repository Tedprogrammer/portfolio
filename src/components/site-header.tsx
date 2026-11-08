import { LanguageSwitch } from "@/components/language-switch";
import { SmoothScrollLink } from "@/components/smooth-scroll-link";
import { getDictionary } from "@/lib/dictionaries";
import { type Locale, localePath } from "@/lib/i18n";

const navLinkClassName =
  // Phones only have room for the name and the language switch.
  "hidden min-h-11 items-center rounded-md px-1 text-muted transition-colors hover:text-foreground sm:flex sm:px-3";

export function SiteHeader({ lang }: { lang: Locale }) {
  const { header, languageSwitch } = getDictionary(lang);
  const sections = [
    { id: "about", label: header.about },
    { id: "projects", label: header.projects },
    { id: "experience", label: header.experience },
    { id: "skills", label: header.skills },
    { id: "contact", label: header.contact },
  ] as const;

  return (
    <>
      <a
        className="fixed start-4 top-4 z-[60] -translate-y-24 rounded-lg bg-foreground px-4 py-3 text-sm font-bold text-background transition-transform focus:translate-y-0"
        href="#main-content"
      >
        {header.skipToContent}
      </a>

      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
        <nav
          aria-label={header.primaryNavigation}
          className="mx-auto flex min-h-16 w-full max-w-5xl items-center justify-between gap-4 px-6 sm:px-10"
        >
          <SmoothScrollLink
            className="flex min-h-11 shrink-0 items-center whitespace-nowrap text-base font-black tracking-tight text-foreground transition-colors hover:text-accent focus-visible:rounded-md"
            href={localePath(lang, "/#top")}
          >
            Luong Hieu Trinh
          </SmoothScrollLink>
          <div className="flex items-center text-xs font-bold sm:gap-3 sm:text-sm">
            {sections.map((section) => (
              <SmoothScrollLink
                className={navLinkClassName}
                href={localePath(lang, `/#${section.id}`)}
                key={section.id}
              >
                {section.label}
              </SmoothScrollLink>
            ))}
            <LanguageSwitch current={lang} labels={languageSwitch} />
          </div>
        </nav>
      </header>
    </>
  );
}
