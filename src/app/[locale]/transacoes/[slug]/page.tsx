import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getTransacoes, getTransacao, getTransacaoByCodigo } from "@/lib/data";
import type { Locale } from "@/lib/types";
import { AsciiDivider } from "@/components/ascii-divider";
import { MetaGrid } from "@/components/meta-grid";
import { PassoAPasso } from "@/components/passo-a-passo";
import { Callout } from "@/components/callout";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  const locales = ["pt-br", "en-us"];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const transacoes = getTransacoes(locale as Locale);
    for (const t of transacoes) {
      params.push({ locale, slug: t.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = getTransacao(locale as Locale, slug);
  if (!t) return { title: "Not Found" };
  return {
    title: `${t.titulo} | Guia EvolueCash`,
    description: t.descricao,
  };
}

export default async function TransacaoDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const transacao = getTransacao(locale as Locale, slug);
  if (!transacao) notFound();

  const dt = await getTranslations({ locale, namespace: "detail" });

  const metaItems = [
    { label: dt("caminho"), value: transacao.caminho },
    { label: dt("modo"), value: transacao.modo },
    { label: dt("taxa"), value: transacao.taxa.descricao },
    { label: dt("tempo"), value: transacao.tempo },
    ...(transacao.limites?.min
      ? [{ label: dt("minimo"), value: transacao.limites.min }]
      : []),
    ...(transacao.limites?.max
      ? [{ label: dt("maximo"), value: transacao.limites.max }]
      : []),
    { label: dt("horario"), value: transacao.horario },
  ];

  const relacionadas = (transacao.relacionadas ?? [])
    .map((cod) => getTransacaoByCodigo(locale as Locale, cod))
    .filter(Boolean);

  return (
    <article className="max-w-3xl mx-auto">
      <AsciiDivider />

      <div className="flex items-center gap-3 my-4">
        <span className="text-4xl">{transacao.emoji}</span>
        <div>
          <span className="text-xs text-text-muted font-mono">
            {transacao.codigo}
          </span>
          <h1 className="text-2xl font-bold">{transacao.titulo}</h1>
        </div>
      </div>

      <AsciiDivider />

      <p className="text-text-secondary my-4">{transacao.descricao}</p>

      <MetaGrid items={metaItems} />

      <PassoAPasso passos={transacao.passos} title={dt("passo_a_passo")} />

      {transacao.dica && <Callout variant="dica">{transacao.dica}</Callout>}
      {transacao.atencao && (
        <Callout variant="atencao">{transacao.atencao}</Callout>
      )}
      {transacao.cuidado && (
        <Callout variant="cuidado">{transacao.cuidado}</Callout>
      )}

      {relacionadas.length > 0 && (
        <div className="my-6">
          <h3 className="text-sm font-semibold mb-3">
            {dt("transacoes_relacionadas")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {relacionadas.map(
              (r) =>
                r && (
                  <Link key={r.codigo} href={`/${locale}/transacoes/${r.slug}`}>
                    <Badge
                      variant="secondary"
                      className="bg-navy-light border border-navy-border hover:border-brand/50 cursor-pointer"
                    >
                      {r.emoji} {r.codigo} — {r.titulo}
                    </Badge>
                  </Link>
                )
            )}
          </div>
        </div>
      )}

      <AsciiDivider />

      <div className="text-center my-6">
        <a
          href="https://evoluecash.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-brand text-white font-semibold px-8 py-3 rounded-xl hover:bg-brand-dark transition-colors"
        >
          {dt("cta")} →
        </a>
      </div>

      <AsciiDivider />
    </article>
  );
}
