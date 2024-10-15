import { NextAuthConfig } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { userinsert,userauth } from "@/clients/query/user";



const authConfig = {
  providers: [
    CredentialProvider({
      credentials: {
        email: {
          type: "email",
        },
        password: {
          type: "password",
        },
      },
      async authorize(credentials) {
      console.log(credentials);
       const userdata = await userauth({email:credentials.email as string,password:credentials.password as string})    

       if(userdata){
        const user = {
          id:userdata.id as string,
          email: userdata.email as string,
          role: userdata.role as string,
          name: userdata.name as string,
        };
        return user;
       }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
    
      if (token) {
        session.user.id = token?.id?.toString();
        session.user.email = token?.email?.toString();
        
      }

      return session;
    },
    async jwt({ token, user }: any) {
  
      if (user) {
        token.id = user?.id?.toString();
        token.email = user?.email?.toString();
        token.name = user?.name?.toString();
        token.role = user?.role?.toString();
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_SECRET,
} satisfies NextAuthConfig;

export default authConfig;
