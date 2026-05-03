import type { MetadataRoute } from "next";
import { getTransacoes, getOperacoes } from "@/lib/data";

const BASE_URL = "https://guia.evoluecash.com.br";
const locales = ["pt-br", "en-us"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    });

    entries.push(
      { url: `${BASE_URL}/${locale}/transacoes`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
      { url: `${BASE_URL}/${locale}/operacoes`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
      { url: `${BASE_URL}/${locale}/como-funciona`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
      { url: `${BASE_URL}/${locale}/calculadora`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
      { url: `${BASE_URL}/${locale}/busca`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 }
    );

    const transacoes = getTransacoes(locale as "pt-br" | "en-us");
    for (const t of transacoes) {
      entries.push({
        url: `${BASE_URL}/${locale}/transacoes/${t.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    const operacoes = getOperacoes(locale as "pt-br" | "en-us");
    for (const o of operacoes) {
      entries.push({
        url: `${BASE_URL}/${locale}/operacoes/${o.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
