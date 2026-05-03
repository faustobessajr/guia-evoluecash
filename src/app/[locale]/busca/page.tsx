import { getTranslations, setRequestLocale } from "next-intl/server";
import { getTransacoes, getOperacoes } from "@/lib/data";
import type { Locale } from "@/lib/types";
import { BuscaBar } from "@/components/busca-bar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "search" });
  return { title: `${t("title")} | Guia EvolueCash` };
}

export default async function BuscaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "search" });

  const transacoes = getTransacoes(locale as Locale);
  const operacoes = getOperacoes(locale as Locale);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
      <BuscaBar
        transacoes={transacoes}
        operacoes={operacoes}
        locale={locale}
        placeholder={t("placeholder")}
        labels={{
          transacao: t("transacao"),
          operacao: t("operacao"),
        }}
      />
    </div>
  );
}
