# KoePrefeito - Documento de Arquitetura Fullstack

## Introdução

Este documento delineia a arquitetura técnica completa para o KoePrefeito, incluindo sistemas backend, implementação frontend e sua integração. Serve como fonte única da verdade para desenvolvimento orientado por IA, garantindo consistência em toda a pilha tecnológica.

Esta abordagem unificada combina o que tradicionalmente seriam documentos separados de arquitetura backend e frontend, simplificando o processo de desenvolvimento para aplicações fullstack modernas onde essas preocupações estão cada vez mais interligadas.

### Template Inicial ou Projeto Existente

**Análise**: Projeto greenfield - nova construção do zero

**Decisão de Template**: Utilizaremos o template T3 Stack como base, que oferece:
- Next.js 14 com App Router para frontend
- tRPC para comunicação type-safe
- Prisma ORM para banco de dados
- NextAuth.js para autenticação
- Tailwind CSS para estilização
- TypeScript end-to-end

**Rationale**: O T3 Stack é ideal para aplicações fullstack que precisam de desenvolvimento rápido, type safety completo e arquitetura escalável - perfeito para o KoePrefeito.

### Registro de Mudanças
| Data | Versão | Descrição | Autor |
|------|---------|-------------|--------|
| 13/01/2025 | 1.0 | Arquitetura fullstack inicial | Arquiteto Winston |

## Arquitetura de Alto Nível

### Resumo Técnico

O KoePrefeito utiliza uma **arquitetura de microsserviços modernos** com frontend React Native/Next.js e backend Node.js distribuído. A plataforma é otimizada para processamento de vídeo em tempo real, geolocalização precisa e analytics políticos. A arquitetura suporta escalabilidade horizontal para atender múltiplas cidades simultaneamente, com foco em performance mobile e dashboards web responsivos para administradores.

### Plataforma e Infraestrutura

**Plataforma:** AWS (Amazon Web Services)

**Serviços Principais:**
- **Compute**: ECS Fargate para containers, Lambda para processamento assíncrono
- **Storage**: S3 para mídia (vídeos/fotos), CloudFront CDN para distribuição global
- **Database**: RDS PostgreSQL Multi-AZ, ElastiCache Redis para cache
- **ML/AI**: Rekognition para moderação, Transcribe para transcrição de vídeo
- **Notifications**: SNS/SQS para messaging, FCM para push notifications
- **Security**: Cognito para auth, WAF para proteção, KMS para criptografia

**Deployment e Regiões:** sa-east-1 (São Paulo) como região principal, us-east-1 para serviços globais

### Estrutura do Repositório

**Estrutura:** Monorepo com Turborepo

**Ferramenta de Monorepo:** Turborepo v1.10+ para build caching e task orchestration

**Organização de Pacotes:**
- Separação clara entre aplicações (apps/) e bibliotecas compartilhadas (packages/)
- Tipos TypeScript compartilhados entre frontend e backend
- Componentes UI reutilizáveis entre mobile e web
- Utilitários comuns e configurações centralizadas

### Diagrama de Arquitetura de Alto Nível

```mermaid
graph TB
    subgraph "Frontend"
        A[Mobile App React Native]
        B[Web Admin Next.js]
        C[PWA Cidadão]
    end
    
    subgraph "API Gateway & Load Balancer"
        D[AWS ALB]
        E[API Gateway]
    end
    
    subgraph "Microsserviços Backend"
        F[Auth Service]
        G[Reports Service]
        H[Analytics Service]
        I[Notifications Service]
        J[AI/ML Service]
    end
    
    subgraph "Data Layer"
        K[(PostgreSQL RDS)]
        L[(Redis Cache)]
        M[S3 Media Storage]
    end
    
    subgraph "External Services"
        N[Google Maps API]
        O[Firebase FCM]
        P[AWS AI Services]
    end
    
    A --> D
    B --> D
    C --> D
    D --> E
    E --> F
    E --> G
    E --> H
    E --> I
    E --> J
    
    F --> K
    G --> K
    H --> K
    F --> L
    G --> L
    
    G --> M
    J --> M
    
    J --> P
    I --> O
    G --> N
    
    style A fill:#E1F5FE
    style B fill:#E1F5FE
    style C fill:#E1F5FE
    style F fill:#FFF3E0
    style G fill:#FFF3E0
    style H fill:#FFF3E0
    style I fill:#FFF3E0
    style J fill:#FFF3E0
    style K fill:#E8F5E8
    style L fill:#E8F5E8
    style M fill:#E8F5E8
```

### Padrões Arquiteturais

- **Arquitetura de Microsserviços**: Serviços independentes com responsabilidades bem definidas - _Rationale:_ Permite escalabilidade independente e manutenção isolada de funcionalidades críticas
- **API-First Design**: APIs REST/tRPC documentadas antes da implementação - _Rationale:_ Facilita desenvolvimento paralelo e integração entre equipes
- **Event-Driven Architecture**: Comunicação assíncrona via SQS/SNS - _Rationale:_ Desacoplamento de serviços e processamento não-bloqueante
- **CQRS para Analytics**: Separação de comandos e consultas para métricas - _Rationale:_ Otimização de performance para dashboards em tempo real
- **Circuit Breaker Pattern**: Resilência para APIs externas - _Rationale:_ Evita cascata de falhas e melhora experiência do usuário

