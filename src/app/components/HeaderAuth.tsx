'use client'

import { signOut, useSession } from "next-auth/react"
import { toast } from "sonner"
import Link from "next/link"
import axios from "axios"

import { useUser } from "../hooks/userHook"
import Success from "../icons/Success"
import Logout from "../icons/Logout"
import User from "../icons/User"

interface UserInterface {
  username: string,
  email: string
}

interface HeaderInterface {
  userData: UserInterface | null
}

const HeaderAuth: React.FC<HeaderInterface> = ({ userData }) => {
  const { data: session } = useSession()
  const { user, setUser } = useUser()

  const handleSignOut = async () => {
    const loading = toast.loading("Logging in...")
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
    
    toast.dismiss(loading)
  }

  return userData || user ? (
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