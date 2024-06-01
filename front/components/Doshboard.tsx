"use client"
import { signIn, useSession } from 'next-auth/react'
import React from 'react'

const Doshboard = () => {

  const { data: session } = useSession();

  return (
    <>
      { session ? (
        <>
        <h1>Welcome back,</h1>
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
