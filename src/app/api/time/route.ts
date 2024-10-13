import { prisma } from "@/app/libs/prisma"
import { NextResponse } from "next/server"
import { randomUUID } from "crypto"

export const POST = async (request: Request) => {
  const { timer, userId } = await request.json()

  try {
    const searchTimerData = await prisma.timer.findUnique({
      where: {
        userId: userId
      }
    })

    if (!searchTimerData) {
      await prisma.timer.create({
        data: {
          id: randomUUID(),
          timer,
          userId: userId
        }
      })

      return NextResponse.json({ message: "Timer data saved!" }, { status: 201 })
    } else {
      await prisma.timer.update({
        where: {
          userId: userId
        },
        data: {
          timer
        }
      })

      return NextResponse.json({ message: "Timer data updated!" }, {  status: 200})
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "There was an error saving the timer data. Try again later." }, { status: 500 })
  }
}