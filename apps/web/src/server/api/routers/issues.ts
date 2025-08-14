import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { prisma } from "@koeprefeito/database";
import { IssueCategory, IssueStatus, IssuePriority } from "@koeprefeito/database";

export const issuesRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        category: z.nativeEnum(IssueCategory).optional(),
        status: z.nativeEnum(IssueStatus).optional(),
      })
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 20;
      const { cursor } = input;

      const issues = await prisma.issue.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          ...(input.category && { category: input.category }),
          ...(input.status && { status: input.status }),
        },
        include: {
          author: {
            select: {
              name: true,
              image: true,
            },
          },
          assignedTo: {
            select: {
              name: true,
              image: true,
            },
          },
          _count: {
            select: {
              comments: true,
              votes: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (issues.length > limit) {
        const nextItem = issues.pop();
        nextCursor = nextItem!.id;
      }

      return issues;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const issue = await prisma.issue.findUnique({
        where: { id: input.id },
        include: {
          author: {
            select: {
              name: true,
              image: true,
              role: true,
            },
          },
          assignedTo: {
            select: {
              name: true,
              image: true,
              role: true,
            },
          },
          comments: {
            include: {
              author: {
                select: {
                  name: true,
                  image: true,
                  role: true,
                },
              },
            },
            orderBy: {
              createdAt: "asc",
            },
          },
          votes: {
            include: {
              user: {
                select: {
                  id: true,
                },
              },
            },
          },
          attachments: true,
        },
      });

      if (!issue) {
        throw new Error("Issue not found");
      }

      return issue;
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(200),
        description: z.string().min(1).max(2000),
        category: z.nativeEnum(IssueCategory),
        priority: z.nativeEnum(IssuePriority).default(IssuePriority.MEDIUM),
        latitude: z.number(),
        longitude: z.number(),
        address: z.string(),
        images: z.array(z.string()).default([]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const issue = await prisma.issue.create({
        data: {
          ...input,
          authorId: ctx.session.user.id,
        },
        include: {
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });

      return issue;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).max(200).optional(),
        description: z.string().min(1).max(2000).optional(),
        category: z.nativeEnum(IssueCategory).optional(),
        priority: z.nativeEnum(IssuePriority).optional(),
        status: z.nativeEnum(IssueStatus).optional(),
        assignedToId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, ...updateData } = input;

      // Verificar se o usuário tem permissão para atualizar
      const existingIssue = await prisma.issue.findUnique({
        where: { id },
        select: { authorId: true },
      });

      if (!existingIssue) {
        throw new Error("Issue not found");
      }

      const user = await prisma.user.findUnique({
        where: { id: ctx.session.user.id },
        select: { role: true },
      });

      // Apenas o autor ou usuários ADMIN/MODERATOR podem atualizar
      if (
        existingIssue.authorId !== ctx.session.user.id &&
        user?.role !== "ADMIN" &&
        user?.role !== "MODERATOR"
      ) {
        throw new Error("Unauthorized");
      }

      const issue = await prisma.issue.update({
        where: { id },
        data: updateData,
        include: {
          author: {
            select: {
              name: true,
              image: true,
            },
          },
          assignedTo: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });

      return issue;
    }),

  addComment: protectedProcedure
    .input(
      z.object({
        issueId: z.string(),
        content: z.string().min(1).max(1000),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await prisma.user.findUnique({
        where: { id: ctx.session.user.id },
        select: { role: true },
      });

      const comment = await prisma.comment.create({
        data: {
          content: input.content,
          issueId: input.issueId,
          authorId: ctx.session.user.id,
          isOfficial: user?.role === "ADMIN" || user?.role === "MODERATOR",
        },
        include: {
          author: {
            select: {
              name: true,
              image: true,
              role: true,
            },
          },
        },
      });

      return comment;
    }),

  vote: protectedProcedure
    .input(
      z.object({
        issueId: z.string(),
        type: z.enum(["UP", "DOWN"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Verificar se já existe um voto do usuário para esta issue
      const existingVote = await prisma.vote.findUnique({
        where: {
          userId_issueId: {
            userId: ctx.session.user.id,
            issueId: input.issueId,
          },
        },
      });

      if (existingVote) {
        // Se o voto é o mesmo, remover o voto
        if (existingVote.type === input.type) {
          await prisma.vote.delete({
            where: {
              userId_issueId: {
                userId: ctx.session.user.id,
                issueId: input.issueId,
              },
            },
          });
          return { action: "removed" };
        } else {
          // Se o voto é diferente, atualizar
          await prisma.vote.update({
            where: {
              userId_issueId: {
                userId: ctx.session.user.id,
                issueId: input.issueId,
              },
            },
            data: {
              type: input.type,
            },
          });
          return { action: "updated" };
        }
      } else {
        // Criar novo voto
        await prisma.vote.create({
          data: {
            type: input.type,
            userId: ctx.session.user.id,
            issueId: input.issueId,
          },
        });
        return { action: "created" };
      }
    }),

  getMyIssues: protectedProcedure.query(async ({ ctx }) => {
    const issues = await prisma.issue.findMany({
      where: {
        authorId: ctx.session.user.id,
      },
      include: {
        _count: {
          select: {
            comments: true,
            votes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return issues;
  }),
});