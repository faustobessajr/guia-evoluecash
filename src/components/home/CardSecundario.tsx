import Link from "next/link";

interface CardSecundarioProps {
  emoji: string;
  titulo: string;
  descricao: string;
  contagem?: number;
  href: string;
}

export function CardSecundario({
  emoji,
  titulo,
  descricao,
  contagem,
  href,
}: CardSecundarioProps) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-3 bg-navy-light border border-navy-border rounded-xl p-4 min-h-[120px] hover:border-brand transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <span className="text-2xl leading-none mt-0.5">{emoji}</span>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold mb-1 group-hover:text-brand transition-colors">
          {titulo}
        </h4>
        <p className="text-xs text-text-secondary leading-relaxed mb-2">
          {descricao}
        </p>
        {contagem ? (
          <span className="text-xs text-text-muted group-hover:text-brand transition-colors">
            → {contagem} situações
          </span>
        ) : null}
      </div>
    </Link>
  );
}
