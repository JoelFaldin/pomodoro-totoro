import { NextResponse } from "next/server"

export const POST = () => {
  const response = NextResponse.json({ message: "Successfully logged out!" })

  response.cookies.set({
    name: "auth-token",
    value: "",
    path: "/",
    maxAge: -1
  })

  return response
}