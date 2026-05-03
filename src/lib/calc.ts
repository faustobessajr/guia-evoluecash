import type { Locale, Operacao } from "./types";
import { getOperacaoByCodigo } from "./data";

export type BreakdownItem = {
  etapa: string;
  taxa_brl: number;
  taxa_pct: number;
};

export type CalcResult = {
  breakdown: BreakdownItem[];
  totalTaxa: number;
  custoEfetivoPct: number;
  valorLiquido: number;
  tempo: string;
};

const COTACAO_USD = 5.0;

export function calcularOperacao(
  operacaoCodigo: string,
  valor: number,
  moeda: "BRL" | "USD",
  locale: Locale = "pt-br"
): CalcResult | null {
  const op = getOperacaoByCodigo(locale, operacaoCodigo);
  if (!op || op.fluxo.length === 0) return null;

  const valorBRL = moeda === "BRL" ? valor : valor * COTACAO_USD;

  const breakdown: BreakdownItem[] = op.fluxo.map((etapa) => {
    const taxaBRL = (valorBRL * etapa.taxa_percentual) / 100;
    return {
      etapa: etapa.titulo,
      taxa_brl: Math.round(taxaBRL * 100) / 100,
      taxa_pct: etapa.taxa_percentual,
    };
  });

  const totalTaxa = breakdown.reduce((sum, b) => sum + b.taxa_brl, 0);
  const custoEfetivoPct =
    valorBRL > 0 ? Math.round((totalTaxa / valorBRL) * 10000) / 100 : 0;
  const valorLiquido = Math.round((valorBRL - totalTaxa) * 100) / 100;

  return {
    breakdown,
    totalTaxa: Math.round(totalTaxa * 100) / 100,
    custoEfetivoPct,
    valorLiquido,
    tempo: op.tempo_total,
  };
}
