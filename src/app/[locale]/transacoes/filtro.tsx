"use client";

import { useState } from "react";
import type { Transacao, CategoriaTransacao } from "@/lib/types";
import { CardTransacao } from "@/components/card-transacao";

export function TransacoesFiltro({
  transacoes,
  locale,
  categorias,
  categoryLabels,
}: {
  transacoes: Transacao[];
  locale: string;
  categorias: CategoriaTransacao[];
  categoryLabels: Record<string, string>;
}) {
  const [active, setActive] = useState<CategoriaTransacao | null>(null);

  const filtered = active
    ? transacoes.filter((t) => t.categoria === active)
    : transacoes;

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActive(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            active === null
              ? "bg-brand text-white"
              : "bg-navy-light text-text-secondary border border-navy-border hover:border-brand/50"
          }`}
        >
          Todos
        </button>
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(active === cat ? null : cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              active === cat
                ? "bg-brand text-white"
                : "bg-navy-light text-text-secondary border border-navy-border hover:border-brand/50"
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((t) => (
          <CardTransacao key={t.codigo} transacao={t} locale={locale} />
        ))}
      </div>
    </>
  );
}
