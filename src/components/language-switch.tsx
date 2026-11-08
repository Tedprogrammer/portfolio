"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/lib/dictionaries";
import {
  type Locale,
  localeCookie,
  localePath,
  locales,
  stripLocale,
} from "@/lib/i18n";

export function LanguageSwitch({
  current,
  labels,
}: {
  current: Locale;
  labels: Dictionary["languageSwitch"];
}) {
  const pathname = stripLocale(usePathname() ?? "/");

  return (
    <fieldset className="ms-1 flex items-center rounded-full border border-border p-0.5 font-mono text-[0.6875rem] sm:ms-2">
      <legend className="sr-only">{labels.label}</legend>
      {locales.map((locale) => {
        const isCurrent = locale === current;

        return (
          <Link
            aria-current={isCurrent ? "true" : undefined}
            aria-label={labels[locale].name}
            className={
              isCurrent
                ? "flex min-h-8 min-w-8 items-center justify-center rounded-full bg-foreground px-2 text-background"
                : "flex min-h-8 min-w-8 items-center justify-center rounded-full px-2 text-muted transition-colors hover:text-foreground"
            }
            href={localePath(locale, pathname)}
            hrefLang={locale}
            key={locale}
            lang={locale}
            onClick={() => {
              // Remember the explicit choice so the proxy stops redirecting
              // based on the browser's language.
              // biome-ignore lint/suspicious/noDocumentCookie: a plain cookie the proxy can read is all this needs.
              document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
            }}
          >
            {labels[locale].short}
          </Link>
        );
      })}
    </fieldset>
  );
}
