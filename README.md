# Article Generator

AI-powered article generator for WordPress, using OpenAI's GPT-4.

## Project Structure

```
article_generator/
├── backend/          # Python + FastAPI
│   ├── app/
│   │   ├── models/   # Database models (SQLAlchemy)
│   │   ├── routes/   # API routes
│   │   ├── schemas/  # Pydantic schemas
│   │   ├── services/ # Business logic
│   │   └── utils/    # Utilities (JWT, password hashing)
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

## Quick Start

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Edit `backend/.env` and set:
```env
OPENAI_API_KEY=sk-your-key-here
SECRET_KEY=a-very-secure-secret-key
```

Start the server:
```bash
uvicorn app.main:app --reload
```

Backend available at `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Frontend available at `http://localhost:5173`

## Features

- Article generation with GPT-4 (customizable tone, length, and keywords)
- User authentication with JWT
- Article management (create, list, edit, delete)
- Clean and responsive interface with Bootstrap 5
- SQLite database (easily migratable to PostgreSQL)
- Publish to WordPress via REST API

## API Documentation

With the backend running, access:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | Yes | OpenAI API key |
| `SECRET_KEY` | Yes | Secret key for JWT |
| `DATABASE_URL` | No | Database URL (default: SQLite) |
| `ALGORITHM` | No | JWT algorithm (default: HS256) |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | No | Token expiration (default: 30) |

### Frontend (`frontend/.env`)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend URL (default: http://localhost:8000/api) |

## Tech Stack

### Backend
- Python 3.8+
- FastAPI 0.129 (with lifespan events)
- SQLAlchemy 2.0
- Pydantic 2.x
- passlib + bcrypt (password hashing)
- python-jose (JWT)
- OpenAI SDK 2.x
- SQLite (default)

### Frontend
- React 18
- Vite 5
- Bootstrap 5.3
- React Bootstrap
- Bootstrap Icons (npm)
- React Router 6
- Axios

## License

MIT
