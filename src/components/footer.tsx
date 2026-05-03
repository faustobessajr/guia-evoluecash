import { AsciiDivider } from "./ascii-divider";

export function Footer({
  messages,
}: {
  messages: { whatsapp: string; site: string; disclaimer: string };
}) {
  return (
    <footer className="mt-auto border-t border-navy-border">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 text-center">
        <AsciiDivider />
        <div className="space-y-2 mt-4 text-sm text-text-muted">
          <p>
            <a
              href="https://wa.me/5547989128640"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand transition-colors"
            >
              {messages.whatsapp}
            </a>
          </p>
          <p>
            <a
              href="https://evoluecash.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline"
            >
              {messages.site}
            </a>
          </p>
          <p className="text-xs mt-4 max-w-2xl mx-auto leading-relaxed">
            {messages.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
