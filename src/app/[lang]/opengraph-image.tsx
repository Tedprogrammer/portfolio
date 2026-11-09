import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, locales } from "@/lib/i18n";
import { ogContentType, ogSize, renderOgCard } from "../_og/shared";

export const alt =
  "Luong Hieu Trinh, mechatronics engineering: the name cut out of a paper card laid over a render of a robotic arm system.";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  return renderOgCard({
    lang,
    title: "Luong Hieu Trinh",
    tagline: getDictionary(lang).og.homeTagline,
    titleSize: 112,
  });
}
