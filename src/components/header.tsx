"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { LanguageSwitch } from "./language-switch";

type HeaderNav = {
  home: string;
  howItWorks: string;
  calculator: string;
  support: string;
  openAccount: string;
};

export function Header({
  locale,
  nav,
}: {
  locale: string;
  nav: HeaderNav;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: nav.home, href: `/${locale}` },
    { label: nav.howItWorks, href: `/${locale}/como-funciona` },
    { label: nav.calculator, href: `/${locale}/calculadora` },
    {
      label: nav.support,
      href: "https://wa.me/5547989128640",
      external: true,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur border-b border-navy-border">
      <div className="max-w-5xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="text-brand font-bold text-lg font-mono"
        >
          EvolueCash
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5 text-sm text-text-secondary">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-text-primary transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://app.evoluecash.com.br/account-creation"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors"
          >
            {nav.openAccount}
          </a>
          <div className="hidden md:block">
            <LanguageSwitch locale={locale} />
          </div>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-navy-border bg-navy">
          <nav className="flex flex-col px-4 py-3 gap-3 text-sm">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-text-secondary hover:text-text-primary py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-2 border-t border-navy-border">
              <LanguageSwitch locale={locale} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
