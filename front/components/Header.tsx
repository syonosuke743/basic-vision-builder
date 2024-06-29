"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import styles from '@/styles/Header.module.css'

//image components
const Image = ({ src }: { src: string }) => {
  if (!src) {
    return null;
  }
  return (
    <svg className={styles.image}>
      <image xlinkHref={src}/>
    </svg>
  );
};

const Header = () => {
  const { data: session, status } = useSession();//ここにuidを含める
  const router = useRouter();

  //セッションがなければログイン画面に戻す
  useEffect(() => {
    console.log(session);
    console.log(status);
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <header className={styles.container}>
      <div className={styles.app_title}>Basic vision builder</div>
      {session && (
        <div className={styles.menu}>
          <div className={styles.choice_templates}>
          <Link href="/show-templates">
            あなたが作ったもの
            </Link>
          </div>
          <div className={styles.user_name}>{session.user?.name}さん</div>
          <Image src={session.user?.image as string} />
          <button onClick={() => signOut({ callbackUrl: '/' })} className={styles.signout_button}>Sign out</button>
        </div>
      )}
    </header>
  );
}

export default Header;


