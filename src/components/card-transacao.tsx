import Link from "next/link";
import type { Transacao } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function CardTransacao({
  transacao,
  locale,
}: {
  transacao: Transacao;
  locale: string;
}) {
  return (
    <Link href={`/${locale}/transacoes/${transacao.slug}`}>
      <div className="bg-navy-light border border-navy-border rounded-xl p-5 hover:border-brand/50 transition-colors h-full">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{transacao.emoji}</span>
            <span className="text-xs text-text-muted font-mono">
              {transacao.codigo}
            </span>
          </div>
          <Badge
            variant="secondary"
            className="text-xs bg-brand/10 text-brand border-0 shrink-0"
          >
            {transacao.taxa.percentual > 0
              ? `${transacao.taxa.percentual}%`
              : "Gratis"}
          </Badge>
        </div>
        <h3 className="font-semibold text-sm mb-1">{transacao.titulo}</h3>
        <p className="text-xs text-text-muted line-clamp-2 mb-2">
          {transacao.descricao}
        </p>
        <p className="text-xs text-text-secondary font-mono">
          {transacao.caminho}
        </p>
      </div>
    </Link>
  );
}
