"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import type { Operacao } from "@/lib/types";
import { calcularOperacao } from "@/lib/calc";
import type { Locale } from "@/lib/types";
import { AsciiDivider } from "./ascii-divider";
import { Callout } from "./callout";

type CalcMessages = {
  selectOp: string;
  amount: string;
  currency: string;
  selectedOperation: string;
  youWillMove: string;
  breakdown: string;
  totalFees: string;
  effectiveCost: string;
  estimatedTime: string;
  netAtDestination: string;
  share: string;
  viewSteps: string;
  fxNotice: string;
};

export function CalculadoraWidget({
  operacoes,
  locale,
  messages,
}: {
  operacoes: Operacao[];
  locale: Locale;
  messages: CalcMessages;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const initialOp = searchParams.get("op") || "";
  const initialValor = searchParams.get("valor") || "";
  const initialMoeda =
    (searchParams.get("moeda") as "BRL" | "USD") || "BRL";

  const [codigo, setCodigo] = useState(initialOp);
  const [valor, setValor] = useState(initialValor);
  const [moeda, setMoeda] = useState<"BRL" | "USD">(initialMoeda);

  const valorNum = parseFloat(valor) || 0;
  const result =
    codigo && valorNum > 0
      ? calcularOperacao(codigo, valorNum, moeda, locale)
      : null;

  const selectedOp = operacoes.find((o) => o.codigo === codigo);

  const COTACAO = 5.0;
  const valorBRL = moeda === "BRL" ? valorNum : valorNum * COTACAO;
  const valorUSD = moeda === "USD" ? valorNum : valorNum / COTACAO;

  function getShareUrl() {
    const base = typeof window !== "undefined" ? window.location.origin : "";
    const params = new URLSearchParams();
    if (codigo) params.set("op", codigo);
    if (valor) params.set("valor", valor);
    if (moeda !== "BRL") params.set("moeda", moeda);
    return `${base}${pathname}?${params.toString()}`;
  }

  function handleShare() {
    const url = getShareUrl();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
  }

  return (
    <div className="space-y-4">
      {/* Operation selector */}
      <div>
        <label className="text-xs text-text-muted block mb-1">
          {messages.selectOp}
        </label>
        <select
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="w-full bg-navy-light border border-navy-border rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand"
        >
          <option value="">{messages.selectOp}</option>
          {operacoes.map((op) => (
            <option key={op.codigo} value={op.codigo}>
              {op.emoji} {op.codigo} — {op.titulo}
            </option>
          ))}
        </select>
      </div>

      {/* Amount + currency */}
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="text-xs text-text-muted block mb-1">
            {messages.amount}
          </label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="0.00"
            className="w-full bg-navy-light border border-navy-border rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand"
          />
        </div>
        <div className="w-28">
          <label className="text-xs text-text-muted block mb-1">
            {messages.currency}
          </label>
          <select
            value={moeda}
            onChange={(e) => setMoeda(e.target.value as "BRL" | "USD")}
            className="w-full bg-navy-light border border-navy-border rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand"
          >
            <option value="BRL">BRL</option>
            <option value="USD">USD</option>
          </select>
        </div>
      </div>

      {/* FX notice */}
      <p className="text-xs text-text-muted">{messages.fxNotice}</p>

      {/* Results */}
      {result && selectedOp && (
        <div className="bg-navy-light border border-navy-border rounded-xl p-6 space-y-4">
          {/* Selected operation */}
          <div>
            <div className="text-xs text-text-muted">
              {messages.selectedOperation}
            </div>
            <div className="text-sm font-semibold mt-1">
              {selectedOp.emoji} {selectedOp.titulo}
            </div>
          </div>

          {/* Amount */}
          <div>
            <div className="text-xs text-text-muted">
              {messages.youWillMove}
            </div>
            <div className="text-2xl font-bold font-mono mt-1">
              R$ {valorBRL.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          </div>

          <AsciiDivider />

          {/* Breakdown */}
          <div>
            <div className="text-xs text-text-muted mb-3">
              {messages.breakdown}
            </div>
            <div className="space-y-2">
              {result.breakdown.map((b, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-text-secondary">
                    {b.etapa} ({b.taxa_pct}%)
                  </span>
                  <span className="font-mono">
                    R$ {b.taxa_brl.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <AsciiDivider />

          {/* Summary cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-navy rounded-lg p-3">
              <div className="text-xs text-text-muted">
                {messages.totalFees}
              </div>
              <div className="font-mono font-bold text-alert-warning">
                R$ {result.totalTaxa.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className="bg-navy rounded-lg p-3">
              <div className="text-xs text-text-muted">
                {messages.effectiveCost}
              </div>
              <div className="font-mono font-bold text-alert-warning">
                {result.custoEfetivoPct}%
              </div>
            </div>
            <div className="bg-navy rounded-lg p-3">
              <div className="text-xs text-text-muted">
                {messages.estimatedTime}
              </div>
              <div className="font-mono font-bold text-text-primary">
                {result.tempo || "—"}
              </div>
            </div>
            <div className="bg-navy rounded-lg p-3">
              <div className="text-xs text-text-muted">
                {messages.netAtDestination}
              </div>
              <div className="font-mono font-bold text-brand">
                ≈ R$ {result.valorLiquido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleShare}
              className="flex-1 border border-navy-border text-text-secondary font-medium px-4 py-2.5 rounded-lg hover:border-brand hover:text-brand transition-colors text-sm text-center"
            >
              {messages.share}
            </button>
            <Link
              href={`/${locale}/operacoes/${selectedOp.slug}`}
              className="flex-1 bg-brand text-white font-medium px-4 py-2.5 rounded-lg hover:bg-brand-dark transition-colors text-sm text-center"
            >
              {messages.viewSteps}
            </Link>
          </div>
        </div>
      )}

      {/* No flow warning for stubs */}
      {codigo && selectedOp && selectedOp.fluxo.length === 0 && (
        <Callout variant="atencao">
          Esta operacao ainda nao tem fluxo detalhado. O calculo sera disponibilizado em breve.
        </Callout>
      )}
    </div>
  );
}
