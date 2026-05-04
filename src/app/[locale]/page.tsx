import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getTransacoes, getOperacoes, contarOps, contarOpsBR } from "@/lib/data";
import type { Locale } from "@/lib/types";
import { BuscaBar } from "@/components/busca-bar";
import { AsciiDivider } from "@/components/ascii-divider";
import { FaqAccordion } from "@/components/faq-accordion";
import { AccountColumns } from "@/components/account-columns";
import { CardPrincipal } from "@/components/home/CardPrincipal";
import { CardSecundario } from "@/components/home/CardSecundario";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
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

const heroChipLinks = [
  { key: "payAbroad", href: "/operacoes?categoria=pagar&categoria=internacional" },
  { key: "receiveAbroad", href: "/operacoes?categoria=receber&categoria=internacional" },
  { key: "brPix", href: "/operacoes?categoria=receber-pagar-br" },
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
        await getTranslations({ locale, namespace: "home.accounts.payments" })
      ).raw("bullets") as string[],
    },
    crypto: {
      title: t("accounts.crypto.title"),
      description: t("accounts.crypto.description"),
      bullets: (
        await getTranslations({ locale, namespace: "home.accounts.crypto" })
      ).raw("bullets") as string[],
    },
    comex: {
      title: t("accounts.comex.title"),
      description: t("accounts.comex.description"),
      bullets: (
        await getTranslations({ locale, namespace: "home.accounts.comex" })
      ).raw("bullets") as string[],
    },
  };

  // Card counts (computed server-side)
  const l = locale as Locale;
  const countPagarInternacional = contarOps(l, "pagar", "internacional");
  const countReceberInternacional = contarOps(l, "receber", "internacional");
  const countBR = contarOpsBR(l);
  const countDolarizacao = contarOps(l, "dolarizacao");
  const countLiberal = contarOps(l, "liberal");
  const countTrader = contarOps(l, "trader");
  const countCobranca = contarOps(l, "cobranca");

  const cards = t.raw("cards") as Record<string, unknown>;
  const principal = (cards as any).principal;
  const outras = (cards as any).outras;

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
              className="bg-navy-light border border-navy-border rounded-lg px-3 py-1.5 min-h-[44px] flex items-center text-xs text-text-secondary hover:border-brand/50 hover:text-brand transition-colors"
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

        {/* 4 main cards — 1 col mobile, 2 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <CardPrincipal
            emoji="💵"
            titulo={principal.pagar_exterior.titulo}
            descricao={principal.pagar_exterior.descricao}
            taxa={principal.pagar_exterior.taxa}
            contagem={countPagarInternacional}
            contagemLabel={locale === "pt-br" ? "situações" : "situations"}
            href={`/${locale}/operacoes?categoria=pagar&categoria=internacional`}
            modos={principal.pagar_exterior.modos}
          />
          <CardPrincipal
            emoji="🌎"
            titulo={principal.receber_exterior.titulo}
            descricao={principal.receber_exterior.descricao}
            taxa={principal.receber_exterior.taxa}
            contagem={countReceberInternacional}
            contagemLabel={locale === "pt-br" ? "situações" : "situations"}
            href={`/${locale}/operacoes?categoria=receber&categoria=internacional`}
            modos={principal.receber_exterior.modos}
          />
          <CardPrincipal
            emoji="💸"
            titulo={principal.br_pix.titulo}
            descricao={principal.br_pix.descricao}
            taxa={principal.br_pix.taxa}
            contagem={countBR}
            contagemLabel={locale === "pt-br" ? "situações" : "situations"}
            href={`/${locale}/operacoes?categoria=receber-pagar-br`}
            modos={principal.br_pix.modos}
          />
          <CardPrincipal
            emoji="🧮"
            titulo={principal.calcular.titulo}
            descricao={principal.calcular.descricao}
            taxa={principal.calcular.taxa}
            ctaTexto={principal.calcular.cta}
            href={`/${locale}/calculadora`}
            isAction
          />
        </div>

        {/* Expandable secondary cards */}
        <details className="mt-6 group">
          <summary className="flex items-center gap-2 cursor-pointer list-none select-none w-fit mx-auto py-3 px-4 rounded-lg border border-navy-border bg-navy-light hover:border-brand text-sm text-text-secondary hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
            <span className="group-open:hidden">▸</span>
            <span className="hidden group-open:inline">▾</span>
            {outras.toggle}
          </summary>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-4">
            <CardSecundario
              emoji="💵"
              titulo={outras.guardar_dolar.titulo}
              descricao={outras.guardar_dolar.descricao}
              contagem={countDolarizacao}
              href={`/${locale}/operacoes?categoria=dolarizacao`}
            />
            <CardSecundario
              emoji="👨‍⚕️"
              titulo={outras.liberal.titulo}
              descricao={outras.liberal.descricao}
              contagem={countLiberal}
              href={`/${locale}/operacoes?categoria=liberal`}
            />
            <CardSecundario
              emoji="📈"
              titulo={outras.cripto.titulo}
              descricao={outras.cripto.descricao}
              contagem={countTrader}
              href={`/${locale}/operacoes?categoria=trader`}
            />
            <CardSecundario
              emoji="📋"
              titulo={outras.cobrar.titulo}
              descricao={outras.cobrar.descricao}
              contagem={countCobranca}
              href={`/${locale}/operacoes?categoria=cobranca`}
            />
          </div>
        </details>
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
            href="https://app.evoluecash.com.br/account-creation"
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
