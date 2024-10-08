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
      return NextResponse.json({ error: "User not found" })
    }
    
    const passwordComparisson = await bcrypt.compare(password, user.password)
    
    if (!passwordComparisson) {
      return NextResponse.json({ error: "Wrong credentials, try again." })
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET)

    const response = NextResponse.json({ 
      email,
      name: user.name,
    })

    response.cookies.set({
      name: "auth-token",
      value: token,
      httpOnly: false,
      secure: false,
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    })

    return response
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Something bad happened" })
  }
}