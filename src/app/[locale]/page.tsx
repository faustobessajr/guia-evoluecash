import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getTransacoes, getOperacoes } from "@/lib/data";
import type { Locale } from "@/lib/types";
import { BuscaBar } from "@/components/busca-bar";
import { AsciiDivider } from "@/components/ascii-divider";
import { FaqAccordion } from "@/components/faq-accordion";
import { AccountColumns } from "@/components/account-columns";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  const otherLocale = locale === "pt-br" ? "en-us" : "pt-br";
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        "pt-br": "/pt-br",
        "en-us": "/en-us",
      },
    },
  };
}

const situationCards = [
  {
    key: "receive",
    emoji: "💸",
    categoria: "receber",
    modes: ["payments", "crypto"],
  },
  {
    key: "pay",
    emoji: "📤",
    categoria: "pagar",
    modes: ["payments", "crypto"],
  },
  {
    key: "international",
    emoji: "🌍",
    categoria: "internacional",
    modes: ["crypto"],
  },
  {
    key: "save",
    emoji: "💵",
    categoria: "dolarizacao",
    modes: ["crypto"],
  },
  {
    key: "liberal",
    emoji: "👨‍⚕️",
    categoria: "liberal",
    modes: ["payments", "crypto"],
  },
  {
    key: "trader",
    emoji: "📈",
    categoria: "trader",
    modes: ["crypto"],
  },
  {
    key: "billing",
    emoji: "📋",
    categoria: "cobranca",
    modes: ["payments", "crypto"],
  },
  {
    key: "calculate",
    emoji: "🧮",
    categoria: null,
    modes: [],
  },
] as const;

const heroChipLinks = [
  { key: "payAbroad", href: "/operacoes/importador-paga-fornecedor-exterior" },
  { key: "receiveAbroad", href: "/operacoes/exportador-recebe-exterior-usdt" },
  { key: "saveDollar", href: "/operacoes/pf-dolariza-poupanca" },
  { key: "calculate", href: "/calculadora" },
] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
  const searchT = await getTranslations({ locale, namespace: "search" });
  const modesT = await getTranslations({
    locale,
    namespace: "home.situationModes",
  });

  const transacoes = getTransacoes(locale as Locale);
  const operacoes = getOperacoes(locale as Locale);

  const faqItems = (
    await getTranslations({ locale, namespace: "home.faq" })
  ).raw("items") as { q: string; a: string }[];

  const accounts = {
    payments: {
      title: t("accounts.payments.title"),
      description: t("accounts.payments.description"),
      bullets: (
        await getTranslations({
          locale,
          namespace: "home.accounts.payments",
        })
      ).raw("bullets") as string[],
    },
    crypto: {
      title: t("accounts.crypto.title"),
      description: t("accounts.crypto.description"),
      bullets: (
        await getTranslations({
          locale,
          namespace: "home.accounts.crypto",
        })
      ).raw("bullets") as string[],
    },
    comex: {
      title: t("accounts.comex.title"),
      description: t("accounts.comex.description"),
      bullets: (
        await getTranslations({
          locale,
          namespace: "home.accounts.comex",
        })
      ).raw("bullets") as string[],
    },
  };

  return (
    <div className="space-y-12">
      {/* SECTION A — HERO */}
      <section className="text-center space-y-5 pt-8">
        <h1 className="text-3xl md:text-5xl font-bold">
          {t("heroTitle")}
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          {t("heroSubtitle")}
        </p>
        <BuscaBar
          transacoes={transacoes}
          operacoes={operacoes}
          locale={locale}
          placeholder={t("searchPlaceholder")}
          labels={{
            transacao: searchT("transacao"),
            operacao: searchT("operacao"),
          }}
        />
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {heroChipLinks.map((chip) => (
            <Link
              key={chip.key}
              href={`/${locale}${chip.href}`}
              className="bg-navy-light border border-navy-border rounded-lg px-3 py-1.5 text-xs text-text-secondary hover:border-brand/50 hover:text-brand transition-colors"
            >
              {t(`heroChips.${chip.key}`)}
            </Link>
          ))}
        </div>
      </section>

      <AsciiDivider />

      {/* SECTION B — WHAT DO YOU NEED TO DO */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            {t("whatToDo.title")}
          </h2>
          <p className="text-text-secondary text-sm">
            {t("whatToDo.subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {situationCards.map((card) => {
            const href =
              card.categoria === null
                ? `/${locale}/calculadora`
                : `/${locale}/operacoes?categoria=${card.categoria}`;

            return (
              <Link key={card.key} href={href}>
                <div className="bg-navy-light border border-navy-border rounded-xl p-6 h-full hover:scale-[1.02] hover:border-brand transition-all">
                  <span className="text-[32px] block mb-3">{card.emoji}</span>
                  <h3 className="text-lg font-bold mb-1">
                    {t(`situations.${card.key}.title`)}
                  </h3>
                  <p className="text-sm text-text-secondary mb-3">
                    {t(`situations.${card.key}.sub`)}
                  </p>
                  <p className="text-sm font-mono text-brand mb-2">
                    {t(`situations.${card.key}.fee`)}
                  </p>
                  {card.modes.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {card.modes.map((mode) => (
                        <span
                          key={mode}
                          className="text-[10px] bg-navy border border-navy-border rounded px-1.5 py-0.5 text-text-muted"
                        >
                          {mode === "payments" ? "🇧🇷" : "💵"}{" "}
                          {modesT(mode)}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-[13px] text-text-secondary">
                    → {t(`situations.${card.key}.count`)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <AsciiDivider />

      {/* SECTION C — HOW YOUR ACCOUNT WORKS */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            {t("howItWorks.title")}
          </h2>
          <p className="text-text-secondary text-sm">
            {t("howItWorks.subtitle")}
          </p>
        </div>
        <AccountColumns accounts={accounts} />
      </section>

      <AsciiDivider />

      {/* SECTION D — FAQ */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
          {t("faq.title")}
        </h2>
        <FaqAccordion items={faqItems} />
      </section>

      <AsciiDivider />

      {/* SECTION E — CTA FINAL */}
      <section className="text-center space-y-4">
        <h2 className="text-xl md:text-2xl font-bold">
          {t("ctaFinal.title")}
        </h2>
        <p className="text-text-secondary">
          {t("ctaFinal.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <a
            href="https://evoluecash.com.br/cadastro"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand text-white font-semibold px-8 py-3 rounded-xl hover:bg-brand-dark transition-colors text-center"
          >
            {t("ctaFinal.primary")}
          </a>
          <a
            href="https://wa.me/5547989128640"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-navy-border text-text-secondary font-semibold px-8 py-3 rounded-xl hover:border-brand hover:text-brand transition-colors text-center"
          >
            {t("ctaFinal.secondary")}
          </a>
        </div>
      </section>

      <AsciiDivider />

      {/* SECTION F — SEE ALL */}
      <section className="text-center space-y-3">
        <h3 className="text-lg font-semibold text-text-secondary">
          {t("seeAll.title")}
        </h3>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/${locale}/transacoes`}
            className="text-sm text-text-muted hover:text-brand transition-colors"
          >
            {t("seeAll.transactions")} →
          </Link>
          <Link
            href={`/${locale}/operacoes`}
            className="text-sm text-text-muted hover:text-brand transition-colors"
          >
            {t("seeAll.operations")} →
          </Link>
        </div>
      </section>
    </div>
  );
}
