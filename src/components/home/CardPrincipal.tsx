import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";

interface CardPrincipalProps {
  emoji: string;
  titulo: string;
  descricao: string;
  taxa: string;
  contagem?: number;
  contagemLabel?: string;
  ctaTexto?: string;
  href: string;
  modos?: string[];
  isAction?: boolean;
}

export function CardPrincipal({
  emoji,
  titulo,
  descricao,
  taxa,
  contagem,
  contagemLabel,
  ctaTexto,
  href,
  modos = [],
  isAction = false,
}: CardPrincipalProps) {
  return (
    <Link
      href={href}
      className="group block bg-navy-light border border-navy-border rounded-xl p-5 min-h-[180px] md:min-h-[220px] hover:border-brand transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="text-3xl leading-none">{emoji}</span>
        <h3 className="text-base font-bold leading-snug group-hover:text-brand transition-colors">
          {titulo}
        </h3>
      </div>

      <p className="text-sm text-text-secondary mb-4 leading-relaxed">
        {descricao}
      </p>

      {modos.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {modos.map((modo, i) => (
            <span
              key={i}
              className="text-[11px] bg-navy border border-navy-border rounded px-2 py-0.5 text-text-muted"
            >
              {modo}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-1">
        <span className="text-xs font-mono text-brand">{taxa}</span>
        {isAction ? (
          <span className="flex items-center gap-1 text-xs text-brand font-medium">
            <Calculator size={13} />
            {ctaTexto || "Abrir"}
            <ArrowRight size={13} />
          </span>
        ) : contagem ? (
          <span className="text-xs text-text-muted group-hover:text-brand transition-colors">
            → {contagem} {contagemLabel}
          </span>
        ) : null}
      </div>
    </Link>
  );
}
