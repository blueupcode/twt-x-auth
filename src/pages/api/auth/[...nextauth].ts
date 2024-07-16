import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

interface CustomToken extends JWT {
  id: string;
  username: string;
}

interface CustomSession extends Session {
  user: {
    id: string;
    username: string;
  } & Session["user"];
}

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0", // Required for Twitter OAuth 2.0
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      // Add custom fields to the session object
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      return session;
    },
    async jwt({ token, profile }) {
      if (profile) {
        token.id = profile.data.id;
        token.username = profile.data.username;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to the profile page after successful sign-in
      return baseUrl + "/profile";
    },
  },
});
