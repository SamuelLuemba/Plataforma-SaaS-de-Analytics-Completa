import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";
import { Role } from "@prisma/client";

// Extensão de tipos (em arquivo separado, mas pode ficar aqui se preferir)
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }
  interface User {
    role: Role;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}

// Secret com fallback seguro para desenvolvimento
const AUTH_SECRET =
  process.env.AUTH_SECRET ||
  process.env.NEXTAUTH_SECRET ||
  "development-secret-do-not-use-in-production";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  secret: AUTH_SECRET,
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    // Agora com tipagem correta, sem any
    async session({ session, user }) {
      // 'user' é do tipo User do NextAuth (que estendemos com role)
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role; // role existe porque estendemos User
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  session: { strategy: "jwt" },
});