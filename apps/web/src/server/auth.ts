import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
// import { env } from "~/env.mjs";
// import { prisma } from "@koeprefeito/database";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

// Verificar se as variáveis essenciais existem
console.log("Environment check:", {
  hasSecret: !!process.env.NEXTAUTH_SECRET,
  hasUrl: !!process.env.NEXTAUTH_URL,
  hasGoogleId: !!process.env.GOOGLE_CLIENT_ID,
  hasGoogleSecret: !!process.env.GOOGLE_CLIENT_SECRET,
});

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-testing",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub!,
        role: "CITIZEN",
      },
    }),
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
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