import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";

import google from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

import type { Provider } from "next-auth/providers";

const prisma = new PrismaClient();

const config = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [google],
  callbacks: {
    session({ session, token }) {
   //adiciona o id do usuário na sessao para ser acessado em qualquer lugar
      if (token.sub) session.user.userId = token.sub;
      return session;
    },
  },
  pages: {
    // Redireciona para a página de login (next.auth/signin) se o usuário não estiver autenticado
    signIn: "/signin",
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
//quando sai do next.auth/signin redireciona para a home
// Definir o tipo do provedor
// providers => google (pagina que eu criei)
interface ProviderWithId {
  id: string;
  name: string;
}

// Mapeando os provedores manualmente
export const providerMap = config.providers.map((provider) => {
  // Retornando um objeto com id e name
  //Da o acesso aos providers que eu criei
  const typedProvider = provider as unknown as ProviderWithId;
  return { id: typedProvider.id, name: typedProvider.name };
});