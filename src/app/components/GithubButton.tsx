'use client'

import { signIn, signOut, useSession } from "next-auth/react"

import Github from "../icons/Github"
import { useRouter } from "next/navigation"

const AuthButton = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.refresh()
  }

  return session ? (
    <button onClick={handleLogout} className="w-full">
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