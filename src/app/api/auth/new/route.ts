import { NextResponse } from "next/server"
import { randomUUID } from "crypto"

import { prisma } from "@/app/libs/prisma"

export const POST = async (request: Request) => {
  const { user } = await request.json()

  try {
    const searchUser = await prisma.user.findUnique({
      where: {
        email: user.email
      }
    })

    if (searchUser) {
      return NextResponse.json({ message: "User already exists on the database." }, { status: 200 })
    }

    const newUser = await prisma.user.create({
      data: {
        id: randomUUID(),
        email: user.email,
        name: user.name
      }
    })

    return NextResponse.json(newUser)
  } catch (error) {
    return NextResponse.json(error)
  }
}