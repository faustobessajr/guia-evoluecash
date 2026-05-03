import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getOperacoes } from "@/lib/data";
import type { Locale } from "@/lib/types";
import { OperacoesFiltro } from "./filtro";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: `Operacoes | Guia EvolueCash` };
}

export default async function OperacoesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const opT = await getTranslations({ locale, namespace: "operacoes" });
  const operacoes = getOperacoes(locale as Locale);

  const categoryMeta: Record<string, { title: string; sub: string }> = {};
  const catKeys = [
    "receber",
    "pagar",
    "internacional",
    "dolarizacao",
    "liberal",
    "trader",
    "cobranca",
    "all",
  ];
  for (const key of catKeys) {
    categoryMeta[key] = {
      title: opT(`categories.${key}.title`),
      sub: opT(`categories.${key}.sub`),
    };
  }

  const banner = opT("banner");
  const viewSteps = opT("viewSteps");

  return (
    <Suspense>
      <OperacoesFiltro
        operacoes={operacoes}
        locale={locale}
        categoryMeta={categoryMeta}
        banner={banner}
        viewSteps={viewSteps}
      />
    </Suspense>
  );
}