## Stack Tecnológica

### Tabela da Stack Tecnológica

| Categoria | Tecnologia | Versão | Propósito | Rationale |
|-----------|------------|---------|-----------|-----------|
| **Frontend Mobile** | React Native | 0.73.x | Aplicativo mobile nativo iOS/Android | Desenvolvimento multiplataforma eficiente, performance nativa |
| **Frontend Web** | Next.js | 14.x | Interface administrativa web | SSR/SSG para SEO, App Router para performance |
| **Linguagem Frontend** | TypeScript | 5.3.x | Type safety em todo frontend | Reduz bugs, melhora DX, facilita refatoração |
| **Estado Global** | Zustand | 4.4.x | Gerenciamento de estado | Simplicidade vs Redux, performance superior |
| **UI Framework** | Tailwind CSS | 3.4.x | Estilização utilitária | Consistência visual, build size otimizado |
| **Componentes UI** | Tamagui | 1.x | Componentes React Native | Performance, acessibilidade, design system |
| **Linguagem Backend** | TypeScript | 5.3.x | Runtime do servidor | Consistência com frontend, type safety |
| **Runtime Backend** | Node.js | 20.x LTS | Runtime JavaScript do servidor | Ecossistema maduro, performance, compartilhamento de código |
| **Framework Backend** | Next.js API Routes | 14.x | Endpoints da API | Integração seamless com frontend |
| **API Layer** | tRPC | 10.x | Comunicação type-safe | Type safety end-to-end, DX superior |
| **Banco Principal** | PostgreSQL | 15.x | Dados relacionais principais | ACID compliance, JSON support, extensibilidade |
| **Cache** | Redis | 7.x | Cache de sessão e dados | Performance, pub/sub para real-time |
| **ORM** | Prisma | 5.x | Object-Relational Mapping | Type safety, migrations, great DX |
| **Autenticação** | NextAuth.js | 4.x | Autenticação e autorização | Integração com provedores, segurança |
| **File Storage** | AWS S3 | - | Armazenamento de vídeos/fotos | Escalabilidade, durabilidade, CDN integration |
| **CDN** | CloudFront | - | Distribuição de conteúdo | Performance global, cache inteligente |
| **Maps** | Google Maps API | v3 | Geolocalização e mapas | Precisão, features completas |
| **Push Notifications** | Firebase FCM | v9 | Notificações mobile | Confiabilidade, multiplataforma |
| **Video Processing** | FFmpeg | 6.x | Compressão e processamento | Padrão da indústria, flexibilidade |
| **AI/ML** | AWS Rekognition | - | Moderação de conteúdo | Detecção automática, escalabilidade |
| **Speech-to-Text** | AWS Transcribe | - | Transcrição de vídeos | Português brasileiro, precisão |
| **Monitoramento** | DataDog | - | APM, logs, métricas | Observabilidade completa |
| **Containerização** | Docker | 24.x | Containerização de serviços | Consistência de ambiente |
| **Orquestração** | AWS ECS Fargate | - | Container orchestration | Serverless containers, auto-scaling |
| **CI/CD** | GitHub Actions | - | Pipeline de deploy | Integração com repositório |
| **IaC** | AWS CDK | 2.x | Infrastructure as Code | Type safety para infraestrutura |

## Modelos de Dados

### Modelo User (Usuário)

**Propósito:** Representar todos os tipos de usuários do sistema (cidadãos, administradores, prefeitos)

**Atributos Principais:**
- id: string (UUID) - Identificador único
- email: string - Email de acesso
- phone: string - Telefone para verificação
- name: string - Nome completo
- avatar_url: string? - URL da foto de perfil
- role: enum - CITIZEN | ADMIN | SECRETARY | MAYOR
- city_id: string - Cidade vinculada
- is_verified: boolean - Telefone verificado
- reputation_score: number - Score de reputação (0-100)
- created_at: datetime - Data de criação

#### Interface TypeScript
```typescript
export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  avatar_url?: string;
  role: 'CITIZEN' | 'ADMIN' | 'SECRETARY' | 'MAYOR';
  city_id: string;
  is_verified: boolean;
  reputation_score: number;
  created_at: Date;
  updated_at: Date;
}
```

#### Relacionamentos
- **Pertence a**: City (many-to-one)
- **Possui muitos**: Reports, Validations, Comments

### Modelo Report (Reporte)

**Propósito:** Representar problemas urbanos reportados pelos cidadãos

**Atributos Principais:**
- id: string (UUID) - Identificador único
- user_id: string - Autor do reporte
- title: string - Título gerado automaticamente
- description: string? - Descrição opcional do usuário
- category: enum - Categoria do problema
- urgency: enum - Nível de urgência
- status: enum - Status atual
- latitude: number - Coordenada GPS
- longitude: number - Coordenada GPS
- address: string - Endereço legível
- video_url: string? - URL do vídeo
- photo_url: string - URL da foto (obrigatória)
- transcription: string? - Transcrição do vídeo
- validation_count: number - Contagem de validações
- created_at: datetime - Data de criação

