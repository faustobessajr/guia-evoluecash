import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getOperacoes, getOperacao } from "@/lib/data";
import type { Locale } from "@/lib/types";
import { AsciiDivider } from "@/components/ascii-divider";
import { Callout } from "@/components/callout";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  const locales = ["pt-br", "en-us"];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const operacoes = getOperacoes(locale as Locale);
    for (const o of operacoes) {
      params.push({ locale, slug: o.slug });
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
  const op = getOperacao(locale as Locale, slug);
  if (!op) return { title: "Not Found" };
  return {
    title: `${op.titulo} | Guia EvolueCash`,
    description: op.para_quem,
  };
}

export default async function OperacaoDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const operacao = getOperacao(locale as Locale, slug);
  if (!operacao) notFound();

  const dt = await getTranslations({ locale, namespace: "detail" });
  const opCatT = await getTranslations({ locale, namespace: "operacoes.categories" });

  // Get related operations (same categoriaUI)
  const allOps = getOperacoes(locale as Locale);
  const related = allOps
    .filter(
      (o) =>
        o.codigo !== operacao.codigo &&
        o.categoriaUI?.some((c) => operacao.categoriaUI?.includes(c))
    )
    .slice(0, 3);

  const hasExemplo =
    operacao.exemplo_pratico && operacao.exemplo_pratico.valor_input > 0;

  const showFiscalDisclaimer = operacao.categoriaUI?.some(
    (c) => c === "internacional" || c === "cobranca"
  );

  // Category label for badge
  const catLabel = operacao.categoriaUI?.[0]
    ? opCatT(`${operacao.categoriaUI[0]}.title`)
    : "";

  return (
    <article className="max-w-3xl mx-auto">
      {/* 1. AsciiDivider */}
      <AsciiDivider />

      {/* 2. Header with emoji, title, category badge */}
      <div className="flex items-start gap-4 my-6">
        <span className="text-[64px] leading-none">{operacao.emoji}</span>
        <div className="pt-1">
          <span className="text-xs text-text-muted font-mono">
            {operacao.codigo}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold">{operacao.titulo}</h1>
          {catLabel && (
            <Badge
              variant="secondary"
              className="mt-2 bg-brand/10 text-brand border-0 text-xs"
            >
              {catLabel}
            </Badge>
          )}
        </div>
      </div>

      {/* 3. "Pra quem" box */}
      <div className="bg-navy-light rounded-xl p-5 mb-6">
        <span className="text-xs text-text-muted uppercase tracking-wide block mb-1">
          {dt("para_quem")}
        </span>
        <p className="text-text-secondary text-sm">{operacao.para_quem}</p>
      </div>

      {/* 4. AsciiDivider */}
      <AsciiDivider />

      {/* 5. Operation flow */}
      {operacao.fluxo.length > 0 && (
        <div className="my-6">
          <h3 className="text-lg font-semibold mb-4">{dt("fluxo")}</h3>
          <div className="space-y-3">
            {operacao.fluxo.map((etapa) => (
              <div
                key={etapa.etapa}
                className="bg-navy-light border border-navy-border rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">
                    {etapa.etapa}. {etapa.titulo}
                  </span>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-brand/10 text-brand border-0"
                  >
                    {etapa.taxa_percentual}%
                  </Badge>
                </div>
                <p className="text-xs text-text-muted font-mono mb-1">
                  {etapa.caminho}
                </p>
                <p className="text-xs text-text-secondary">
                  {etapa.descricao}
                </p>
                {etapa.transacao_ref && (
                  <Link
                    href={`/${locale}/transacoes`}
                    className="text-xs text-brand hover:underline mt-1 inline-block"
                  >
                    → {etapa.transacao_ref}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. AsciiDivider */}
      <AsciiDivider />

      {/* 7. Tempo total + Custo total */}
      {(operacao.tempo_total || operacao.custo_total_pct > 0) && (
        <div className="grid grid-cols-2 gap-3 my-6">
          {operacao.tempo_total && (
            <div className="bg-navy-light border border-navy-border rounded-xl p-5 text-center">
              <div className="text-xs text-text-muted uppercase tracking-wide mb-1">
                {dt("tempo_total")}
              </div>
              <div className="text-xl font-bold font-mono text-brand">
                {operacao.tempo_total}
              </div>
            </div>
          )}
          {operacao.custo_total_pct > 0 && (
            <div className="bg-navy-light border border-navy-border rounded-xl p-5 text-center">
              <div className="text-xs text-text-muted uppercase tracking-wide mb-1">
                {dt("custo_total")}
              </div>
              <div className="text-xl font-bold font-mono text-alert-warning">
                ~{operacao.custo_total_pct}%
              </div>
            </div>
          )}
        </div>
      )}

      {/* 8. Calculator callout */}
      {operacao.fluxo.length > 0 && (
        <div className="bg-brand/10 border border-brand/30 rounded-xl p-5 my-6">
          <p className="text-sm text-text-secondary mb-2">
            {dt("openCalc")}
          </p>
          <Link
            href={`/${locale}/calculadora?op=${operacao.codigo}`}
            className="text-sm text-brand font-semibold hover:underline"
          >
            {dt("openCalcLink")} →
          </Link>
        </div>
      )}

      {/* 9. Practical example */}
      {hasExemplo && (
        <div className="my-6">
          <h3 className="text-lg font-semibold mb-3">{dt("exemplo")}</h3>
          <div className="bg-navy-light border border-navy-border rounded-xl p-5">
            <p className="text-sm text-text-secondary mb-3">
              {operacao.exemplo_pratico.descricao_uso}
            </p>
            <div className="space-y-2 mb-3">
              {operacao.exemplo_pratico.breakdown.map((b, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-text-muted">{b.etapa}</span>
                  <span className="font-mono">
                    R$ {b.taxa_brl.toLocaleString("pt-BR")}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-navy-border pt-3 flex justify-between font-semibold text-sm">
              <span>Total taxas</span>
              <span className="text-alert-warning font-mono">
                R${" "}
                {operacao.exemplo_pratico.total_taxa_brl.toLocaleString(
                  "pt-BR"
                )}
              </span>
            </div>
            <p className="text-xs text-brand mt-2">
              {operacao.exemplo_pratico.valor_final_destino}
            </p>
          </div>
        </div>
      )}

      {/* 10. Cuidados + Dicas */}
      {operacao.cuidados.length > 0 && (
        <div className="my-4">
          {operacao.cuidados.map((c, i) => (
            <Callout key={i} variant="cuidado">
              {c}
            </Callout>
          ))}
        </div>
      )}
      {operacao.dicas.length > 0 && (
        <div className="my-4">
          {operacao.dicas.map((d, i) => (
            <Callout key={i} variant="dica">
              {d}
            </Callout>
          ))}
        </div>
      )}

      {/* 11. Fiscal disclaimer */}
      {showFiscalDisclaimer && (
        <Callout variant="atencao">{dt("fiscalDisclaimer")}</Callout>
      )}

      {/* 12. Related operations */}
      {related.length > 0 && (
        <div className="my-6">
          <h3 className="text-sm font-semibold mb-3">
            {dt("operacoes_relacionadas")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {related.map((r) => (
              <Link key={r.codigo} href={`/${locale}/operacoes/${r.slug}`}>
                <Badge
                  variant="secondary"
                  className="bg-navy-light border border-navy-border hover:border-brand/50 cursor-pointer"
                >
                  {r.emoji} {r.codigo} — {r.titulo}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 13. AsciiDivider */}
      <AsciiDivider />

      {/* 14. Dual CTA */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center my-6">
        <a
          href="https://app.evoluecash.com.br/account-creation"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-brand text-white font-semibold px-8 py-3 rounded-xl hover:bg-brand-dark transition-colors text-center"
        >
          {dt("openAccount")} →
        </a>
        <a
          href="https://wa.me/5547989128640"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-navy-border text-text-secondary font-semibold px-8 py-3 rounded-xl hover:border-brand hover:text-brand transition-colors text-center"
        >
          {dt("talkSupport")}
        </a>
      </div>

      <AsciiDivider />
    </article>
  );
}
