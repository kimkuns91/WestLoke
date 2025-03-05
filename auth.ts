import { AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET } from "./config";

import type { Adapter } from "@auth/core/adapters";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import { ZodError } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signInSchema } from "./lib/zod";

export type {
  Account,
  DefaultSession,
  Profile,
  Session,
  User,
} from "@auth/core/types";
// import { saltAndHashPassword } from "@/utils/password";

export const {
  handlers,
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Google({
      clientId: AUTH_GOOGLE_ID,
      clientSecret: AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
        },
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        try {
          const { email, password } =
            await signInSchema.parseAsync(credentials);
          // const hash = saltAndHashPassword(password);
          // // logic to salt and hash password
          // // const pwHash = saltAndHashPassword(password);

          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (!user) {
            throw new Error("User not found.");
          } else {
            const isMatch = bcrypt.compareSync(
              password as string,
              user.hashedPassword as string
            );
            if (!isMatch) {
              throw new Error("Incorrect password.");
            }
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 day
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    // JWT 토큰이 생성되거나 업데이트될 때 호출
    async jwt({ token, user, account }) {
      // 최초 로그인 시에만 user 객체가 전달됨
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.role = user.role; // UserRole 추가
      }

      // OAuth 로그인의 경우 account 정보 추가
      if (account) {
        token.provider = account.provider;
      }

      return token;
    },

    // 클라이언트에 세션이 전달될 때 호출
    async session({ session, token }) {
      if (token && session.user) {
        session.user = {
          id: token.id as string,
          name: token.name || null,
          email: token.email as string,
          image: token.picture || null,
          role: token.role as UserRole,
          provider: token.provider as string,
          emailVerified: null,
          hashedPassword: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }

      return session;
    },

    // OAuth 로그인 시 실행되는 callback
    async signIn({ account, profile }) {
      // Google 로그인의 경우 이메일 인증 확인
      if (account?.provider === "google") {
        return Boolean(profile?.email_verified);
      }

      // Credentials 로그인은 authorize에서 처리
      return true;
    },
  },
});
