import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authOptions } from '../../../../lib/authOptions.js'; // Adjust the path as necessary

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