#### Interface TypeScript
```typescript
export interface Report {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  category: 'ILUMINACAO' | 'PAVIMENTACAO' | 'LIMPEZA' | 'SANEAMENTO' | 'TRANSPORTE' | 'SEGURANCA' | 'SAUDE' | 'EDUCACAO' | 'MEIO_AMBIENTE' | 'OUTROS';
  urgency: 'BAIXA' | 'MEDIA' | 'ALTA' | 'EMERGENCIA';
  status: 'REPORTADO' | 'EM_ANALISE' | 'EM_ANDAMENTO' | 'RESOLVIDO' | 'REJEITADO';
  latitude: number;
  longitude: number;
  address: string;
  video_url?: string;
  photo_url: string;
  transcription?: string;
  validation_count: number;
  created_at: Date;
  updated_at: Date;
}
```

#### Relacionamentos
- **Pertence a**: User (author), City
- **Possui muitos**: Validations, Comments, StatusUpdates

## Especificação da API

### API tRPC

Usando tRPC para comunicação type-safe entre frontend e backend, eliminando a necessidade de OpenAPI tradicional.

#### Router de Reports

```typescript
export const reportsRouter = router({
  // Criar novo reporte
  create: publicProcedure
    .input(z.object({
      description: z.string().optional(),
      category: z.enum(['ILUMINACAO', 'PAVIMENTACAO', 'LIMPEZA']),
      urgency: z.enum(['BAIXA', 'MEDIA', 'ALTA', 'EMERGENCIA']),
      latitude: z.number(),
      longitude: z.number(),
      video_file: z.string().optional(), // Base64 ou presigned URL
      photo_file: z.string(), // Base64 ou presigned URL
    }))
    .mutation(async ({ input, ctx }) => {
      // Lógica de criação do reporte
    }),

  // Listar reportes por região
  getByRegion: publicProcedure
    .input(z.object({
      latitude: z.number(),
      longitude: z.number(),
      radius_km: z.number().default(5),
      category: z.string().optional(),
      status: z.string().optional(),
      limit: z.number().default(20),
      offset: z.number().default(0),
    }))
    .query(async ({ input }) => {
      // Busca por geolocalização
    }),

  // Validar reporte
  validate: protectedProcedure
    .input(z.object({
      report_id: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      // Lógica de validação comunitária
    }),

  // Atualizar status (admin only)
  updateStatus: adminProcedure
    .input(z.object({
      report_id: z.string(),
      status: z.enum(['EM_ANALISE', 'EM_ANDAMENTO', 'RESOLVIDO', 'REJEITADO']),
      comment: z.string().optional(),
      photo_url: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      // Atualização de status por admin
    }),
});
```

#### Router de Analytics

```typescript
export const analyticsRouter = router({
  // Dashboard do prefeito
  mayorDashboard: mayorProcedure
    .input(z.object({
      date_from: z.date(),
      date_to: z.date(),
      city_id: z.string(),
    }))
    .query(async ({ input }) => {
      return {
        total_reports: number,
        resolution_rate: number,
        avg_resolution_time: number,
        popular_categories: Array<{category: string, count: number}>,
        neighborhood_stats: Array<{neighborhood: string, reports: number, resolved: number}>,
        sentiment_score: number,
      };
    }),

  // Mapa de calor
  heatmapData: publicProcedure
    .input(z.object({
      city_id: z.string(),
      category: z.string().optional(),
      date_range: z.number().default(30), // dias
    }))
    .query(async ({ input }) => {
      // Dados para mapa de calor
    }),
});
```

## Componentes

### Serviço de Autenticação (Auth Service)

**Responsabilidade:** Gerenciar autenticação, autorização e perfis de usuário

**Interfaces Principais:**
- POST /auth/register - Registro de usuário
- POST /auth/login - Login com email/senha
- POST /auth/verify-phone - Verificação SMS
- GET /auth/profile - Dados do perfil
- PUT /auth/profile - Atualização do perfil

**Dependências:** PostgreSQL (usuários), Redis (sessões), AWS SNS (SMS)

**Detalhes Tecnológicos:** NextAuth.js com adaptadores customizados, JWT + refresh tokens, rate limiting

### Serviço de Reportes (Reports Service)

**Responsabilidade:** CRUD de reportes, upload de mídia, geolocalização, busca

**Interfaces Principais:**
- POST /reports - Criar reporte
- GET /reports/nearby - Buscar por região
- PUT /reports/:id/status - Atualizar status (admin)
- POST /reports/:id/validate - Validação comunitária

**Dependências:** PostgreSQL (dados), S3 (mídia), Google Maps (geocoding), SQS (processamento assíncrono)

**Detalhes Tecnológicos:** Upload direto para S3 com presigned URLs, indexação geográfica com PostGIS

### Serviço de Analytics (Analytics Service)

**Responsabilidade:** Métricas em tempo real, dashboards, relatórios executivos

**Interfaces Principais:**
- GET /analytics/dashboard - Métricas principais
- GET /analytics/heatmap - Dados para mapa de calor
- GET /analytics/sentiment - Análise de sentimento
- GET /analytics/reports - Relatórios customizados

**Dependências:** PostgreSQL (agregações), Redis (cache), ElasticSearch (busca avançada)

**Detalhes Tecnológicos:** Views materializadas para performance, cache inteligente, queries otimizadas

### Serviço de Notificações (Notifications Service)

**Responsabilidade:** Push notifications, emails, SMS, comunicação em tempo real

