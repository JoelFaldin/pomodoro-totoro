import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
  const { timer, audio } = await request.json()

  try {
    console.log(timer, audio)

    return NextResponse.json({ message: "Timer data saved successfully!" }, { status: 201 })
  } catch (error) {
    console.log(error)

    return NextResponse.json({ error: "There was an error saving the timer data!" }, { status: 500 })
  }

}