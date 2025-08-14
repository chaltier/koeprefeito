# KoePrefeito - Knowledge Base

> **Documentação completa do projeto para consultas futuras**

## 📋 Visão Geral do Projeto

**KoePrefeito** é uma plataforma cívica que conecta cidadãos e governo municipal, permitindo reportar problemas, votar em solicitações e acompanhar o progresso das demandas municipais.

### Stack Tecnológica
- **Frontend**: Next.js 14 com TypeScript e Tailwind CSS
- **Backend**: tRPC para APIs type-safe
- **Banco**: PostgreSQL via Neon (staging + production)
- **Autenticação**: NextAuth.js com Google OAuth
- **ORM**: Prisma
- **Deploy**: Vercel com GitHub Actions CI/CD
- **Monorepo**: Turbo com pnpm

## 🏗️ Arquitetura do Projeto

```
koeprefeito/
├── apps/
│   └── web/                 # Aplicação Next.js principal
├── packages/
│   ├── database/           # Prisma schema e configurações
│   ├── ui/                # Componentes UI compartilhados
│   └── shared/            # Utilitários compartilhados
├── .github/workflows/     # CI/CD pipelines
└── docs/                  # Documentação
```

## 🚀 Ambientes e Deploy

### Ambientes Configurados
1. **Staging**: `https://staging-koeprefeito.vercel.app`
2. **Production**: `https://koeprefeito.vercel.app`
3. **Development**: URL dinâmica da Vercel (ex: koeprefeito-web-git-main-*.vercel.app)

### GitHub Actions Workflows

#### CI Pipeline (`.github/workflows/ci.yml`)
- Executa em PRs e pushes
- Lint, type-check, build e testes
- Validação de código antes do merge

#### CD Pipeline (`.github/workflows/cd.yml`)
- **Deploy Staging** → **E2E Tests** → **Deploy Production** → **Monitoring**
- Rollback automático em caso de falha
- Health checks e performance monitoring

### Banco de Dados (Neon)

#### Staging Database
```
koeprefeito-staging
URL: postgresql://neondb_owner:npg_gG8ix1OmCvhU@ep-floral-hall-aehchr0y-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

#### Production Database  
```
koeprefeito-production
URL: postgresql://neondb_owner:npg_yVq60jLQScXz@ep-sweet-unit-aexdcwy9-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

## 🔐 Configuração de Autenticação

### NextAuth.js + Google OAuth

#### Google Cloud Console Setup
- **Project**: KoePrefeito OAuth
- **Client ID**: `<configured-in-google-cloud-console>`
- **Client Secret**: `<configured-in-google-cloud-console>`

#### Authorized Redirect URIs
```
# Development
http://localhost:3000/api/auth/callback/google

# Staging  
https://staging-koeprefeito.vercel.app/api/auth/callback/google

# Production
https://koeprefeito.vercel.app/api/auth/callback/google

# Vercel Preview Deployments
https://koeprefeito-web-git-main-*.vercel.app/api/auth/callback/google
```

## 🔧 Variáveis de Ambiente

### GitHub Secrets (para CI/CD)
```
VERCEL_TOKEN=<token-vercel>
VERCEL_ORG_ID=<org-id>
VERCEL_PROJECT_ID=<project-id>

# Staging
NEXTAUTH_SECRET_STAGING=<secret>
NEXTAUTH_URL_STAGING=https://staging-koeprefeito.vercel.app
DATABASE_URL_STAGING=<staging-db-url>

# Production  
NEXTAUTH_SECRET_PRODUCTION=<secret>
NEXTAUTH_URL_PRODUCTION=https://koeprefeito.vercel.app
DATABASE_URL_PRODUCTION=<production-db-url>

# Shared
GOOGLE_CLIENT_ID=<google-client-id>
GOOGLE_CLIENT_SECRET=<google-client-secret>
```

### Vercel Environment Variables
```
# Para todos os deployments da Vercel
DATABASE_URL=<production-db-url>
GOOGLE_CLIENT_ID=<google-client-id>
GOOGLE_CLIENT_SECRET=<google-client-secret>
NEXTAUTH_URL=<vercel-deployment-url>
NEXTAUTH_SECRET=<nextauth-secret>
```

## 🎯 Funcionalidades Implementadas

### ✅ Core Features
- [x] **Autenticação**: Google OAuth com NextAuth.js
- [x] **Issues Management**: CRUD completo de solicitações
- [x] **Sistema de Votação**: Apoiar/não apoiar solicitações
- [x] **Comentários**: Sistema completo de comentários
- [x] **Upload de Imagens**: Base64 para desenvolvimento
- [x] **Filtros e Busca**: Por categoria, status e texto
- [x] **Dashboard**: Estatísticas e solicitações do usuário
- [x] **Navegação Mobile**: Menu hamburger responsivo

