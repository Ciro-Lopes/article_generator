# Início Rápido - Article Generator

## Requisitos

- Python 3.8+
- Node.js 16+
- Chave API da OpenAI (https://platform.openai.com/api-keys)

---

## Setup Inicial (Primeira vez)

### Opção 1: Setup Automático
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\setup.ps1
```

### Opção 2: Setup Manual

**Backend:**
```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Edite `backend/.env` e adicione sua chave da OpenAI:
```env
OPENAI_API_KEY=sk-sua-chave-aqui
SECRET_KEY=uma-chave-secreta-forte
```

**Frontend:**
```powershell
cd frontend
npm install
copy .env.example .env
```

---

## Executando o Projeto

### Opção 1: Iniciar Automaticamente
```powershell
.\start.ps1
```

### Opção 2: Iniciar Manualmente

**Terminal 1 - Backend:**
```powershell
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

---

## Acessar a Aplicação

| Serviço | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| Swagger Docs | http://localhost:8000/docs |

---

## Primeiros Passos

1. Acesse http://localhost:5173
2. Clique em **Register** e crie uma conta
3. Faça login com suas credenciais
4. Clique em **Generate Article**
5. Descreva o artigo que deseja gerar
6. Aguarde a IA criar o conteúdo
7. Revise e edite se necessário
8. Publique no WordPress (opcional)

---

## Troubleshooting

### Backend não inicia
- Verifique se Python está instalado: `python --version`
- Confirme que o ambiente virtual está ativo: `venv\Scripts\activate`
- Confirme que a `OPENAI_API_KEY` está no `backend/.env`
- Verifique se as dependências foram instaladas: `pip install -r requirements.txt`

### Frontend não inicia
- Verifique se Node.js está instalado: `node --version`
- Delete node_modules e reinstale:
```powershell
cd frontend
Remove-Item -Recurse -Force node_modules
npm install
```

### Erro ao gerar artigos
- Confirme que a `OPENAI_API_KEY` está correta
- Verifique se sua conta OpenAI tem créditos disponíveis
- Veja os logs do backend no terminal para mais detalhes

### Erro de execução de scripts PowerShell
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

---

## Estrutura do Projeto

```
article_generator/
├── backend/          # API Python (FastAPI + SQLite)
├── frontend/         # Interface React + Vite + Bootstrap
├── setup.ps1         # Script de configuração inicial
├── start.ps1         # Script para iniciar a aplicação
├── QUICKSTART.md     # Este arquivo
└── README.md         # Documentação completa
```

---

## Documentação Completa

- [README.md](README.md) - Visão geral do projeto
- [backend/README.md](backend/README.md) - Documentação da API
- [frontend/README.md](frontend/README.md) - Documentação do frontend
