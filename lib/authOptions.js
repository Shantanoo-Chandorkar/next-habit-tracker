import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword, getUserByEmail } from './auth';
import connectDB from '../config/databse';
import User from '../models/User';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectDB();
          const user = await getUserByEmail(credentials.email);
          if (!user) throw new Error('No user found with this email.');

          const isValid = await verifyPassword(credentials.password, user.password);
          if (!isValid) throw new Error('Invalid password.');

          return {
            id: user._id.toString(),
            name: user.username,
            email: user.email,
          };
        } catch (err) {
          console.error('Authorize error:', err);
          throw new Error('Failed to authorize user.');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
