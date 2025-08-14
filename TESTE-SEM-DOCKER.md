# 🚀 Teste KoePrefeito SEM Docker

Guia para testar o projeto sem Docker instalado.

## ⚡ Setup Rápido (Sem Banco)

Como você não tem Docker instalado, vamos testar só o frontend primeiro:

### 1. Dependências já instaladas ✅
```bash
# Já feito!
pnpm install
```

### 2. Configurar Variáveis (Modo Desenvolvimento)
```bash
# Copiar arquivo de exemplo
cp apps/web/.env.local.example apps/web/.env.local
```

**Edite o arquivo `apps/web/.env.local`:**
```env
# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=desenvolvimento-local-teste-123456789

# Google OAuth (deixe vazio por enquanto)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Database (simulado)
DATABASE_URL=postgresql://user:pass@localhost:5432/db

# Skip validation 
SKIP_ENV_VALIDATION=1
```

### 3. Testar Frontend
```bash
pnpm dev:web
```

## 🌐 O que você pode testar SEM banco:

### ✅ **Frontend Completo:**
- Landing page: http://localhost:3000
- Design system responsivo
- Navegação entre páginas
- Componentes UI funcionando
- Tailwind CSS carregando

### ❌ **Não funcionará (sem banco):**
- Login/Autenticação
- Dashboard (precisa de login)
- APIs tRPC
- Dados dinâmicos

## 📦 Instalando Docker (Opcional)

Para funcionalidade completa, você pode instalar Docker:

### Windows:
1. Download: https://www.docker.com/products/docker-desktop/
2. Instalar Docker Desktop
3. Reiniciar computador
4. Executar: `docker --version`

### Mac:
```bash
# Via Homebrew
brew install --cask docker

# Ou download direto
https://www.docker.com/products/docker-desktop/
```

### Linux:
```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

## 🔄 Depois do Docker instalado:

```bash
# Iniciar banco
pnpm docker:up

# Configurar Prisma
pnpm db:generate
pnpm db:push
pnpm db:seed

# Atualizar .env.local
DATABASE_URL=postgresql://koeprefeito:password@localhost:5432/koeprefeito

# Reiniciar aplicação
pnpm dev:web
```

## 🎯 Teste Mínimo (SEM Docker):

1. **Verifique se as dependências instalaram:**
   ```bash
   ls node_modules/@koeprefeito
   # Deve mostrar: database  shared  ui
   ```

2. **Teste o build:**
   ```bash
   pnpm build:web
   ```

3. **Inicie o desenvolvimento:**
   ```bash
   pnpm dev:web
   ```

4. **Acesse http://localhost:3000**
   - Landing page deve carregar
   - Botões e navegação funcionando
   - Design responsivo OK

## 🚨 Soluções para problemas comuns:

### "NEXTAUTH_SECRET required"
```env
# Adicione no .env.local
NEXTAUTH_SECRET=qualquer-string-longa-para-desenvolvimento
SKIP_ENV_VALIDATION=1
```

### "Build failed"
```bash
# Limpar cache
pnpm clean
pnpm install
```

### "Port 3000 in use"
```bash
# Windows
netstat -ano | findstr :3000

# Matar processo
taskkill /PID [número_do_pid] /F
```

## ✅ Resultado Esperado:

**Sem Docker**: Frontend funcionando 100%
**Com Docker**: Aplicação completa com banco

---

**🎉 Sucesso parcial!** Mesmo sem Docker, você já pode ver o design system e interface funcionando perfeitamente!