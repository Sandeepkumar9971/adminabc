import { NextResponse } from 'next/server';
import { auth as middleware } from '@/app/api/[...nextauth]/auth';

export default middleware(async (req) => {
  const url = req.nextUrl;
  const token = req?.auth?.user;

  console.log("Requested URL Pathname:", url?.pathname);
  console.log("User Token:", token);

  if (token && url.pathname === '/auth/signin'  || url.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url)); 
  }

  if (!token && url.pathname !== '/auth/signin') {
    return NextResponse.redirect(new URL('/auth/signin', req.url)); 
  }
  

  return NextResponse.next();
});

export const config = {
  matcher: ['/auth/signin', '/', '/dashboard/:path*'], 
};
