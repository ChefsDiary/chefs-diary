import NextAuth from "next-auth";
import { encode as defaultEncode } from "next-auth/jwt";
import Credentials, {
  CredentialsConfig,
} from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { prisma } from "@/config/prisma/prisma";
import { logIn, verifyUser } from "@/lib/services/authService";
import { PrismaAdapter } from "@auth/prisma-adapter";

//TODO: Asi bych m2l ud2lat adaúter pro i pro web. GetSesionAndUser mi bude vracet nějaké blbosti kvůli user
const adapter = PrismaAdapter(prisma);

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

    const user = await verifyUser(email, password);
    //TODO: Nekde bych tu měl do session pridat value z rolí a oprávnění. Pouze por admina
    return {
      ...user,
      persistLogin: persistLogin,
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
      }

      return token;
    },
  },

  session: {
    strategy: "database",
  },

  cookies: {
    sessionToken: {
      name: process.env.AUTH_COOKIE_NAME,
    },
  },

  jwt: {
    encode: async function (params) {
      const sessionToken = await logIn(params);

      if (typeof sessionToken === "string") {
        return sessionToken;
      }

      return defaultEncode(params);
    },
  },
});
