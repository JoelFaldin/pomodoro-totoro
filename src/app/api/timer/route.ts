import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { randomUUID } from "crypto"
import jwt, { JwtPayload } from 'jsonwebtoken'

import { prisma } from "@/app/libs/prisma"

const JWT_SECRET = process.env.SECRET || ""

export const GET = async () => {
  const cookieStore = cookies()
  const token = cookieStore.get("auth-token")

  try {
    if (token) {
      const data = jwt.verify(token.value.toString(), JWT_SECRET) as JwtPayload
      const user = await prisma.user.findUnique({
        where: {
          id: data.userId
        }
      })

      if (!user) {
        return NextResponse.json({ error: "User not found!" }, { status: 200 })
      }

      const timer = await prisma.timer.findUnique({
        where: {
          userId: data.userId
        }
      })

      if (!timer) {
        return NextResponse.json({ error: "No timer data found for this user!" }, { status: 200 })
      }

      return NextResponse.json(timer, { status: 200 })
    } else {
      return NextResponse.json({ message: "No user found!" }, { status: 200 })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "There was an error searching for the user, try again later." }, { status: 500 })
  }
}

export const POST = async (request: Request) => {
  const { timer, audio, userId } = await request.json()

  try {
    const searchTimerData = await prisma.timer.findUnique({
      where: {
        userId
      }
    })

    if (!searchTimerData) {
      await prisma.timer.create({
        data: {
          id: randomUUID(),
          timer,
          audio,
          userId
        }
      })
  
      return NextResponse.json({ message: "Timer data saved successfully!" }, { status: 201 })
    } else {
      await prisma.timer.update({
        where: {
          userId: userId
        },
        data: {
          timer,
          audio
        }
      })

      return NextResponse.json({ message: "Timer data updated!" }, { status: 200 })
    }
  } catch (error) {
    console.log(error)

    return NextResponse.json({ error: "There was an error saving the timer data!" }, { status: 500 })
  }

}