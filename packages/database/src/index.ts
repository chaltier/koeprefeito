import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export * from "@prisma/client";
export type {
  User,
  Issue,
  Comment,
  Vote,
  Attachment,
  Notification,
  UserRole,
  IssueCategory,
  IssueStatus,
  IssuePriority,
  VoteType,
  AttachmentType,
  NotificationType,
} from "@prisma/client";