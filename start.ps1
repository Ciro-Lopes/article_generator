# Start Backend
Write-Host "Iniciando Backend (FastAPI)..." -ForegroundColor Green
$backend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; venv\Scripts\activate; uvicorn app.main:app --reload --port 8000" -PassThru

Start-Sleep -Seconds 3

# Start Frontend
Write-Host "Iniciando Frontend (React + Vite)..." -ForegroundColor Green
$frontend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev" -PassThru

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Aplicação Iniciada!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend: http://localhost:8000" -ForegroundColor Yellow
Write-Host "API Docs: http://localhost:8000/docs" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Yellow
Write-Host ""
Write-Host "Pressione qualquer tecla para encerrar os servidores..." -ForegroundColor Red
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Stop processes
Stop-Process -Id $backend.Id -Force
Stop-Process -Id $frontend.Id -Force
Write-Host "Servidores encerrados." -ForegroundColor Green
