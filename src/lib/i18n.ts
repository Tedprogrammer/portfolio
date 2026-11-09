// Locale configuration shared by the proxy, routes, and components.
// English is served without a prefix ("/projects/x"); Vietnamese lives under
// "/vi" ("/vi/projects/x"). Internally both render from app/[lang].

export const locales = ["en", "vi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Cookie remembering a visitor's explicit language choice. */
export const localeCookie = "locale";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Open Graph locale codes. */
export const ogLocales: Record<Locale, string> = {
  en: "en_AU",
  vi: "vi_VN",
};

/** BCP 47 tags for Intl formatting. */
export const intlLocales: Record<Locale, string> = {
  en: "en",
  vi: "vi-VN",
};

/**
 * The public URL for a path in a locale. `path` is the unprefixed path and may
 * carry a hash: localePath("vi", "/#projects") === "/vi#projects".
 */
export function localePath<Path extends string>(
  locale: Locale,
  path: Path,
): Path extends `${string}#${string}` ? `${string}#${string}` : string;
export function localePath(locale: Locale, path: string): string {
  if (locale === defaultLocale) {
    return path;
  }

  if (path === "/") {
    return `/${locale}`;
  }

  if (path.startsWith("/#")) {
    return `/${locale}${path.slice(1)}`;
  }

  return `/${locale}${path}`;
}

/**
 * Canonical URL plus hreflang alternates for a page, so search engines treat
 * the English and Vietnamese pages as translations of each other.
 */
export function languageAlternates(locale: Locale, path: string) {
  return {
    canonical: localePath(locale, path),
    languages: {
      ...Object.fromEntries(
        locales.map((other) => [other, localePath(other, path)]),
      ),
      "x-default": localePath(defaultLocale, path),
    },
  };
}

/** Removes a leading locale segment: "/vi/projects/x" -> "/projects/x". */
export function stripLocale(pathname: string) {
  const [, first, ...rest] = pathname.split("/");

  if (first && isLocale(first)) {
    return `/${rest.join("/")}`;
  }

  return pathname || "/";
}