### 📱 UI/UX Features
- [x] **Design Responsivo**: Mobile-first approach
- [x] **Componentes UI**: Sistema consistente com Tailwind
- [x] **Loading States**: Feedback visual em operações
- [x] **Error Handling**: Páginas de erro customizadas
- [x] **Optimistic Updates**: Votação em tempo real

## 🗃️ Schema do Banco (Prisma)

### Principais Modelos
```prisma
model User {
  id      String @id @default(cuid())
  name    String?
  email   String @unique
  image   String?
  role    UserRole @default(CITIZEN)
  issues  Issue[]
  votes   Vote[]
  comments Comment[]
}

model Issue {
  id          String @id @default(cuid())
  title       String
  description String
  category    IssueCategory
  priority    IssuePriority
  status      IssueStatus @default(OPEN)
  address     String
  latitude    Float
  longitude   Float
  images      String[]
  authorId    String
  author      User @relation(fields: [authorId], references: [id])
  votes       Vote[]
  comments    Comment[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Vote {
  id       String @id @default(cuid())
  type     VoteType
  userId   String
  issueId  String
  user     User @relation(fields: [userId], references: [id])
  issue    Issue @relation(fields: [issueId], references: [id])
  @@unique([userId, issueId])
}

model Comment {
  id        String @id @default(cuid())
  content   String
  userId    String
  issueId   String
  user      User @relation(fields: [userId], references: [id])
  issue     Issue @relation(fields: [issueId], references: [id])
  createdAt DateTime @default(now())
}
```

## 🔍 Troubleshooting Guide

### Problemas Comuns e Soluções

#### 1. Erro de Autenticação "Configuration"
**Causa**: Variáveis de ambiente não configuradas na Vercel
**Solução**: 
1. Verificar Vercel Dashboard → Settings → Environment Variables
2. Confirmar redirect URIs no Google Cloud Console
3. Checar se NEXTAUTH_URL está correto

#### 2. Erro "client_id is required"
**Causa**: GOOGLE_CLIENT_ID não está sendo carregado
**Solução**: Verificar se a variável está configurada na Vercel

#### 3. Build Failures TypeScript
**Causa**: Tipos incompatíveis entre packages
**Solução**: 
1. Verificar exports em `packages/database/src/index.ts`
2. Usar interfaces explícitas em formulários
3. Verificar variants de componentes UI

#### 4. Prisma Connection Issues
**Causa**: DATABASE_URL incorreta ou banco inacessível
**Solução**:
1. Verificar connection string no Neon
2. Confirmar variável no ambiente correto
3. Executar `prisma generate` após mudanças

## 📞 Comandos Úteis

### Development
```bash
# Setup inicial
pnpm install
pnpm db:push        # Sync schema com banco
pnpm db:generate    # Gerar Prisma Client

# Desenvolvimento
pnpm dev:web        # Rodar aplicação web
pnpm build          # Build para produção
pnpm lint           # Lint código
pnpm type-check     # Verificar tipos
```

### Database
```bash
# Prisma Studio (GUI)
pnpm dlx prisma studio

# Reset database
pnpm dlx prisma db push --force-reset

# Migrations (se usar migrations)
pnpm dlx prisma migrate dev
```

### Deploy
```bash
# Deploy manual (se necessário)
vercel --prod

# Ver logs da Vercel
vercel logs [deployment-url]
```

## 📈 Próximas Funcionalidades

### Backlog Sugerido
- [ ] **Notificações**: Push notifications para updates
- [ ] **Geolocalização**: Mapa interativo com issues
- [ ] **Admin Panel**: Interface para governo municipal
- [ ] **Relatórios**: Analytics e estatísticas avançadas
- [ ] **API Pública**: Endpoints para integração externa
- [ ] **PWA**: Progressive Web App capabilities
- [ ] **Chat/Mensagens**: Comunicação direta cidadão-governo
- [ ] **Workflow de Aprovação**: Sistema de aprovação de issues

## 📝 Notas Importantes

### Segurança
- Nunca commitar secrets no Git
- Usar `env-variables-reference.md` apenas localmente
- Manter redirect URIs atualizados no Google OAuth
- Validar inputs do usuário via Prisma/tRPC

### Performance
- Imagens em Base64 são temporárias (considerar Cloudinary/S3)
- Implementar paginação em listas grandes
- Usar React.memo em componentes que re-renderizam muito
- Otimizar queries do Prisma com `select` específicos

### Monitoramento
- Vercel Analytics habilitado
- Lighthouse CI configurado
- Health checks automáticos
- Error tracking via logs da Vercel

---

**Última atualização**: 2025-08-14  
**Versão**: 1.0.0  
**Status**: ✅ Produção