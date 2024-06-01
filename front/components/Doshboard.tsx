"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

const Image = ({ src }: { src: string }) => (
  <svg>
    <image xlinkHref={src} />
  </svg>
);

const Doshboard = () => {

  const { data: session } = useSession();

  return (
    <>
      { session ? (
        <>
        <Image src={session.user?.image as string} />
        <h1>Welcome back, {session.user?.name}</h1>
        <p>{session.user?.email}</p>
        <button onClick={() => signOut()} className="border border-black rounded-lg">Sign out with google</button>
        </>
      ):(
        <>
        <h1>You're not logged in</h1>
        <button onClick={() => signIn("google")} className="border border-black rounded-lg">Sign in with google</button>
        </>
      )}
    </>
  )
}

export default Doshboard
