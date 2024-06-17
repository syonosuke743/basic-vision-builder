import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

const Image = ({ src }: { src: string }) => (
  <svg>
    <image xlinkHref={src} />
  </svg>
);

const Header = () => {
  const { data: session } = useSession();

  return (
    <header>
      <h1>
        <Link href="/choice-templates">
          テンプレートの選択
        </Link>
      </h1>
      {session && (
        <>
          <Image src={session.user?.image as string} />
          <button onClick={() => signOut()} className="border border-black rounded-lg">Sign out with google</button>
        </>
      )}
    </header>
  )
}

export default Header
