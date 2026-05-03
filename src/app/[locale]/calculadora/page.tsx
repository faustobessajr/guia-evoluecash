import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getOperacoes } from "@/lib/data";
import type { Locale } from "@/lib/types";
import { CalculadoraWidget } from "@/components/calculadora-widget";
import { AsciiDivider } from "@/components/ascii-divider";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "calc" });
  return { title: `${t("title")} | Guia EvolueCash` };
}

export default async function CalculadoraPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "calc" });
  const operacoes = getOperacoes(locale as Locale);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
      <AsciiDivider />
      <div className="mt-6">
        <Suspense>
          <CalculadoraWidget
            operacoes={operacoes}
            locale={locale as Locale}
            messages={{
              selectOp: t("selectOp"),
              amount: t("amount"),
              currency: t("currency"),
              selectedOperation: t("selectedOperation"),
              youWillMove: t("youWillMove"),
              breakdown: t("breakdown"),
              totalFees: t("totalFees"),
              effectiveCost: t("effectiveCost"),
              estimatedTime: t("estimatedTime"),
              netAtDestination: t("netAtDestination"),
              share: t("share"),
              viewSteps: t("viewSteps"),
              fxNotice: t("fxNotice"),
            }}
          />
        </Suspense>
      </div>
    </div>
  );
}
