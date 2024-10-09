import { NextResponse } from "next/server"
import { randomUUID } from "crypto"

import { prisma } from "@/app/libs/prisma"

export const POST = async (request: Request) => {
  const { timer, audio } = await request.json()

  try {
    await prisma.timer.create({
      data: {
        id: randomUUID(),
        timer,
        audio
      }
    })

    return NextResponse.json({ message: "Timer data saved successfully!" }, { status: 201 })
  } catch (error) {
    console.log(error)

    return NextResponse.json({ error: "There was an error saving the timer data!" }, { status: 500 })
  }

}