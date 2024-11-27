'use client'

import { signIn, signOut, useSession } from "next-auth/react"

import Google from "../icons/Google"
import { useRouter } from "next/navigation"

const AuthButtonGoogle = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.refresh()
  }

  return session ? (
    <button onClick={handleSignOut} className="w-full">
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