import { type NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, type Locale, localeCookie } from "@/lib/i18n";

/**
 * Picks the visitor's preferred supported locale from Accept-Language,
 * honouring q-values ("vi-VN,vi;q=0.9,en;q=0.8" -> "vi").
 */
function preferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const ranked = acceptLanguage
    .split(",")
    .map((part, index) => {
      const [tag, ...rest] = part.trim().split(";");
      const q = rest.find((param) => param.trim().startsWith("q="));
      return {
        language: tag.trim().toLowerCase().split("-")[0],
        quality: q ? Number(q.trim().slice(2)) : 1,
        index,
      };
    })
    .filter((entry) => entry.language && entry.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);

  for (const { language } of ranked) {
    if (isLocale(language)) {
      return language;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, firstSegment] = pathname.split("/");

  // Explicitly prefixed URLs ("/vi/…", and "/en/…" used internally for the
  // English routes and their image URLs) are served as-is.
  if (firstSegment && isLocale(firstSegment)) {
    return NextResponse.next();
  }

  // Unprefixed URLs are English unless the visitor prefers Vietnamese. An
  // explicit choice made with the language switch wins over the browser.
  const cookie = request.cookies.get(localeCookie)?.value;
  const locale =
    cookie && isLocale(cookie)
      ? cookie
      : preferredLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();

  if (locale !== defaultLocale) {
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    const response = NextResponse.redirect(url);
    response.headers.set("Vary", "Accept-Language, Cookie");
    return response;
  }

  url.pathname = `/${defaultLocale}${pathname}`;
  const response = NextResponse.rewrite(url);
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  matcher: [
    // Everything except Next internals, public assets, shared project media,
    // and files with an extension (icon.png, the resume PDF…).
    "/((?!_next/|assets/|projects/[^/]+/media/|.*\\.[A-Za-z0-9]+$).*)",
  ],
};
