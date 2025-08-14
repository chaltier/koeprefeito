#!/bin/bash

echo "===================================="
echo "     TESTE LOCAL - KOEPREFEITO"
echo "===================================="
echo

echo "[1/6] Verificando Node.js e pnpm..."
if ! command -v node &> /dev/null; then
    echo "❌ ERRO: Node.js não encontrado!"
    exit 1
fi

if ! command -v pnpm &> /dev/null; then
    echo "❌ ERRO: pnpm não encontrado! Instale com: npm install -g pnpm"
    exit 1
fi

echo "✅ Node.js $(node --version) e pnpm $(pnpm --version) OK"

echo
echo "[2/6] Verificando Docker..."
if ! command -v docker &> /dev/null; then
    echo "❌ ERRO: Docker não encontrado!"
    exit 1
fi

echo "✅ Docker $(docker --version | cut -d' ' -f3) OK"

echo
echo "[3/6] Instalando dependências..."
if ! pnpm install; then
    echo "❌ ERRO: Falha ao instalar dependências"
    exit 1
fi
echo "✅ Dependências instaladas"

echo
echo "[4/6] Iniciando banco de dados..."
if ! pnpm docker:up; then
    echo "❌ ERRO: Falha ao iniciar Docker containers"
    exit 1
fi
echo "✅ PostgreSQL e Redis iniciados"

echo
echo "[5/6] Configurando banco..."
sleep 5
if ! pnpm db:generate || ! pnpm db:push || ! pnpm db:seed; then
    echo "❌ ERRO: Falha ao configurar banco"
    exit 1
fi
echo "✅ Banco configurado com dados de exemplo"

echo
echo "[6/6] Criando arquivo .env.local..."
if [ ! -f "apps/web/.env.local" ]; then
    cp "apps/web/.env.local.example" "apps/web/.env.local"
    echo "✅ Arquivo .env.local criado"
else
    echo "✅ Arquivo .env.local já existe"
fi

echo
echo "===================================="
echo "        SETUP CONCLUÍDO! 🎉"
echo "===================================="
echo
echo "Para iniciar a aplicação:"
echo "  pnpm dev:web"
echo
echo "Depois acesse: http://localhost:3000"
echo
echo "Outras ferramentas:"
echo "  - Adminer: http://localhost:8080"
echo "  - Prisma Studio: pnpm db:studio"
echo