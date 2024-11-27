import { NextResponse } from "next/server"
import { prisma } from "@/app/libs/prisma"
import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.SECRET || ""
interface JWTPayload {
  userId: number,
  email: string,
  username: string
}

export const GET = () => {
  const cookieStore = cookies()
  const token = cookieStore.get("auth-token")
  if (token) {
    const data = jwt.verify(token.value.toString(), JWT_SECRET) as JWTPayload
    return NextResponse.json({ message: "ok", userId: data.userId })
  } else {
    return NextResponse.json({ message: "No user token found" })
  }
}

// This route is used by the supabase client to save data into the database!
export const POST = async (request: Request) => {
  const { email } = await request.json()
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!user) {
      return NextResponse.json({ error: "No user found, thats weird. Try again later." }, { status: 404 })
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET)
    const response = NextResponse.json({ message: "User found!", userId: user.id }, { status: 200 })
    response.cookies.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    })
    return response
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Something weird has happened, try again later." }, { status: 500 })
  }
}