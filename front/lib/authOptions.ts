import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt"; // JWT 型をインポート
import GoogleProvider from "next-auth/providers/google";

// API URLの環境変数（デフォルト値も設定）
const apiUrl = process.env.NEXT_PUBLIC_API_URL 

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          // リフレッシュトークンを取得するために access_type と prompt を設定
          //access_type: 'offline',
          //prompt: 'consent',
        },
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET, // デプロイ時に必要なシークレットキー
  debug: true, // デバッグモードを有効にする

  callbacks: {
    async signIn({ user, account }) {
      const provider = account?.provider;
      const uid = user?.id;
      const name = user?.name;
      const email = user?.email;
      try {
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
          console.error('Sign-in error: Failed to authenticate with the provider', response.statusText);
          return false;
        }
      } catch (error) {
        //ここでエラーハンドリングして画面遷移
        console.log("エラー", error);
        return false;
      }
    },
    // セッションコールバックでユーザー情報をセッションに含める
    async session({ session, token }: { session: any, token: JWT }) {
      if (token?.sub) {
        session.user.id = token.sub;
        session.accessToken = token.accessToken; // アクセストークンをセッションに含める
      } else {
        console.error("User does not have an id property", token);
      }
      return session;
    }
  },
}
