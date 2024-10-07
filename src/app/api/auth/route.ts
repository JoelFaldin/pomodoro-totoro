import { prisma } from "@/app/libs/prisma"
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.SECRET || ""

export const POST = async (request: Request) => {
  const { email, password } = await request.json()

  try {
    // Search for the user in the database:
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    // If the user is not found, return an error to the client:
    if (!user) {
      return NextResponse.json({ error: "User not found" })
    }
    
    // If the user exists, compare provided password to hashed password:
    const passwordComparisson = await bcrypt.compare(password, user.password)
    
    if (!passwordComparisson) {
      return NextResponse.json({ error: "Wrong credentials, try again." })
    }

    // Sign jwt token:
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET)

    return NextResponse.json({
      email,
      name: user.name,
      token
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Something bad happened" })
  }
}