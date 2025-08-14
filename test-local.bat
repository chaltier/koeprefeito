@echo off
echo ====================================
echo     TESTE LOCAL - KOEPREFEITO
echo ====================================
echo.

echo [1/6] Verificando Node.js e pnpm...
node --version || (echo ERRO: Node.js nao encontrado! && pause && exit /b 1)
pnpm --version || (echo ERRO: pnpm nao encontrado! Instale com: npm install -g pnpm && pause && exit /b 1)
echo ✓ Node.js e pnpm OK

echo.
echo [2/6] Verificando Docker...
docker --version || (echo ERRO: Docker nao encontrado! && pause && exit /b 1)
echo ✓ Docker OK

echo.
echo [3/6] Instalando dependencias...
pnpm install
if errorlevel 1 (echo ERRO: Falha ao instalar dependencias && pause && exit /b 1)
echo ✓ Dependencias instaladas

echo.
echo [4/6] Iniciando banco de dados...
pnpm docker:up
if errorlevel 1 (echo ERRO: Falha ao iniciar Docker containers && pause && exit /b 1)
echo ✓ PostgreSQL e Redis iniciados

echo.
echo [5/6] Configurando banco...
timeout /t 5 /nobreak > nul
pnpm db:generate
pnpm db:push
pnpm db:seed
if errorlevel 1 (echo ERRO: Falha ao configurar banco && pause && exit /b 1)
echo ✓ Banco configurado com dados de exemplo

echo.
echo [6/6] Criando arquivo .env.local...
if not exist "apps\web\.env.local" (
    copy "apps\web\.env.local.example" "apps\web\.env.local"
    echo ✓ Arquivo .env.local criado
) else (
    echo ✓ Arquivo .env.local ja existe
)

echo.
echo ====================================
echo        SETUP CONCLUIDO! 🎉
echo ====================================
echo.
echo Para iniciar a aplicacao:
echo   pnpm dev:web
echo.
echo Depois acesse: http://localhost:3000
echo.
echo Outras ferramentas:
echo   - Adminer: http://localhost:8080
echo   - Prisma Studio: pnpm db:studio
echo.
pause