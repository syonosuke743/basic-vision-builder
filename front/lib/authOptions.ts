import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt"; // JWT 型をインポート
import GoogleProvider from "next-auth/providers/google";

// API URLの環境変数（デフォルト値も設定）
const apiauthUrl = process.env.NEXT_PUBLIC_API_URL 

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
        const response = await fetch(`${apiauthUrl}/auth/${provider}/callback`, {
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
        console.log("エラー", error);
        return false;
      }
    },

    // JWTコールバックでアクセストークンのリフレッシュ処理を追加
    async jwt({ token, account }: { token: JWT, account?: any }) {
      // 初回ログイン時にアクセストークンを保存
      if (account) {
        token.accessToken = account.access_token;
        token.accessTokenExpires = Date.now() + (account.expires_in * 1000 || 0); // 有効期限を計算
        token.refreshToken = account.refresh_token; // リフレッシュトークンを保存
      }

      // アクセストークンの有効期限が存在し、かつ`number`型であることを確認
      if (typeof token.accessTokenExpires === 'number' && Date.now() > token.accessTokenExpires) {
        token = await refreshAccessToken(token);
      }

      return token;
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

  // セッションの有効期限を設定
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30日間の有効期限
  },
};

// アクセストークンをリフレッシュする関数
async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const url = `https://oauth2.googleapis.com/token`;//これはgoogleに送るURLだから変えない。
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID as string,
        client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken as string, // refreshTokenを使ってアクセストークンを更新
      }),
    });

    const refreshedTokens = await response.json();
    if (!response.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000, // 新しい有効期限を設定
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // 新しいリフレッシュトークンがあればそれを使用
    };
  } catch (error) {
    console.error("Failed to refresh access token", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}


