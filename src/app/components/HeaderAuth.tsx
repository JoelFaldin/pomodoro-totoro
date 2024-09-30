'use client'

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import User from "../icons/User"
import Logout from "../icons/Logout"

const HeaderAuth = () => {
  const { data: session } = useSession()
  console.log(session)

  return session ? (
    <button onClick={async () => await signOut()} className="flex flex-row items-center gap-x-1 p-2 hover:rounded hover:bg-slate-600">
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