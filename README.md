# Article Generator

Gerador de artigos para WordPress com IA, usando GPT-4 da OpenAI.

## Estrutura do Projeto

```
article_generator/
├── backend/          # Python + FastAPI
│   ├── app/
│   │   ├── models/   # Modelos do banco de dados (SQLAlchemy)
│   │   ├── routes/   # Rotas da API
│   │   ├── schemas/  # Schemas Pydantic
│   │   ├── services/ # Lógica de negócio
│   │   └── utils/    # Utilitários (JWT, hash de senha)
│   ├── requirements.txt
│   └── .env.example
│
└── frontend/         # React + Vite + Bootstrap
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── context/
    │   └── utils/
    ├── package.json
    └── .env.example
```

## Início Rápido

### Setup do Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Edite `backend/.env` e configure:
```env
OPENAI_API_KEY=sk-sua-chave-aqui
SECRET_KEY=uma-chave-secreta-segura
```

Inicie o servidor:
```bash
uvicorn app.main:app --reload
```

Backend disponível em `http://localhost:8000`

### Setup do Frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Frontend disponível em `http://localhost:5173`

## Funcionalidades

- Geração de artigos com GPT-4 (tom, tamanho e palavras-chave customizáveis)
- Autenticação de usuários com JWT
- Gerenciamento de artigos (criar, listar, editar, excluir)
- Interface limpa e responsiva com Bootstrap 5
- Banco de dados SQLite (facilmente migrável para PostgreSQL)

## Documentação da API

Com o backend rodando, acesse:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Variáveis de Ambiente

### Backend (`backend/.env`)

| Variável | Obrigatório | Descrição |
|---|---|---|
| `OPENAI_API_KEY` | Sim | Chave da API OpenAI |
| `SECRET_KEY` | Sim | Chave secreta para JWT |
| `DATABASE_URL` | Não | URL do banco (padrão: SQLite) |
| `ALGORITHM` | Não | Algoritmo JWT (padrão: HS256) |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Não | Expiração do token (padrão: 30) |

### Frontend (`frontend/.env`)

| Variável | Descrição |
|---|---|
| `VITE_API_URL` | URL do backend (padrão: http://localhost:8000/api) |

## Tech Stack

### Backend
- Python 3.8+
- FastAPI 0.129 (com lifespan events)
- SQLAlchemy 2.0
- Pydantic 2.x
- passlib + bcrypt (hash de senhas)
- python-jose (JWT)
- OpenAI SDK 2.x
- SQLite (padrão)

### Frontend
- React 18
- Vite 5
- Bootstrap 5.3
- React Bootstrap
- Bootstrap Icons (npm)
- React Router 6
- Axios
