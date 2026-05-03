import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getTransacoes } from "@/lib/data";
import type { Locale, CategoriaTransacao } from "@/lib/types";
import { TransacoesFiltro } from "./filtro";
import { Callout } from "@/components/callout";

const categorias: CategoriaTransacao[] = [
  "pagamentos-br",
  "cripto",
  "comex",
  "config",
  "plataforma",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "transacoes" });
  return { title: `${t("title")} | Guia EvolueCash` };
}

export default async function TransacoesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "transacoes" });
  const catT = await getTranslations({ locale, namespace: "categories" });

  const transacoes = getTransacoes(locale as Locale);

  const categoryLabels = Object.fromEntries(
    categorias.map((c) => [c, catT(c)])
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>

      {/* Info banner */}
      <div className="bg-alert-info/10 border border-alert-info/20 rounded-xl p-4 mb-6">
        <p className="text-sm text-text-secondary mb-2">
          💡 {t("banner")}
        </p>
        <Link
          href={`/${locale}`}
          className="text-sm text-brand font-semibold hover:underline"
        >
          {t("bannerCta")} →
        </Link>
      </div>

      <TransacoesFiltro
        transacoes={transacoes}
        locale={locale}
        categorias={categorias}
        categoryLabels={categoryLabels}
      />
    </div>
  );
}
