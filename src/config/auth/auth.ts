import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

const adapter = PrismaAdapter(prisma);

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter,
  providers: [
    Credentials({
      credentials: {
        userName: {},
        password: {},
        // email: {},
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findFirst({
          where: {
            userName: credentials?.userName,
            password: credentials?.password,
          },
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
    Google,
  ],
});
