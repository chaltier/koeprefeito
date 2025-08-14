export const APP_CONFIG = {
  NAME: "KoePrefeito",
  VERSION: "1.0.0",
  DESCRIPTION: "Plataforma de comunicação entre cidadãos e prefeitura",
} as const;

export const API_ROUTES = {
  AUTH: "/api/auth",
  ISSUES: "/api/issues",
  COMMENTS: "/api/comments",
  USERS: "/api/users",
} as const;

export const ISSUE_CATEGORIES = {
  INFRASTRUCTURE: "Infraestrutura",
  HEALTH: "Saúde",
  EDUCATION: "Educação",
  SECURITY: "Segurança",
  ENVIRONMENT: "Meio Ambiente",
  TRANSPORT: "Transporte",
  OTHER: "Outros",
} as const;

export const ISSUE_STATUSES = {
  OPEN: "Aberto",
  IN_PROGRESS: "Em Andamento",
  RESOLVED: "Resolvido",
  CLOSED: "Fechado",
} as const;

export const ISSUE_PRIORITIES = {
  LOW: "Baixa",
  MEDIUM: "Média",
  HIGH: "Alta",
  URGENT: "Urgente",
} as const;

export const USER_ROLES = {
  CITIZEN: "Cidadão",
  ADMIN: "Administrador",
  MODERATOR: "Moderador",
} as const;