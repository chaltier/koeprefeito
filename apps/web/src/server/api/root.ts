import { createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "~/server/api/routers/auth";
import { issuesRouter } from "~/server/api/routers/issues";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  issues: issuesRouter,
});

export type AppRouter = typeof appRouter;