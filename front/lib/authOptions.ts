import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import axios from "axios";


//const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//console.log(apiUrl);
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  callbacks: {
    async signIn({ user, account}){
      const provider = account?.provider;
      const uid = user?.id;
      const name = user?.name;
      const email = user?.email;
    try {
      //console.log(apiUrl);
      const response = await fetch(`http://nginx/auth/${provider}/callback`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      provider,
      uid,
      name,
      email,
      })
      });
      if (response.ok) {
        return true;
      } else {
        console.error('Sign-in error: Failed to authenticate with the provider');
        return false;
      }
      } catch (error) {
          console.log("エラー", error);
          return false;
        }
    },
    async session({ session, token }) {
      // ユーザーオブジェクトに id プロパティがあるか確認
      if (token?.sub) {
        session.user.id = token.sub;
      } else {
        console.error("User does not have an id property");
      } 
      return session;
    },
  },
}

