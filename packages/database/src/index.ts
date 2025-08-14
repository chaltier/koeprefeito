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
} from "@prisma/client";

// Export enums as values (not types) so they can be used with z.nativeEnum()
export {
  UserRole,
  IssueCategory,
  IssueStatus,
  IssuePriority,
  VoteType,
  AttachmentType,
  NotificationType,
} from "@prisma/client";