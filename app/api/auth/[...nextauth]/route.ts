import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.email === "test@test.com" && credentials.password === "123456") {
          return {
            id: "1",           // id обязательно строка
            name: "Test User",
            email: credentials.email,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt", // строго типизировано
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
