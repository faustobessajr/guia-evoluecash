import Link from "next/link";
import type { Operacao } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function CardOperacao({
  operacao,
  locale,
}: {
  operacao: Operacao;
  locale: string;
}) {
  return (
    <Link href={`/${locale}/operacoes/${operacao.slug}`}>
      <div className="bg-navy-light border border-navy-border rounded-xl p-5 hover:border-brand/50 transition-colors h-full">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{operacao.emoji}</span>
            <span className="text-xs text-text-muted font-mono">
              {operacao.codigo}
            </span>
          </div>
          {operacao.custo_total_pct > 0 && (
            <Badge
              variant="secondary"
              className="text-xs bg-brand/10 text-brand border-0 shrink-0"
            >
              ~{operacao.custo_total_pct}%
            </Badge>
          )}
        </div>
        <h3 className="font-semibold text-sm mb-1">{operacao.titulo}</h3>
        <p className="text-xs text-text-muted line-clamp-2 mb-2">
          {operacao.para_quem}
        </p>
        {operacao.tempo_total && (
          <p className="text-xs text-text-secondary">
            {operacao.tempo_total}
          </p>
        )}
      </div>
    </Link>
  );
}
