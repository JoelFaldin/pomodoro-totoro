'use client'

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useUser } from "../context/UserContext"

import User from "../icons/User"
import Logout from "../icons/Logout"
import axios from "axios"
import { toast } from "sonner"
import Success from "../icons/Success"

const HeaderAuth = () => {
  const { data: session } = useSession()
  const { user, setUser } = useUser()

  const handleSignOut = async () => {
    if (session) {
      await signOut()
    } else {
      await axios.post("/api/auth/logout")
      setUser(null)

      toast.success("Logged out!", {
        duration: 3000,
        icon: <Success />
      })
    }
  }

  return session || user ? (
    <button onClick={handleSignOut} className="flex flex-row items-center gap-x-1 p-2 hover:rounded hover:bg-slate-600">
      <Logout />
      Sign out
    </button>
  ) : (
    <Link href="/login" className="flex flex-row items-center gap-x-1 p-2 hover:rounded hover:bg-slate-600">
      <User width="24" height="24" />
      Log in
    </Link>
  )
}

export default HeaderAuth