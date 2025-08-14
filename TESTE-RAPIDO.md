# ⚡ Teste Rápido - KoePrefeito

**Tempo estimado: 5-10 minutos**

## 🚀 Start Rápido

```bash
# 1. Instalar dependências
pnpm install

# 2. Iniciar banco (Docker)
pnpm docker:up

# 3. Configurar banco
pnpm db:generate && pnpm db:push && pnpm db:seed

# 4. Criar .env.local
cp apps/web/.env.local.example apps/web/.env.local

# 5. Iniciar aplicação
pnpm dev:web
```

## 🌐 Testando

**Abra http://localhost:3000**

### Sem OAuth (Teste Básico)
- ✅ Página inicial carrega
- ✅ Design responsivo funciona
- ✅ Navegação entre páginas
- ❌ Login não funcionará (normal sem OAuth)

### Com OAuth (Teste Completo)
1. Configure Google OAuth no `.env.local`
2. ✅ Login com Google funciona
3. ✅ Dashboard acessível
4. ✅ APIs tRPC funcionando

## 🔍 Verificações Rápidas

### Frontend
- [ ] http://localhost:3000 - Página inicial
- [ ] http://localhost:3000/auth/signin - Tela de login
- [ ] Design responsivo (resize browser)
- [ ] Components UI funcionando

### Backend/Banco
- [ ] http://localhost:8080 - Adminer (admin banco)
- [ ] `pnpm db:studio` - Prisma Studio
- [ ] Dados de exemplo visíveis

### APIs
- [ ] http://localhost:3000/api/trpc/issues.getAll
- [ ] Network tab mostra chamadas tRPC

## 🛠️ Debug Rápido

### Aplicação não carrega?
```bash
# Verificar se todas as deps estão instaladas
pnpm install

# Port 3000 ocupada?
netstat -ano | findstr :3000
```

### Erro de banco?
```bash
# Docker rodando?
docker ps

# Regenerar Prisma
pnpm db:generate
```

### Erro de TypeScript?
```bash
# Verificar tipos
pnpm type-check

# Build test
pnpm build:web
```

## ✅ Checklist Mínimo

- [ ] `pnpm install` - sucesso
- [ ] `pnpm docker:up` - containers rodando  
- [ ] `pnpm db:push` - schema aplicado
- [ ] `pnpm dev:web` - servidor iniciou
- [ ] http://localhost:3000 - página carrega
- [ ] Console sem erros críticos

**Tudo OK?** 🎉 Projeto funcionando!

## 🚨 Problemas Comuns

### "NEXTAUTH_SECRET required"
```env
# Adicione no .env.local
NEXTAUTH_SECRET=qualquer-string-aleatoria-min-32-chars
SKIP_ENV_VALIDATION=1
```

### "Google OAuth not configured"
```env
# Normal se não configurou OAuth ainda
# Deixe vazio ou adicione as credenciais
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### "Database connection failed"
```bash
# Restart containers
pnpm docker:down
pnpm docker:up
sleep 10
pnpm db:push
```

---

**💡 Dica**: Use `pnpm setup` para configuração automática completa!