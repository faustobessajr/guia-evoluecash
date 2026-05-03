const numberEmojis = [
  "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣",
  "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟",
];

export function PassoAPasso({
  passos,
  title,
}: {
  passos: string[];
  title: string;
}) {
  return (
    <div className="my-4">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="space-y-3">
        {passos.map((passo, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="text-lg shrink-0">
              {numberEmojis[i] ?? `${i + 1}.`}
            </span>
            <p className="text-text-secondary text-sm leading-relaxed pt-0.5">
              {passo}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
