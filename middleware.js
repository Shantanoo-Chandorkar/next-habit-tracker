export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*'], // Protect everything under /dashboard
};
