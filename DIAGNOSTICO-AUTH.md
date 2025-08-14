# Diagnóstico de Autenticação - Vercel

## 🔍 Estado Atual do Problema

**Erro**: `The table 'public.accounts' does not exist in the current database`  
**Status**: Tabelas existem no banco, schema sincronizado, problema de configuração

## ✅ Já Verificado e Corrigido

1. **Schema do Banco**: ✅ Sincronizado via `prisma db pull`
2. **Tabelas NextAuth**: ✅ Existem no banco (accounts, sessions, etc.)
3. **Prisma Client**: ✅ Gerado e atualizado
4. **Schema no Git**: ✅ Commitado

## 🎯 Possíveis Causas Restantes

### 1. NEXTAUTH_URL Incorreto na Vercel
**URL Atual**: `https://koeprefeito-web-git-main-joao-ricardos-projects-ff2efdbb.vercel.app`
**Deve estar configurado em**: Vercel Dashboard → Environment Variables

### 2. Google OAuth Redirect URI Desatualizado  
**URL Necessária**: `https://koeprefeito-web-git-main-joao-ricardos-projects-ff2efdbb.vercel.app/api/auth/callback/google`
**Deve estar em**: Google Cloud Console → APIs & Services → Credentials

### 3. DATABASE_URL da Vercel
**Deve ser**: `postgresql://neondb_owner:npg_yVq60jLQScXz@ep-sweet-unit-aexdcwy9-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require`

## 📋 Próximos Passos

1. **Verificar Vercel Environment Variables**:
   - NEXTAUTH_URL deve apontar para URL atual
   - DATABASE_URL deve apontar para production database
   - GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET devem estar presentes

2. **Atualizar Google OAuth**:
   - Adicionar redirect URI com URL atual da Vercel
   - Verificar se client_id e client_secret estão corretos

3. **Forçar Deploy**:
   - Após correções, fazer novo deploy para aplicar mudanças

## 🔧 Comandos de Verificação

```bash
# Verificar schema atual do banco
DATABASE_URL="postgresql://..." pnpm dlx prisma db pull --schema=packages/database/prisma/schema.prisma

# Gerar client atualizado  
pnpm dlx prisma generate --schema=packages/database/prisma/schema.prisma
```

---
**Data**: 2025-08-14  
**Status**: Em investigação - foco na configuração Vercel + Google OAuth