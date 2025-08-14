import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { env } from "~/env.mjs";
import { prisma } from "@koeprefeito/database";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  // Temporariamente removendo adapter para debug
  // adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Mudando para JWT temporariamente
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub!,
        role: "CITIZEN", // Default role for now
      },
    }),
  },
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  debug: true,
  logger: {
    error(code, metadata) {
      console.error("NextAuth Error:", code, metadata);
    },
    warn(code) {
      console.warn("NextAuth Warning:", code);
    },
    debug(code, metadata) {
      console.log("NextAuth Debug:", code, metadata);
    },
  },
  // Removendo events temporariamente para debug
  // events: {
  //   createUser: async ({ user }) => {
  //     try {
  //       console.log("Creating user with role CITIZEN:", user.id);
  //       await prisma.user.update({
  //         where: { id: user.id },
  //         data: { role: "CITIZEN" },
  //       });
  //       console.log("User role set successfully");
  //     } catch (error) {
  //       console.error("Error setting default role for user:", error);
  //     }
  //   },
  //   signIn: async ({ user, account, profile }) => {
  //     console.log("User signing in:", { userId: user.id, account: account?.provider });
  //     return true;
  //   },
  // },
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};