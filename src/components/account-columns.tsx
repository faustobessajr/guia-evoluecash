type AccountInfo = {
  title: string;
  description: string;
  bullets: string[];
};

const emojis = { payments: "🇧🇷", crypto: "💵", comex: "🌍" };

export function AccountColumns({
  accounts,
}: {
  accounts: {
    payments: AccountInfo;
    crypto: AccountInfo;
    comex: AccountInfo;
  };
}) {
  const entries = [
    { key: "payments" as const, ...accounts.payments },
    { key: "crypto" as const, ...accounts.crypto },
    { key: "comex" as const, ...accounts.comex },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {entries.map((acc) => (
        <div
          key={acc.key}
          className="bg-navy-light border border-navy-border rounded-xl p-6"
        >
          <span className="text-3xl block mb-3">
            {emojis[acc.key]}
          </span>
          <h3 className="text-lg font-bold mb-2">{acc.title}</h3>
          <p className="text-sm text-text-secondary mb-4">
            {acc.description}
          </p>
          <ul className="space-y-2">
            {acc.bullets.map((b, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm text-text-secondary"
              >
                <span className="text-brand shrink-0">&#10003;</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
