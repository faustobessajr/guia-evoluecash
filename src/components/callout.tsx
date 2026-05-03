import { cn } from "@/lib/utils";

type CalloutVariant = "dica" | "atencao" | "cuidado";

const variantConfig: Record<
  CalloutVariant,
  { bg: string; border: string; icon: string }
> = {
  dica: {
    bg: "bg-brand/10",
    border: "border-l-brand",
    icon: "💡",
  },
  atencao: {
    bg: "bg-alert-warning/10",
    border: "border-l-alert-warning",
    icon: "⚠️",
  },
  cuidado: {
    bg: "bg-alert-danger/10",
    border: "border-l-alert-danger",
    icon: "🚨",
  },
};

export function Callout({
  variant,
  children,
}: {
  variant: CalloutVariant;
  children: React.ReactNode;
}) {
  const config = variantConfig[variant];
  return (
    <div
      className={cn(
        "rounded-lg border-l-4 p-4 my-3",
        config.bg,
        config.border
      )}
    >
      <div className="flex gap-2 items-start">
        <span className="text-lg shrink-0">{config.icon}</span>
        <div className="text-sm text-text-secondary">{children}</div>
      </div>
    </div>
  );
}