**Interfaces Principais:**
- POST /notifications/push - Enviar push notification
- POST /notifications/email - Enviar email
- WebSocket /notifications/realtime - Conexão em tempo real

**Dependências:** FCM (push), SES (email), SNS (SMS), Redis (pub/sub)

**Detalhes Tecnológicos:** Templates de notificação, fila de prioridade, retry automático

### Serviço de IA/ML (AI/ML Service)

**Responsabilidade:** Moderação de conteúdo, transcrição, categorização automática

**Interfaces Principais:**
- POST /ai/moderate - Moderação de imagem/vídeo
- POST /ai/transcribe - Transcrição de áudio
- POST /ai/categorize - Sugestão de categoria
- POST /ai/sentiment - Análise de sentimento

**Dependências:** AWS Rekognition, Transcribe, Comprehend, S3

**Detalhes Tecnológicos:** Processamento assíncrono, webhook callbacks, ML pipeline

### Diagrama de Componentes

```mermaid
graph LR
    subgraph "Frontend Apps"
        A[Mobile App]
        B[Admin Web]
    end
    
    subgraph "API Gateway"
        C[tRPC Router]
    end
    
    subgraph "Core Services"
        D[Auth Service]
        E[Reports Service]
        F[Analytics Service]
    end
    
    subgraph "Supporting Services"
        G[Notifications Service]
        H[AI/ML Service]
        I[File Upload Service]
    end
    
    subgraph "External APIs"
        J[Google Maps]
        K[AWS AI Services]
        L[Firebase FCM]
    end
    
    A --> C
    B --> C
    C --> D
    C --> E
    C --> F
    E --> G
    E --> H
    E --> I
    H --> K
    G --> L
    E --> J
    
    style D fill:#FFE4B5
    style E fill:#FFE4B5
    style F fill:#FFE4B5
    style G fill:#E1F5FE
    style H fill:#E1F5FE
    style I fill:#E1F5FE
```

## APIs Externas

### Google Maps API

- **Propósito:** Geolocalização, geocoding reverso, visualização de mapas
- **Documentação:** https://developers.google.com/maps/documentation
- **URL Base:** https://maps.googleapis.com/maps/api
- **Autenticação:** API Key com restrições de domínio
- **Rate Limits:** 40.000 requests/mês no free tier

**Endpoints Principais Utilizados:**
- `GET /geocode/json` - Conversão endereço ↔ coordenadas
- `GET /js?key=API_KEY` - Maps JavaScript API

**Notas de Integração:** Caching agressivo de geocoding, fallback para OpenStreetMap em caso de quota excedida

### Firebase Cloud Messaging (FCM)

- **Propósito:** Push notifications para aplicativos mobile
- **Documentação:** https://firebase.google.com/docs/cloud-messaging
- **URL Base:** https://fcm.googleapis.com/fcm
- **Autenticação:** Service Account JSON
- **Rate Limits:** Sem limite específico

**Endpoints Principais Utilizados:**
- `POST /send` - Envio de notificação individual
- `POST /fcm/send` - Envio em lote

**Notas de Integração:** Topics para notificações por região, payload customizado para deep linking

## Fluxos Principais

### Fluxo de Criação de Reporte

```mermaid
sequenceDiagram
    participant U as Usuário
    participant M as Mobile App
    participant API as tRPC API
    participant S3 as AWS S3
    participant DB as PostgreSQL
    participant AI as AI Service
    participant N as Notifications

    U->>M: Grava vídeo + foto
    M->>M: Comprime mídia localmente
    M->>API: Solicita presigned URLs
    API->>S3: Gera presigned URLs
    S3-->>API: URLs assinadas
    API-->>M: Retorna URLs
    M->>S3: Upload direto de mídia
    S3-->>M: Confirmação upload
    M->>API: Cria reporte com URLs
    API->>DB: Salva reporte
    API->>AI: Envia para processamento
    AI->>AI: Transcrição + moderação
    AI->>DB: Atualiza metadados
    API->>N: Notifica admins relevantes
    API-->>M: Reporte criado
    M-->>U: Confirmação + ID
```

### Fluxo de Validação Comunitária

```mermaid
sequenceDiagram
    participant U as Usuário
    participant M as Mobile App
    participant API as tRPC API
    participant DB as PostgreSQL
    participant Cache as Redis
    participant N as Notifications

    U->>M: Toca "Eu vejo isso também"
    M->>API: Envia validação + GPS
    API->>API: Verifica proximidade (1km)
    API->>DB: Verifica se já validou
    alt Primeira validação
        API->>DB: Registra validação
        API->>DB: Incrementa contador
        API->>Cache: Invalida cache do reporte
        API->>DB: Atualiza reputação usuário
        API->>N: Notifica autor do reporte
        API-->>M: Sucesso + novo contador
    else Já validou
        API-->>M: Erro: já validado
    end
    M-->>U: Feedback visual
```

## Esquema do Banco de Dados

### Principais Tabelas

