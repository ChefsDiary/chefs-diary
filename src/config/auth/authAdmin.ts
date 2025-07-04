import NextAuth from "next-auth";
import { encode as defaultEncode } from "next-auth/jwt";
import Credentials, {
  CredentialsConfig,
} from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { prisma } from "@/config/prisma/prisma";
import { getPermissionsByIdUser } from "@/lib/repositories/userRepository";
import { logInAdmin, verifyUser } from "@/lib/services/authService";

import PrismaAdapterAdmin from "../prisma/PrismAdapterAdmin";

const adapter = PrismaAdapterAdmin(prisma);

const credentials: CredentialsConfig = {
  id: "credentials",
  type: "credentials",
  name: "Credentials",
  credentials: {
    email: {},
    password: {},
    persistLogin: {},
  },
  authorize: async (credentials) => {
    const email = credentials.email as string;
    const password = credentials.password as string;
    const persistLogin =
      JSON.parse(credentials.persistLogin as string) ?? false;

    const user = await verifyUser(email, password, true);

    return {
      ...user,
      persistLogin,
    };
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter,
  providers: [Credentials(credentials), Google],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
        token.idUser = user.id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.persistLogin = (user as any).persistLogin;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.permissions = (user as any).permissions;
      }

      return token;
    },

    async session({ session }) {
      const permissions = await getPermissionsByIdUser(session.user.id);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session.user as any).permissions = permissions;
      return session;
    },
  },

  session: {
    strategy: "database",
  },

  cookies: {
    sessionToken: {
      name: process.env.AUTH_ADMIN_COOKIE_NAME,
    },
  },

  jwt: {
    encode: async function (params) {
      const sessionToken = await logInAdmin(params);

      if (typeof sessionToken === "string") {
        return sessionToken;
      }

      return defaultEncode(params);
    },
  },
});
