"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales } from "@/i18n/config";

const labels: Record<string, string> = {
  "pt-br": "🇧🇷 PT",
  "en-us": "🇺🇸 EN",
};

export function LanguageSwitch({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  }

  return (
    <div className="flex gap-1">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
            locale === loc
              ? "bg-brand text-white"
              : "bg-navy-light text-text-secondary hover:text-text-primary"
          }`}
        >
          {labels[loc]}
        </button>
      ))}
    </div>
  );
}
