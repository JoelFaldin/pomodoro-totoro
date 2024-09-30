'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import Google from "../icons/Google"

const AuthButtonGoogle = () => {
  const { data: session } = useSession()
  console.log(session)

  return session ? (
    <button onClick={async () => await signOut()} className="w-full">
      <div className="flex justify-center items-center">
        <Google />
      </div>
    </button>
  ) : (
    <button onClick={async () => await signIn('google', {
        callbackUrl: "/"
      })} className="w-full">
      <div className="flex justify-center items-center">
        <Google />
      </div>
    </button>
  )
}

export default AuthButtonGoogle