```sql
-- Usuários do sistema
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'CITIZEN',
    city_id UUID NOT NULL REFERENCES cities(id),
    is_verified BOOLEAN DEFAULT FALSE,
    reputation_score INTEGER DEFAULT 50,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cidades suportadas
CREATE TABLE cities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    state VARCHAR(2) NOT NULL,
    bounds GEOMETRY(POLYGON, 4326), -- Limites geográficos
    population INTEGER,
    mayor_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reportes de problemas
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    city_id UUID NOT NULL REFERENCES cities(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category report_category NOT NULL,
    urgency urgency_level NOT NULL,
    status report_status NOT NULL DEFAULT 'REPORTADO',
    location GEOMETRY(POINT, 4326) NOT NULL,
    address TEXT NOT NULL,
    video_url TEXT,
    photo_url TEXT NOT NULL,
    transcription TEXT,
    validation_count INTEGER DEFAULT 0,
    sentiment_score REAL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices geográficos para performance
CREATE INDEX idx_reports_location ON reports USING GIST (location);
CREATE INDEX idx_reports_category_status ON reports (category, status);
CREATE INDEX idx_reports_created_at ON reports (created_at DESC);

-- Validações comunitárias
CREATE TABLE validations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID NOT NULL REFERENCES reports(id),
    user_id UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(report_id, user_id)
);

-- Atualizações de status
CREATE TABLE status_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID NOT NULL REFERENCES reports(id),
    admin_id UUID NOT NULL REFERENCES users(id),
    previous_status report_status NOT NULL,
    new_status report_status NOT NULL,
    comment TEXT,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Tipos Customizados

```sql
CREATE TYPE user_role AS ENUM ('CITIZEN', 'ADMIN', 'SECRETARY', 'MAYOR');
CREATE TYPE report_category AS ENUM ('ILUMINACAO', 'PAVIMENTACAO', 'LIMPEZA', 'SANEAMENTO', 'TRANSPORTE', 'SEGURANCA', 'SAUDE', 'EDUCACAO', 'MEIO_AMBIENTE', 'OUTROS');
CREATE TYPE urgency_level AS ENUM ('BAIXA', 'MEDIA', 'ALTA', 'EMERGENCIA');
CREATE TYPE report_status AS ENUM ('REPORTADO', 'EM_ANALISE', 'EM_ANDAMENTO', 'RESOLVIDO', 'REJEITADO');
```

## Arquitetura Frontend

### Arquitetura de Componentes Mobile (React Native)

#### Organização de Componentes

```
src/
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes básicos (Button, Input, Card)
│   ├── forms/           # Formulários compostos
│   ├── media/           # Video player, câmera, upload
│   └── maps/            # Componentes de mapa
├── screens/             # Telas principais
│   ├── auth/            # Login, registro, verificação
│   ├── reports/         # Feed, criar, detalhe
│   ├── profile/         # Perfil, configurações
│   └── admin/           # Interfaces administrativas
├── hooks/               # Custom hooks
├── services/            # Clientes de API (tRPC)
├── utils/               # Utilitários gerais
├── types/               # Tipos TypeScript compartilhados
└── stores/              # Estado global (Zustand)
```

#### Template de Componente

```typescript
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styled } from '@tamagui/core';

interface ReportCardProps {
  report: Report;
  onPress: (reportId: string) => void;
  onValidate?: (reportId: string) => void;
}

const CardContainer = styled(View, {
  backgroundColor: '$background',
  borderRadius: '$4',
  padding: '$4',
  marginVertical: '$2',
  shadowColor: '$shadowColor',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
});

export const ReportCard: React.FC<ReportCardProps> = ({
  report,
  onPress,
  onValidate,
}) => {
  const handlePress = () => onPress(report.id);
  
  return (
    <CardContainer>
      <Pressable onPress={handlePress}>
        {/* Conteúdo do card */}
      </Pressable>
    </CardContainer>
  );
};
```

### Arquitetura de Gerenciamento de Estado

#### Estrutura do Estado (Zustand)

```typescript
// stores/authStore.ts
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email, password) => {
    const user = await authApi.login({ email, password });
    set({ user, isAuthenticated: true });
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  
  updateProfile: async (data) => {
    const updatedUser = await authApi.updateProfile(data);
    set({ user: updatedUser });
  },
}));

// stores/reportsStore.ts
interface ReportsState {
  reports: Report[];
  loading: boolean;
  filters: ReportFilters;
  fetchNearbyReports: (lat: number, lng: number) => Promise<void>;
  createReport: (data: CreateReportInput) => Promise<void>;
  validateReport: (reportId: string) => Promise<void>;
}
```

### Arquitetura de Roteamento

#### Configuração de Rotas (React Navigation)

```typescript
// navigation/AppNavigator.tsx
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#1E40AF',
        tabBarInactiveTintColor: '#6B7280',
      }}
    >
      <Tab.Screen 
        name="Feed" 
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tab.Screen 
        name="Report" 
        component={CreateReportScreen}
        options={{
          tabBarIcon: ({ color }) => <Camera color={color} />,
        }}
      />
      <Tab.Screen 
        name="Map" 
        component={MapScreen}
        options={{
          tabBarIcon: ({ color }) => <MapPin color={color} />,
        }}
      />
      <Tab.Screen 
        name="MyReports" 
        component={MyReportsScreen}
        options={{
          tabBarIcon: ({ color }) => <List color={color} />,
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <User color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
```

### Camada de Serviços Frontend

#### Configuração do Cliente tRPC

```typescript
// services/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../backend/src/router';

export const trpc = createTRPCReact<AppRouter>();

// services/api.ts
export const apiClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: process.env.EXPO_PUBLIC_API_URL + '/trpc',
      headers: () => {
        const token = getAuthToken();
        return token ? { Authorization: `Bearer ${token}` } : {};
      },
    }),
  ],
});
```

#### Exemplo de Serviço

```typescript
// services/reportsService.ts
export const useNearbyReports = (lat: number, lng: number) => {
  return trpc.reports.getByRegion.useQuery({
    latitude: lat,
    longitude: lng,
    radius_km: 5,
    limit: 20,
  });
};

