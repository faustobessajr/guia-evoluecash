export const locales = ["pt-br", "en-us"] as const;
export const defaultLocale = "pt-br" as const;
export type Locale = (typeof locales)[number];
