# Script de Setup - Article Generator

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Article Generator - Setup Script" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Backend Setup
Write-Host "Configurando Backend..." -ForegroundColor Yellow
Set-Location backend

if (-not (Test-Path "venv")) {
    Write-Host "Criando ambiente virtual Python..." -ForegroundColor Green
    python -m venv venv
}

Write-Host "Ativando ambiente virtual..." -ForegroundColor Green
& "venv\Scripts\Activate.ps1"

Write-Host "Instalando dependências Python..." -ForegroundColor Green
pip install -r requirements.txt
pip install 'pydantic[email]'

if (-not (Test-Path ".env")) {
    Write-Host "Criando arquivo .env..." -ForegroundColor Green
    Copy-Item ".env.example" ".env"
    Write-Host "IMPORTANTE: Edite o arquivo backend/.env e adicione sua chave da OpenAI!" -ForegroundColor Red
}

Set-Location ..

# Frontend Setup
Write-Host ""
Write-Host "Configurando Frontend..." -ForegroundColor Yellow
Set-Location frontend

Write-Host "Instalando dependências Node..." -ForegroundColor Green
npm install

if (-not (Test-Path ".env")) {
    Write-Host "Criando arquivo .env..." -ForegroundColor Green
    Copy-Item ".env.example" ".env"
}

Set-Location ..

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Setup Concluído!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Yellow
Write-Host "1. Edite backend/.env e adicione sua OPENAI_API_KEY" -ForegroundColor White
Write-Host "2. Para iniciar o backend:" -ForegroundColor White
Write-Host "   cd backend" -ForegroundColor Gray
Write-Host "   venv\Scripts\activate" -ForegroundColor Gray
Write-Host "   uvicorn app.main:app --reload" -ForegroundColor Gray
Write-Host "3. Para iniciar o frontend (em outro terminal):" -ForegroundColor White
Write-Host "   cd frontend" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
