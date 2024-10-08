'use client'

import { signIn, signOut, useSession } from "next-auth/react"

import Github from "../icons/Github"

const AuthButton = () => {
  const { data: session } = useSession()

  return session ? (
    <button onClick={async () => await signOut()} className="w-full">
      <div className="flex justify-center items-center">
        <Github />
      </div>
    </button>
  ) : (
    <button onClick={async () => await signIn('github', {
        callbackUrl: "/"
      })} className="w-full">
      <div className="flex justify-center items-center">
        <Github />
      </div>
    </button>
  )
}

export default AuthButton