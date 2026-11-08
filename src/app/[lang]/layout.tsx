import type { Metadata } from "next";
import { Be_Vietnam_Pro, IBM_Plex_Mono, Lato } from "next/font/google";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale, languageAlternates, locales } from "@/lib/i18n";
import "../globals.css";

// Lato has no Vietnamese glyphs (ư, ơ, ạ…), so Vietnamese pages use Be Vietnam
// Pro. Both set --font-body; the layout applies only the one for its locale.
const lato = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700", "900"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700"],
});

const bodyFonts: Record<Locale, typeof lato> = {
  en: lato,
  vi: beVietnamPro,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const { site } = getDictionary(lang);

  return {
    title: {
      default: site.title,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    alternates: languageAlternates(lang, "/"),
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  return (
    <html
      lang={lang}
      className={`${bodyFonts[lang].variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader lang={lang} />
        {children}
      </body>
    </html>
  );
}
