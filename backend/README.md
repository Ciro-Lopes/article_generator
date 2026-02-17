# Article Generator Backend

Backend API do Article Generator construído com FastAPI e Python.

## Requisitos

- Python 3.8+
- Chave de API da OpenAI

## Setup

1. Crie o ambiente virtual:
```bash
python -m venv venv
```

2. Ative o ambiente virtual:
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

4. Crie o arquivo `.env` a partir do `.env.example`:
```bash
copy .env.example .env
```

5. Edite o `.env` e configure:
   - `OPENAI_API_KEY` - sua chave da OpenAI (obrigatório)
   - `SECRET_KEY` - chave secreta para JWT (altere para produção)

## Executando a Aplicação

```bash
uvicorn app.main:app --reload --port 8000
```

A API estará disponível em `http://localhost:8000`

Documentação interativa (Swagger): `http://localhost:8000/docs`

## Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login via form data (OAuth2)
- `POST /api/auth/login/json` - Login via JSON

### Artigos
- `POST /api/articles/generate` - Gerar artigo com IA
- `GET /api/articles/` - Listar todos os artigos
- `GET /api/articles/{id}` - Buscar artigo específico
- `PUT /api/articles/{id}` - Atualizar artigo
- `DELETE /api/articles/{id}` - Excluir artigo

## Banco de Dados

Utiliza SQLite por padrão. O arquivo `article_generator.db` é criado automaticamente na primeira execução.

Para visualizar o banco de dados, use a extensão **SQLite Viewer** do VS Code ou o app **DB Browser for SQLite**.

## Dependências Principais

| Pacote | Versão | Função |
|---|---|---|
| fastapi | 0.129.0 | Framework web |
| uvicorn | 0.27.0 | Servidor ASGI |
| sqlalchemy | 2.0.46 | ORM / banco de dados |
| pydantic | 2.12.5 | Validação de dados |
| python-jose | 3.3.0 | JWT |
| passlib | 1.7.4 | Hash de senhas |
| bcrypt | 4.1.2 | Algoritmo bcrypt |
| openai | 2.21.0 | API da OpenAI |

## Desenvolvimento com Debug

Crie `.vscode/launch.json` na raiz do backend:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "FastAPI Debug",
      "type": "python",
      "request": "launch",
      "module": "uvicorn",
      "args": ["app.main:app", "--reload"],
      "cwd": "${workspaceFolder}/backend"
    }
  ]
}
```

Depois pressione `F5` para iniciar com o debugger.