export const useCreateReport = () => {
  const utils = trpc.useContext();
  
  return trpc.reports.create.useMutation({
    onSuccess: () => {
      // Invalidar cache de reportes
      utils.reports.getByRegion.invalidate();
    },
  });
};
```

## Arquitetura Backend

### Arquitetura de Serviços (Next.js API Routes)

#### Organização de Controllers

```
src/
├── pages/api/           # API Routes do Next.js
│   ├── trpc/           # Endpoint tRPC
│   ├── auth/           # Autenticação
│   ├── upload/         # Upload de arquivos
│   └── webhooks/       # Webhooks externos
├── server/             # Lógica do servidor
│   ├── routers/        # Routers tRPC
│   ├── services/       # Lógica de negócio
│   ├── middleware/     # Middleware customizado
│   └── utils/          # Utilitários do servidor
├── lib/                # Configurações e clientes
│   ├── db.ts           # Cliente Prisma
│   ├── redis.ts        # Cliente Redis
│   ├── s3.ts           # Cliente AWS S3
│   └── auth.ts         # Configuração NextAuth
└── types/              # Tipos compartilhados
```

#### Template de Service

```typescript
// server/services/reportsService.ts
import { db } from '../../lib/db';
import { s3Client } from '../../lib/s3';
import { aiService } from './aiService';

export class ReportsService {
  async createReport(data: CreateReportInput, userId: string) {
    // 1. Validar dados de entrada
    const location = await this.validateLocation(data.latitude, data.longitude);
    
    // 2. Processar upload de mídia
    const mediaUrls = await this.processMediaUpload(data.video_file, data.photo_file);
    
    // 3. Criar reporte no banco
    const report = await db.report.create({
      data: {
        user_id: userId,
        title: this.generateTitle(data.category, location.address),
        description: data.description,
        category: data.category,
        urgency: data.urgency,
        latitude: data.latitude,
        longitude: data.longitude,
        address: location.address,
        video_url: mediaUrls.video_url,
        photo_url: mediaUrls.photo_url,
      },
    });
    
    // 4. Processar IA assíncrono
    await this.processAIAnalysis(report.id, mediaUrls);
    
    // 5. Notificar administradores
    await this.notifyAdministrators(report);
    
    return report;
  }

  private async processMediaUpload(videoFile?: string, photoFile?: string) {
    // Lógica de upload para S3
  }

  private async processAIAnalysis(reportId: string, mediaUrls: any) {
    // Envia para fila de processamento IA
  }
}
```

### Arquitetura de Dados

#### Configuração do Prisma

```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

// Extensão do Prisma para métodos customizados
export const extendedDb = db.$extends({
  model: {
    report: {
      async findNearby(lat: number, lng: number, radiusKm: number = 5) {
        return db.$queryRaw`
          SELECT *, 
            ST_Distance(location, ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)) as distance
          FROM reports 
          WHERE ST_DWithin(location, ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326), ${radiusKm * 1000})
          ORDER BY distance
        `;
      },
    },
  },
});
```

#### Padrão Repository

```typescript
// server/repositories/reportsRepository.ts
export class ReportsRepository {
  async findById(id: string): Promise<Report | null> {
    return db.report.findUnique({
      where: { id },
      include: {
        user: true,
        validations: true,
        status_updates: true,
      },
    });
  }

  async findNearby(lat: number, lng: number, filters?: ReportFilters): Promise<Report[]> {
    return extendedDb.report.findNearby(lat, lng, filters?.radius);
  }

  async updateStatus(id: string, status: ReportStatus, adminId: string, comment?: string) {
    return db.$transaction(async (tx) => {
      const report = await tx.report.update({
        where: { id },
        data: { status },
      });

      await tx.statusUpdate.create({
        data: {
          report_id: id,
          admin_id: adminId,
          previous_status: report.status,
          new_status: status,
          comment,
        },
      });

      return report;
    });
  }
}
```

## Estrutura de Projeto Unificada

```
koeprefeito/
├── apps/
│   ├── mobile/                    # React Native App
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── screens/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── stores/
│   │   ├── app.json
│   │   └── package.json
│   └── web/                       # Next.js Web App
│       ├── src/
│       │   ├── pages/
│       │   ├── components/
│       │   ├── server/
│       │   └── lib/
│       ├── prisma/
│       ├── next.config.js
│       └── package.json
├── packages/
│   ├── shared/                    # Tipos e utilitários compartilhados
│   │   ├── src/
│   │   │   ├── types/
│   │   │   ├── constants/
│   │   │   └── utils/
│   │   └── package.json
│   ├── ui/                        # Componentes UI compartilhados
│   │   ├── src/
│   │   │   ├── components/
│   │   │   └── styles/
│   │   └── package.json
│   └── config/                    # Configurações compartilhadas
│       ├── eslint/
│       ├── typescript/
│       └── tailwind/
├── infrastructure/                # AWS CDK
│   ├── lib/
│   ├── bin/
│   └── cdk.json
├── docs/                         # Documentação do projeto
├── scripts/                      # Scripts de build/deploy
├── .github/workflows/            # GitHub Actions
├── package.json                  # Root package.json
├── turbo.json                    # Configuração Turborepo
└── README.md
```

## Fluxo de Desenvolvimento

### Configuração do Ambiente Local

#### Pré-requisitos

```bash
# Ferramentas necessárias
node --version    # v20.x
npm --version     # v10.x
docker --version  # v24.x
```

#### Configuração Inicial

```bash
# Clone do repositório
git clone https://github.com/seu-org/koeprefeito.git
cd koeprefeito

