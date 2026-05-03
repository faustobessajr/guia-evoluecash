import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/config";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getTranslations, setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const headerT = await getTranslations({ locale, namespace: "header" });
  const footerT = await getTranslations({ locale, namespace: "footer" });

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header
        locale={locale}
        nav={{
          home: headerT("home"),
          howItWorks: headerT("howItWorks"),
          calculator: headerT("calculator"),
          support: headerT("support"),
          openAccount: headerT("openAccount"),
        }}
      />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-8 py-8">
        {children}
      </main>
      <Footer
        messages={{
          whatsapp: footerT("whatsapp"),
          site: footerT("site"),
          disclaimer: footerT("disclaimer"),
        }}
      />
    </NextIntlClientProvider>
  );
}
