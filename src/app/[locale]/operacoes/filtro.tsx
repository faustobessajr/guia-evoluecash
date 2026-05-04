"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Operacao, CategoriaUI } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Callout } from "@/components/callout";

const validCategories: CategoriaUI[] = [
  "receber",
  "pagar",
  "internacional",
  "dolarizacao",
  "liberal",
  "trader",
  "cobranca",
];

function filterOperacoes(operacoes: Operacao[], categorias: string[]): Operacao[] {
  if (categorias.length === 0) return operacoes;
  if (categorias.includes("receber-pagar-br")) {
    return operacoes.filter((op) => {
      const cats = op.categoriaUI ?? [];
      return (
        (cats.includes("receber") || cats.includes("pagar") || cats.includes("cobranca")) &&
        !cats.includes("internacional")
      );
    });
  }
  return operacoes.filter((op) =>
    categorias.every((cat) => op.categoriaUI?.includes(cat as CategoriaUI))
  );
}

export function OperacoesFiltro({
  operacoes,
  locale,
  categoryMeta,
  banner,
  viewSteps,
}: {
  operacoes: Operacao[];
  locale: string;
  categoryMeta: Record<string, { title: string; sub: string }>;
  banner: string;
  viewSteps: string;
}) {
  const searchParams = useSearchParams();
  // Support multiple ?categoria= params
  const catParams = searchParams.getAll("categoria");
  // For single-category active chip highlight
  const singleCat = catParams.length === 1 && validCategories.includes(catParams[0] as CategoriaUI)
    ? catParams[0] as CategoriaUI
    : null;
  const active = catParams.length > 0 ? catParams : null;

  const filtered = active ? filterOperacoes(operacoes, active) : operacoes;

  // Meta: use singleCat for known categories, fall back to "all"
  const meta = singleCat ? categoryMeta[singleCat] : categoryMeta["all"];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">{meta.title}</h1>
      <p className="text-text-secondary text-sm mb-6">{meta.sub}</p>

      {!active && (
        <Callout variant="dica">{banner}</Callout>
      )}



      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href={`/${locale}/operacoes`}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            !active
              ? "bg-brand text-white"
              : "bg-navy-light text-text-secondary border border-navy-border hover:border-brand/50"
          }`}
        >
          {categoryMeta["all"].title}
        </Link>
        {validCategories.map((cat) => (
          <Link
            key={cat}
            href={`/${locale}/operacoes?categoria=${cat}`}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              singleCat === cat
                ? "bg-brand text-white"
                : "bg-navy-light text-text-secondary border border-navy-border hover:border-brand/50"
            }`}
          >
            {categoryMeta[cat]?.title}
          </Link>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((op) => (
          <Link key={op.codigo} href={`/${locale}/operacoes/${op.slug}`}>
            <div className="bg-navy-light border border-navy-border rounded-xl p-5 hover:border-brand/50 transition-colors h-full">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{op.emoji}</span>
                  <span className="text-xs text-text-muted font-mono">
                    {op.codigo}
                  </span>
                </div>
                {op.custo_total_pct > 0 && (
                  <Badge
                    variant="secondary"
                    className="text-xs bg-brand/10 text-brand border-0 shrink-0"
                  >
                    ~{op.custo_total_pct}%
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-sm mb-1">{op.titulo}</h3>
              <p className="text-xs text-text-muted line-clamp-1 mb-2">
                {op.para_quem}
              </p>
              <div className="flex items-center gap-3 text-xs text-text-secondary">
                {op.tempo_total && <span>{op.tempo_total}</span>}
              </div>
              <p className="text-xs text-brand mt-2">{viewSteps} →</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
