import type { Locale } from "@/lib/i18n";
import en, { type Dictionary } from "./en";
import vi from "./vi";

export type { Dictionary, SkillGroupKey } from "./en";

const dictionaries: Record<Locale, Dictionary> = { en, vi };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
