import NextAuth from 'next-auth';
import authConfig from '@/app/api/[...nextauth]/option';

export const {auth,handlers, signOut, signIn } = NextAuth(authConfig);