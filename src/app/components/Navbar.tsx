import jwt, { JwtPayload } from "jsonwebtoken"
import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"
import Link from "next/link"

import HeaderAuth from "./HeaderAuth"
import About from "../icons/About"
import Home from "../icons/Home"

const JWT_SECRET = process.env.SECRET || ""
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || ""

const Navbar = async () => {
  const cookieStore = cookies()
  const token = cookieStore.get('auth-token')
  const accessToken = cookieStore.get('next-auth.session-token')
  const prodAccessToken = cookieStore.get('__Secure-next-auth.session-token')

  let user = null

  const decodeToken = async (token: string) => {
    const data = await decode({
      token: token,
      secret: NEXTAUTH_SECRET
    })
    
    return { username: data?.name, email: data?.email }
  }

  const checkToken = async () => {
    if (token) {
      const data = jwt.verify(token.value.toString().replace('Bearer ', ''), JWT_SECRET) as JwtPayload
      user = { username: data?.username, email: data?.email }

      return
    } else if (accessToken) {      
      user = await decodeToken(accessToken.value)

      return
    } else if (prodAccessToken) {
      user = await decodeToken(prodAccessToken.value)

      return
    }
  }
  
  await checkToken()
  
  return (
    <header className="absolute left-0 right-0 mx-auto flex flex-col sm:flex-row justify-center items-center gap-x-10 my-4">
      <Link href="/" className="flex flex-row items-center gap-x-1 p-2 hover:rounded hover:bg-slate-600">
        <Home width="24" height="24" />
        Home
      </Link>
      <Link href="/about" className="flex flex-row items-center gap-x-1 p-2 hover:rounded hover:bg-slate-600">
        <About width="24" height="24" />
        About
      </Link>
      <HeaderAuth userData={user} />
    </header>
  )
}

export default Navbar