# Instalação de dependências
npm install

# Configuração de ambiente
cp .env.example .env.local
# Editar .env.local com suas variáveis

# Setup do banco de dados local
docker-compose up -d postgres redis
npx prisma migrate dev
npx prisma db seed

# Iniciar desenvolvimento
npm run dev
```

#### Comandos de Desenvolvimento

```bash
# Iniciar todos os serviços
npm run dev

# Iniciar apenas mobile
npm run dev:mobile

# Iniciar apenas web
npm run dev:web

# Executar testes
npm run test

# Build de produção
npm run build

# Deploy
npm run deploy
```

### Configuração de Variáveis de Ambiente

#### Frontend (.env.local)

```bash
# API
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_WS_URL=ws://localhost:3001

# Maps
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=sua_chave_aqui

# Firebase
EXPO_PUBLIC_FIREBASE_PROJECT_ID=koeprefeito-dev
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
```

#### Backend (.env)

```bash
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/koeprefeito"
REDIS_URL="redis://localhost:6379"

# AWS
AWS_REGION=sa-east-1
AWS_ACCESS_KEY_ID=sua_chave
AWS_SECRET_ACCESS_KEY=sua_chave_secreta
S3_BUCKET_NAME=koeprefeito-media-dev

# External APIs
GOOGLE_MAPS_API_KEY=sua_chave_maps
FIREBASE_SERVICE_ACCOUNT_KEY=sua_chave_firebase

# Auth
NEXTAUTH_SECRET=seu_secret_super_secreto
NEXTAUTH_URL=http://localhost:3000
```

## Estratégia de Deployment

### Estratégia de Deployment

**Frontend Deployment:**
- **Plataforma:** Expo EAS para mobile, Vercel para web
- **Comando de Build:** `npx expo build` (mobile), `npm run build` (web)
- **Diretório de Output:** `dist/` (mobile), `.next/` (web)
- **CDN/Edge:** Vercel Edge Network, CloudFront para assets

**Backend Deployment:**
- **Plataforma:** AWS ECS Fargate
- **Comando de Build:** `npm run build && docker build`
- **Método de Deploy:** Blue-green deployment com AWS ALB

### Pipeline CI/CD

```yaml
# .github/workflows/deploy.yml
name: Deploy KoePrefeito

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test
      - run: npm run type-check

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      # Deploy Web
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./apps/web

      # Deploy Mobile
      - name: Setup Expo
        uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      
      - name: Build and Submit
        run: |
          cd apps/mobile
          expo build:android --type apk
          expo build:ios --type archive

      # Deploy Infrastructure
      - name: Deploy AWS Infrastructure
        run: |
          cd infrastructure
          npm ci
          npx cdk deploy --require-approval never
