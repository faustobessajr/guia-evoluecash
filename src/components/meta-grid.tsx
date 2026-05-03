type MetaItem = {
  label: string;
  value: string;
};

export function MetaGrid({ items }: { items: MetaItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 my-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-navy rounded-lg border border-navy-border p-3"
        >
          <div className="text-xs text-text-muted uppercase tracking-wide">
            {item.label}
          </div>
          <div className="text-sm text-text-primary mt-1 font-medium">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}
