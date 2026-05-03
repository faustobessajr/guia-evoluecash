# Guia EvolueCash

Guia interativo bilíngue (PT-BR + EN-US) da plataforma EvolueCash — fintech que combina BRL, dólar digital e cripto numa única conta para empresas e profissionais.

🌐 Site oficial: https://evoluecash.com.br
📱 Suporte: WhatsApp +55 47 98912-8640

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS 4 + shadcn/ui
- next-intl (PT-BR + EN-US)
- lucide-react + fuse.js + next-themes

## Design System

- Brand: `#10B981` (verde)
- Navy: `#0F172A` (fundo)
- Inter (sans) + JetBrains Mono (mono)
- Mobile-first

## Como rodar

```bash
npm install
npm run dev
```

http://localhost:3000

## Build de produção

```bash
npm run build
npm run start
```

## Estrutura

```
src/
├── app/[locale]/                  # Rotas bilíngues
├── components/                    # Componentes
├── content/{locale}/              # Dados das transações e operações
├── messages/{locale}.json         # Strings UI
└── lib/                           # types, data, calc
```

## Como adicionar/editar conteúdo

- **Transação:** edita `src/content/{locale}/transacoes.json`
- **Operação:** edita `src/content/{locale}/operacoes.json` (define `categoriaUI`)
- **Strings UI:** edita `src/messages/{locale}.json`

## Licença

© EvolueCash. Todos os direitos reservados.
