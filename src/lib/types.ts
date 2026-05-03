export type Transacao = {
  codigo: string;
  slug: string;
  titulo: string;
  descricao: string;
  emoji: string;
  caminho: string;
  modo: "pagamentos" | "cripto" | "ambos";
  taxa: { percentual: number; descricao: string };
  tempo: string;
  horario: string;
  limites?: { min?: string; max?: string };
  passos: string[];
  dica?: string;
  atencao?: string;
  cuidado?: string;
  categoria:
    | "pagamentos-br"
    | "cripto"
    | "comex"
    | "config"
    | "plataforma";
  relacionadas?: string[];
};

export type EtapaFluxo = {
  etapa: number;
  titulo: string;
  transacao_ref: string;
  caminho: string;
  taxa_percentual: number;
  descricao: string;
};

export type ExemploPratico = {
  valor_input: number;
  moeda_input: "BRL" | "USD";
  descricao_uso: string;
  breakdown: { etapa: string; taxa_brl: number }[];
  total_taxa_brl: number;
  valor_final_destino: string;
};

export type CategoriaUI =
  | "receber"
  | "pagar"
  | "internacional"
  | "dolarizacao"
  | "liberal"
  | "trader"
  | "cobranca";

export type Operacao = {
  codigo: string;
  slug: string;
  titulo: string;
  emoji: string;
  para_quem: string;
  categoria:
    | "recebimento-br"
    | "pagamento-br"
    | "pagamento-internacional"
    | "recebimento-internacional"
    | "dolarizacao"
    | "liberal"
    | "comex-cobranca"
    | "trader";
  categoriaUI: CategoriaUI[];
  fluxo: EtapaFluxo[];
  tempo_total: string;
  custo_total_pct: number;
  exemplo_pratico: ExemploPratico;
  cuidados: string[];
  dicas: string[];
  cta: string;
};

export type Locale = "pt-br" | "en-us";

export type CategoriaTransacao = Transacao["categoria"];
export type CategoriaOperacao = Operacao["categoria"];
