import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'
import { NextResponse } from "next/server"

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

    return NextResponse.json({ userId: data.userId })
  }
}