# 🚀 Setup Local - KoePrefeito

Guia rápido para configurar e testar o projeto localmente.

## ⚡ Setup Automático (Recomendado)

```bash
# Clone o projeto
git clone https://github.com/seu-usuario/koeprefeito.git
cd koeprefeito

# Setup completo automático
pnpm setup
```

Este comando irá:
1. Instalar dependências
2. Iniciar PostgreSQL + Redis (Docker)
3. Gerar cliente Prisma
4. Aplicar schema do banco
5. Popular com dados de exemplo

## 🔧 Setup Manual (Passo a Passo)

### 1. Pré-requisitos

Certifique-se de ter instalado:
- **Node.js 20+** ([Download](https://nodejs.org/))
- **pnpm** (`npm install -g pnpm`)
- **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop/))

### 2. Instalar Dependências

```bash
pnpm install
```

### 3. Configurar Banco de Dados

```bash
# Iniciar PostgreSQL e Redis
pnpm docker:up

# Gerar cliente Prisma
pnpm db:generate

# Aplicar schema
pnpm db:push

# Popular dados de exemplo
pnpm db:seed
```

### 4. Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp apps/web/.env.local.example apps/web/.env.local
```

**Edite o arquivo `.env.local` com suas configurações:**

```env
# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=seu-secret-aqui-gere-uma-string-aleatoria

# Google OAuth (opcional para teste básico)
GOOGLE_CLIENT_ID=seu-google-client-id
GOOGLE_CLIENT_SECRET=seu-google-client-secret

# Database (já configurado para Docker)
DATABASE_URL=postgresql://koeprefeito:password@localhost:5432/koeprefeito

# Skip validation durante desenvolvimento
SKIP_ENV_VALIDATION=1
```

### 5. Iniciar Desenvolvimento

```bash
# Iniciar aplicação web
pnpm dev:web

# Ou iniciar todos os serviços
pnpm dev
```

## 🌐 Acessar a Aplicação

Depois de executar `pnpm dev:web`, acesse:

- **Aplicação Web**: http://localhost:3000
- **Banco de Dados (Adminer)**: http://localhost:8080
- **Prisma Studio**: `pnpm db:studio` → http://localhost:5555

## 🔑 Google OAuth (Opcional)

Para testar o login completo:

### 1. Criar Projeto no Google Cloud

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto
3. Ative a API "Google+ API"
4. Configure a tela de consentimento OAuth

### 2. Criar Credenciais OAuth

1. Vá em **APIs & Services > Credentials**
2. Clique em **Create Credentials > OAuth 2.0 Client IDs**
3. Tipo: **Web Application**
4. **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
5. Copie o **Client ID** e **Client Secret**

### 3. Atualizar .env.local

```env
GOOGLE_CLIENT_ID=seu-client-id-aqui
GOOGLE_CLIENT_SECRET=seu-client-secret-aqui
```

## 🧪 Testando o Sistema

### Login e Navegação
1. Acesse http://localhost:3000
2. Clique em "Entrar"
3. Use Google OAuth ou pule para testar sem login
4. Explore o dashboard e funcionalidades

### Dados de Teste
O seed criou usuários de exemplo:
- **Admin**: admin@koeprefeito.com.br
- **Moderador**: moderador@prefeitura.sp.gov.br  
- **Cidadão**: maria.santos@gmail.com

### APIs tRPC
Teste as APIs no navegador:
- http://localhost:3000/api/trpc/issues.getAll
- http://localhost:3000/api/trpc/auth.getSession

## 📊 Ferramentas de Desenvolvimento

### Banco de Dados
```bash
# Visualizar dados (Prisma Studio)
pnpm db:studio

# Reset completo do banco
pnpm db:reset

# Adminer (interface web)
# http://localhost:8080
# Server: postgres
# Username: koeprefeito  
# Password: password
# Database: koeprefeito
```

### Code Quality
```bash
# Verificar tipos TypeScript
pnpm type-check

# Executar linting
pnpm lint

# Formatar código
pnpm format
```

### Build de Produção
```bash
# Build da aplicação web
pnpm build:web

# Build de todos os packages
pnpm build
```

## 🐛 Solução de Problemas

### Erro de Conexão com Banco
```bash
# Verificar se Docker está rodando
docker ps

# Reiniciar containers
pnpm docker:down
pnpm docker:up
```

### Erro do Prisma
```bash
# Regenerar cliente
pnpm db:generate

# Aplicar schema novamente
pnpm db:push
```

### Erro de Dependências
```bash
# Limpar cache e reinstalar
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

### Porta em Uso
Se a porta 3000 estiver ocupada:
```bash
# Verificar processos na porta
netstat -ano | findstr :3000  # Windows
lsof -ti:3000 | xargs kill -9 # Mac/Linux
```

## 📝 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `pnpm setup` | Setup completo automático |
| `pnpm dev` | Inicia modo desenvolvimento |
| `pnpm dev:web` | Apenas aplicação web |
| `pnpm build` | Build de produção |
| `pnpm docker:up` | Inicia PostgreSQL + Redis |
| `pnpm docker:down` | Para containers Docker |
| `pnpm db:studio` | Abre Prisma Studio |
| `pnpm db:seed` | Popula dados de exemplo |
| `pnpm type-check` | Verifica tipos TypeScript |
| `pnpm lint` | Executa linting |

## ✅ Checklist de Teste

- [ ] Aplicação carrega em http://localhost:3000
- [ ] Página inicial renderiza corretamente
- [ ] Botão "Entrar" funciona
- [ ] Google OAuth configurado (opcional)
- [ ] Dashboard acessível após login
- [ ] Prisma Studio mostra dados
- [ ] Build de produção funciona
- [ ] Tipos TypeScript OK
- [ ] Linting sem erros

## 🆘 Precisa de Ajuda?

- Verifique os logs no terminal
- Teste cada step individualmente
- Confirme se todas as dependências estão instaladas
- Docker Desktop deve estar rodando

**Tudo funcionando?** 🎉 
Agora você pode explorar o código e começar a desenvolver novas funcionalidades!