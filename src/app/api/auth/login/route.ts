import { prisma } from "@/app/libs/prisma"
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.SECRET || ""

export const POST = async (request: Request) => {
  const { email, password } = await request.json()

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found, try another email!" }, { status: 404 })
    }

    if (user.password) {
      const passwordComparisson = await bcrypt.compare(password, user.password)
      
      if (!passwordComparisson) {
        return NextResponse.json({ error: "Incorrect password, try again." }, { status: 401 })
      }
    }

    const token = jwt.sign({ userId: user.id, email: user.email, username: user.name }, JWT_SECRET)

    const response = NextResponse.json({ 
      email,
      name: user.name,
    })

    response.cookies.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    })

    return response
  } catch (_error) {
    return NextResponse.json({ error: "Something bad happened, try again later!" }, { status: 500 })
  }
}