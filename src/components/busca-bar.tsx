"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Transacao, Operacao } from "@/lib/types";

type SearchItem = {
  type: "transacao" | "operacao";
  codigo: string;
  titulo: string;
  descricao: string;
  slug: string;
  emoji: string;
};

export function BuscaBar({
  transacoes,
  operacoes,
  locale,
  placeholder,
  labels,
}: {
  transacoes: Transacao[];
  operacoes: Operacao[];
  locale: string;
  placeholder: string;
  labels: { transacao: string; operacao: string };
}) {
  const [query, setQuery] = useState("");

  const items: SearchItem[] = useMemo(
    () => [
      ...transacoes.map((t) => ({
        type: "transacao" as const,
        codigo: t.codigo,
        titulo: t.titulo,
        descricao: t.descricao,
        slug: t.slug,
        emoji: t.emoji,
      })),
      ...operacoes.map((o) => ({
        type: "operacao" as const,
        codigo: o.codigo,
        titulo: o.titulo,
        descricao: o.para_quem,
        slug: o.slug,
        emoji: o.emoji,
      })),
    ],
    [transacoes, operacoes]
  );

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["titulo", "descricao", "codigo"],
        threshold: 0.4,
      }),
    [items]
  );

  const results = query.length >= 2 ? fuse.search(query).slice(0, 10) : [];

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-navy-light border border-navy-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand transition-colors"
        />
      </div>
      {results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-navy-light border border-navy-border rounded-xl overflow-hidden z-50 shadow-lg">
          {results.map(({ item }) => (
            <Link
              key={`${item.type}-${item.slug}`}
              href={`/${locale}/${item.type === "transacao" ? "transacoes" : "operacoes"}/${item.slug}`}
              onClick={() => setQuery("")}
              className="flex items-center gap-3 px-4 py-3 hover:bg-navy transition-colors border-b border-navy-border last:border-0"
            >
              <span className="text-lg">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.titulo}</p>
                <p className="text-xs text-text-muted truncate">
                  {item.codigo}
                </p>
              </div>
              <Badge
                variant="secondary"
                className="text-[10px] bg-navy border border-navy-border shrink-0"
              >
                {item.type === "transacao" ? labels.transacao : labels.operacao}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
