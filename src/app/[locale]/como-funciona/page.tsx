import { getTranslations, setRequestLocale } from "next-intl/server";
import { AsciiDivider } from "@/components/ascii-divider";
import { AccountColumns } from "@/components/account-columns";
import { ChevronRight } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "comoFunciona" });
  return {
    title: `${t("title")} | Guia EvolueCash`,
    description: t("subtitle"),
  };
}

export default async function ComoFuncionaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "comoFunciona" });
  const homeT = await getTranslations({ locale, namespace: "home" });
  const ctaT = await getTranslations({ locale, namespace: "home.ctaFinal" });

  const flowSteps = t.raw("flowSteps") as string[];

  const whyUse = [
    { icon: "⚡", text: t("whyUse.speed") },
    { icon: "💰", text: t("whyUse.cost") },
    { icon: "🔍", text: t("whyUse.transparency") },
    { icon: "💬", text: t("whyUse.humanSupport") },
  ];

  const accounts = {
    payments: {
      title: homeT("accounts.payments.title"),
      description: homeT("accounts.payments.description"),
      bullets: (
        await getTranslations({
          locale,
          namespace: "home.accounts.payments",
        })
      ).raw("bullets") as string[],
    },
    crypto: {
      title: homeT("accounts.crypto.title"),
      description: homeT("accounts.crypto.description"),
      bullets: (
        await getTranslations({
          locale,
          namespace: "home.accounts.crypto",
        })
      ).raw("bullets") as string[],
    },
    comex: {
      title: homeT("accounts.comex.title"),
      description: homeT("accounts.comex.description"),
      bullets: (
        await getTranslations({
          locale,
          namespace: "home.accounts.comex",
        })
      ).raw("bullets") as string[],
    },
  };

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Header */}
      <section className="text-center pt-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {t("title")}
        </h1>
        <p className="text-text-secondary text-lg">{t("subtitle")}</p>
      </section>

      <AsciiDivider />

      {/* 3 account columns */}
      <AccountColumns accounts={accounts} />

      <AsciiDivider />

      {/* International flow diagram */}
      <section>
        <h2 className="text-xl font-bold mb-6 text-center">
          {t("flowTitle")}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-1 md:gap-0">
          {flowSteps.map((step, i) => (
            <div key={i} className="flex items-center">
              <div className="bg-navy-light border border-navy-border rounded-lg px-3 py-2 text-xs md:text-sm font-medium text-center min-w-[80px]">
                {step}
              </div>
              {i < flowSteps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-brand mx-1 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </section>

      <AsciiDivider />

      {/* Why use */}
      <section>
        <h2 className="text-xl font-bold mb-6 text-center">
          {t("whyUseTitle")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {whyUse.map((item, i) => (
            <div
              key={i}
              className="bg-navy-light border border-navy-border rounded-xl p-5 flex gap-3 items-start"
            >
              <span className="text-2xl">{item.icon}</span>
              <p className="text-sm text-text-secondary">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <AsciiDivider />

      {/* CTA */}
      <section className="text-center space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://evoluecash.com.br/cadastro"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand text-white font-semibold px-8 py-3 rounded-xl hover:bg-brand-dark transition-colors text-center"
          >
            {ctaT("primary")}
          </a>
          <a
            href="https://wa.me/5547989128640"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-navy-border text-text-secondary font-semibold px-8 py-3 rounded-xl hover:border-brand hover:text-brand transition-colors text-center"
          >
            {ctaT("secondary")}
          </a>
        </div>
      </section>
    </div>
  );
}
