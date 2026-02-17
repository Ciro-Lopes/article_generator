# Article Generator Frontend

Interface do Article Generator construída com React + Vite + Bootstrap 5.

## Requisitos

- Node.js 16+
- Backend rodando em `http://localhost:8000`

## Setup

1. Instale as dependências:
```bash
npm install
```

2. Crie o arquivo `.env` a partir do `.env.example`:
```bash
copy .env.example .env
```

3. Certifique-se que a variável `VITE_API_URL` no `.env` aponta para o backend:
```
VITE_API_URL=http://localhost:8000/api
```

## Executando a Aplicação

Modo desenvolvimento:
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

Build para produção:
```bash
npm run build
```

Visualizar build de produção:
```bash
npm run preview
```

## Funcionalidades

- Autenticação de usuários (registro e login)
- Geração de artigos com IA (GPT-4)
- Customização: tom, tamanho e palavras-chave
- Gerenciamento de artigos (visualizar, editar, excluir)
- Interface responsiva com Bootstrap 5
- Rotas protegidas para usuários autenticados

## Dependências Principais

| Pacote | Versão | Função |
|---|---|---|
| react | ^18.2.0 | UI Framework |
| vite | ^5.0.11 | Build tool |
| react-router-dom | ^6.21.1 | Roteamento |
| bootstrap | ^5.3.2 | CSS Framework |
| react-bootstrap | ^2.10.10 | Componentes Bootstrap |
| bootstrap-icons | ^1.13.1 | Ícones (via npm) |
| axios | ^1.6.5 | Requisições HTTP |

## Estrutura de Pastas

```
src/
├── components/    # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── context/       # Context API (autenticação)
├── services/      # Chamadas à API
└── utils/         # Utilitários
```

## Observações

- Os ícones utilizam a biblioteca `bootstrap-icons` instalada via npm.
- O Vite está configurado com proxy para `/api` apontando para o backend em `http://localhost:8000`.
