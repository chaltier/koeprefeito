# KoePrefeito

Plataforma digital que conecta cidadãos e governos municipais, facilitando a comunicação, o acompanhamento de demandas públicas e a participação cívica.

## 🚀 Tecnologias

- **Frontend Web**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: tRPC, NextAuth.js
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Cache**: Redis
- **Monorepo**: Turborepo
- **Design System**: Components customizados com Headless UI

## 📁 Estrutura do Projeto

```
koeprefeito/
├── apps/
│   ├── web/                 # Aplicação Next.js
│   └── mobile/              # App React Native (futuro)
├── packages/
│   ├── shared/              # Tipos e utilitários compartilhados
│   ├── ui/                  # Biblioteca de componentes UI
│   └── database/            # Schema Prisma e configurações DB
├── docs/                    # Documentação do projeto
└── docker-compose.yml       # Ambiente de desenvolvimento
```

## 🛠️ Configuração do Ambiente

### Pré-requisitos

- Node.js 18+
- pnpm
- Docker e Docker Compose
- Conta Google Cloud (para OAuth)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/koeprefeito.git
cd koeprefeito
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure o banco de dados

```bash
# Inicie os serviços (PostgreSQL + Redis)
docker-compose up -d

# Gere o cliente Prisma
pnpm db:generate

# Execute as migrações
pnpm db:push

# Execute o seed (dados de exemplo)
pnpm db:seed
```

### 4. Configure as variáveis de ambiente

```bash
# Copie o arquivo de exemplo
cp apps/web/.env.local.example apps/web/.env.local

# Edite o arquivo .env.local com suas configurações
```

### 5. Configure o Google OAuth

1. Acesse o [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto ou selecione um existente
3. Ative a API "Google+ API"
4. Configure a tela de consentimento OAuth
5. Crie credenciais OAuth 2.0:
   - Tipo: Aplicação Web
   - URIs de redirecionamento: `http://localhost:3000/api/auth/callback/google`
6. Adicione as credenciais no arquivo `.env.local`

### 6. Inicie o ambiente de desenvolvimento

```bash
# Inicia todos os serviços
pnpm dev

# Ou inicie apenas a aplicação web
pnpm dev --filter=web
```

A aplicação estará disponível em:
- **Web App**: http://localhost:3000
- **Banco de dados (Adminer)**: http://localhost:8080
- **Prisma Studio**: `pnpm db:studio`

## 📋 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev                     # Inicia modo desenvolvimento
pnpm build                   # Build de produção
pnpm start                   # Inicia aplicação em produção

# Banco de dados
pnpm db:generate             # Gera cliente Prisma
pnpm db:push                 # Aplica schema ao banco
pnpm db:migrate              # Executa migrações
pnpm db:studio               # Abre Prisma Studio
pnpm db:seed                 # Popula banco com dados exemplo
pnpm db:reset                # Reset completo do banco

# Qualidade de código
pnpm lint                    # Executa linting
pnpm type-check              # Verifica tipos TypeScript
pnpm test                    # Executa testes (futuro)

# Limpeza
pnpm clean                   # Remove builds e cache
```

## 🏗️ Arquitetura

### Monorepo com Turborepo
- **apps/web**: Aplicação Next.js principal
- **packages/shared**: Tipos, constantes e utilitários
- **packages/ui**: Biblioteca de componentes reutilizáveis
- **packages/database**: Schema Prisma e configurações

### Stack Tecnológica
- **Frontend**: Next.js 14 com App Router, React Server Components
- **Autenticação**: NextAuth.js com Google OAuth
- **API**: tRPC para type-safe APIs
- **Banco**: PostgreSQL com Prisma ORM
- **Cache**: Redis para sessões e cache
- **UI**: Tailwind CSS + Headless UI
- **Validação**: Zod para schemas

### Funcionalidades Principais
- ✅ Autenticação via Google OAuth
- ✅ Dashboard do cidadão
- ✅ Sistema de solicitações (Issues)
- ✅ Comentários e votação
- ✅ Interface responsiva
- 🔄 Upload de imagens (em desenvolvimento)
- 🔄 Notificações em tempo real (em desenvolvimento)
- 🔄 App mobile React Native (em desenvolvimento)

## 🎯 Roadmap

### Sprint 1 - Funcionalidades Core
- [ ] Página de listagem de solicitações
- [ ] Formulário de criação de solicitações
- [ ] Sistema de upload de imagens
- [ ] Integração com mapas (Google Maps)

### Sprint 2 - Experiência do Usuário
- [ ] Filtros e busca avançada
- [ ] Notificações em tempo real
- [ ] Sistema de avaliação de atendimento
- [ ] Dashboard administrativo

### Sprint 3 - Mobile e Expansão
- [ ] Aplicativo React Native
- [ ] API pública para integrações
- [ ] Webhooks para sistemas municipais
- [ ] Analytics e relatórios

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'Add nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🆘 Suporte

- **Documentação**: [docs/](./docs/)
- **Issues**: [GitHub Issues](https://github.com/seu-usuario/koeprefeito/issues)
- **Email**: contato@koeprefeito.com.br