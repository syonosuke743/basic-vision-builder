import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import axios from "axios";


const apiUrl = process.env.NEXT_PUBLIC_API_URL
//console.log(apiUrl);
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  callbacks: {
    async signIn({user, account}){
      const provider = account?.provider;
      const uid = user?.id;
      const name = user?.name;
      const email = user?.email;
      //console.log("-------------------------------------------------------")
      //console.log(provider,uid,name,email)
      //console.log("-------------------------------------------------------")
      //fetchで確認してaxiosのエラーかの確認
    try {
      const response = await fetch(`${apiUrl}/auth/${provider}/callback`, {
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
        return false;
      }
      } catch (error) {
          console.log("エラー", error);
            return false;
        }
      /*try {
        const response = await axios.post(
          `${apiUrl}/auth/${provider}/callback`,{
            provider,
            uid,
            name,
            email,
          }
        );
        if (response.status === 200){
          return true;
        }else{
          return false;
        }
      } catch (error) {
        console.log("エラー",error);
        return false;
      }*/
    },
  },
}

