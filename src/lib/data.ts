import type { CategoriaUI, Locale, Operacao, Transacao } from "./types";

import transacoesPtBr from "@/content/pt-br/transacoes.json";
import transacoesEnUs from "@/content/en-us/transacoes.json";
import operacoesPtBr from "@/content/pt-br/operacoes.json";
import operacoesEnUs from "@/content/en-us/operacoes.json";

const transacoesMap: Record<Locale, Transacao[]> = {
  "pt-br": transacoesPtBr as Transacao[],
  "en-us": transacoesEnUs as Transacao[],
};

const operacoesMap: Record<Locale, Operacao[]> = {
  "pt-br": operacoesPtBr as Operacao[],
  "en-us": operacoesEnUs as Operacao[],
};

export function getTransacoes(locale: Locale): Transacao[] {
  return transacoesMap[locale] ?? transacoesMap["pt-br"];
}

export function getTransacao(
  locale: Locale,
  slug: string
): Transacao | undefined {
  return getTransacoes(locale).find((t) => t.slug === slug);
}

export function getTransacaoByCodigo(
  locale: Locale,
  codigo: string
): Transacao | undefined {
  return getTransacoes(locale).find((t) => t.codigo === codigo);
}

export function getOperacoes(locale: Locale): Operacao[] {
  return operacoesMap[locale] ?? operacoesMap["pt-br"];
}

export function getOperacao(
  locale: Locale,
  slug: string
): Operacao | undefined {
  return getOperacoes(locale).find((o) => o.slug === slug);
}

export function getOperacaoByCodigo(
  locale: Locale,
  codigo: string
): Operacao | undefined {
  return getOperacoes(locale).find((o) => o.codigo === codigo);
}

export function getOperacoesByCategoriaUI(
  locale: Locale,
  categoriaUI: CategoriaUI
): Operacao[] {
  return getOperacoes(locale).filter((o) =>
    o.categoriaUI?.includes(categoriaUI)
  );
}
