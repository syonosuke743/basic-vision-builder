"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import styles from '@/styles/Login.module.css'



const Doshboard = () => {
  const { data: session } = useSession();
  const router = useRouter();


  useEffect(() => {
    if (session) {
      // セッションがある場合、choice-templatesにリダイレクト
      router.push('/choice-templates');
    }
  }, [session, router]);



  return (
    <>
    <main className={styles.mainContent}>
      <div className={styles.leftColumn}>
        <h1>ようこそBasicVisionBuilderへ</h1>
        <p>ここではアイデアの発想に有用とされるテンプレートを複数用意しています。</p>
        <p>また、テンプレートだけを印刷して使うこともできます。</p>
      </div>
      <div className={styles.rightColumn}>
        <button onClick={() => signIn("google")} className={styles.signInButton}>
          Sign in with google
        </button>
      </div>
    </main>
  </>
  )
}

export default Doshboard