```

### Ambientes

| Ambiente | Frontend URL | Backend URL | Propósito |
|----------|-------------|-------------|-----------|
| Development | http://localhost:3000 | http://localhost:3000/api | Desenvolvimento local |
| Staging | https://staging.koeprefeito.app | https://api-staging.koeprefeito.app | Testes pré-produção |
| Production | https://koeprefeito.app | https://api.koeprefeito.app | Ambiente live |

## Segurança e Performance

### Requisitos de Segurança

**Segurança do Frontend:**
- Headers CSP: `default-src 'self'; script-src 'self' 'unsafe-inline'; img-src 'self' data: https:`
- Prevenção XSS: Sanitização de inputs, escape de outputs
- Armazenamento Seguro: Keychain (iOS), Keystore (Android) para tokens

**Segurança do Backend:**
- Validação de Input: Zod schemas em todas as entradas
- Rate Limiting: 100 requests/minuto por IP, 1000/hora por usuário
- Política CORS: `["https://koeprefeito.app", "https://admin.koeprefeito.app"]`

**Segurança de Autenticação:**
- Armazenamento de Token: HTTP-only cookies para web, secure storage para mobile
- Gerenciamento de Sessão: JWT com refresh tokens, expiração de 15 minutos
- Política de Senha: Mínimo 8 caracteres, combinação de letras, números e símbolos

### Otimização de Performance

**Performance do Frontend:**
- Tamanho do Bundle Alvo: <2MB para mobile, <500KB initial para web
- Estratégia de Carregamento: Code splitting por rota, lazy loading de componentes
- Estratégia de Cache: 24h para assets estáticos, 5min para dados dinâmicos

**Performance do Backend:**
- Tempo de Resposta Alvo: <200ms para 95% das requisições
- Otimização de Banco: Índices geográficos, connection pooling, read replicas
- Estratégia de Cache: Redis para sessões, CloudFront para mídia

## Estratégia de Monitoramento

### Stack de Monitoramento

- **Frontend Monitoring:** Sentry para error tracking, Analytics customizado
- **Backend Monitoring:** DataDog para APM, CloudWatch para infraestrutura
- **Error Tracking:** Sentry para ambos frontend e backend
- **Performance Monitoring:** Lighthouse CI, Core Web Vitals, RUM

### Métricas Principais

**Métricas do Frontend:**
- Core Web Vitals (LCP, FID, CLS)
- Erros JavaScript e crashes
- Tempo de carregamento de telas
- Taxa de conversão de reportes

**Métricas do Backend:**
- Taxa de requisições por minuto
- Taxa de erro por endpoint
- Tempo de resposta P95
- Performance de queries de banco

## Padrões de Codificação

### Regras Críticas de Fullstack

- **Compartilhamento de Tipos:** Sempre definir tipos em packages/shared e importar de lá
- **Chamadas de API:** Nunca fazer chamadas HTTP diretas - usar sempre o cliente tRPC
- **Variáveis de Ambiente:** Acessar apenas através de objetos de config, nunca process.env diretamente
- **Tratamento de Erros:** Todas as rotas da API devem usar o handler de erro padrão
- **Atualizações de Estado:** Nunca mutar estado diretamente - usar padrões de gerenciamento de estado adequados

### Convenções de Nomenclatura

| Elemento | Frontend | Backend | Exemplo |
|----------|----------|---------|---------|
| Componentes | PascalCase | - | `UserProfile.tsx` |
| Hooks | camelCase com 'use' | - | `useAuth.ts` |
| Rotas da API | - | kebab-case | `/api/user-profile` |
| Tabelas do Banco | - | snake_case | `user_profiles` |
| Constantes | UPPER_SNAKE_CASE | UPPER_SNAKE_CASE | `MAX_FILE_SIZE` |

## Tratamento de Erros

### Estratégia de Tratamento de Erros Unificada

#### Fluxo de Erro

```mermaid
sequenceDiagram
    participant F as Frontend
    participant API as tRPC API
    participant S as Service
    participant DB as Database
    participant L as Logger

    F->>API: Request com erro
    API->>S: Chama service
    S->>DB: Query falha
    DB-->>S: Erro SQL
    S->>L: Log erro com context
    S-->>API: Throw TRPCError
    API->>L: Log request context
    API-->>F: Erro formatado
    F->>F: Display user message
    F->>L: Log error boundary
```

### Formato de Resposta de Erro

```typescript
interface ApiError {
  error: {
    code: string;           // ERROR_CODE_CONSTANT
    message: string;        // Mensagem amigável para usuário
    details?: any;          // Detalhes técnicos (apenas dev)
    timestamp: string;      // ISO string
    requestId: string;      // Para rastreamento
    path?: string;          // Endpoint que falhou
  };
}
```

### Tratamento de Erros no Frontend

```typescript
// hooks/useErrorHandler.ts
export const useErrorHandler = () => {
  const showToast = useToast();
  
  return useCallback((error: TRPCError) => {
    // Log para monitoramento
    Sentry.captureException(error);
    
    // Mensagem para usuário
    const userMessage = error.message || 'Algo deu errado. Tente novamente.';
    showToast({ type: 'error', message: userMessage });
    
    // Ações específicas por tipo de erro
    switch (error.code) {
      case 'UNAUTHORIZED':
        // Redirecionar para login
        break;
      case 'RATE_LIMITED':
        // Mostrar timer de retry
        break;
      default:
        // Log genérico
        console.error('Unhandled error:', error);
    }
  }, [showToast]);
};
```

### Tratamento de Erros no Backend

```typescript
// server/middleware/errorHandler.ts
export const errorHandler = (error: any, req: any, res: any, next: any) => {
  const requestId = req.headers['x-request-id'] || generateId();
  
  // Log estruturado
  logger.error({
    error: error.message,
    stack: error.stack,
    requestId,
    userId: req.user?.id,
    path: req.path,
    method: req.method,
  });
  
  // Resposta padronizada
  const apiError: ApiError = {
    error: {
      code: error.code || 'INTERNAL_ERROR',
      message: error.userMessage || 'Erro interno do servidor',
      timestamp: new Date().toISOString(),
      requestId,
      path: req.path,
    },
  };
  
  res.status(error.statusCode || 500).json(apiError);
};
```

## Monitoramento

### Stack de Monitoramento

- **Monitoramento de Frontend:** Sentry para frontend + analytics customizado
- **Monitoramento de Backend:** DataDog APM + CloudWatch
- **Rastreamento de Erros:** Sentry unificado
- **Monitoramento de Performance:** Lighthouse CI + Core Web Vitals

### Métricas Principais

**Métricas do Frontend:**
- Core Web Vitals (LCP, FID, CLS)
- Erros de JavaScript e crashes de app
- Tempo de carregamento de telas principais
- Taxa de sucesso de upload de vídeos

**Métricas do Backend:**
- Taxa de requisições e throughput
- Taxa de erro por endpoint
- Latência P95 e P99
- Utilização de CPU e memória

## Resultados do Checklist

*[Este espaço será preenchido após executar o checklist do arquiteto]*