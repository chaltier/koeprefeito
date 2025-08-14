import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
  role: z.enum(["CITIZEN", "ADMIN", "MODERATOR"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const IssueSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  category: z.enum([
    "INFRASTRUCTURE",
    "HEALTH",
    "EDUCATION", 
    "SECURITY",
    "ENVIRONMENT",
    "TRANSPORT",
    "OTHER"
  ]),
  status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string(),
  }),
  authorId: z.string(),
  assignedToId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CommentSchema = z.object({
  id: z.string(),
  content: z.string().min(1).max(1000),
  issueId: z.string(),
  authorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;
export type Issue = z.infer<typeof IssueSchema>;
export type Comment = z.infer<typeof CommentSchema>;

export type UserRole = User["role"];
export type IssueStatus = Issue["status"];
export type IssueCategory = Issue["category"];
export type IssuePriority = Issue["priority"];