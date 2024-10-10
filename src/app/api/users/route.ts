import { NextResponse } from 'next/server'
import { prisma } from '@/app/libs/prisma'
import bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'

export const POST = async (request: Request) => {
  const { email, username, password } = await request.json()
  
  try {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    
    const newUser = await prisma.user.create({
      data: {
        id: randomUUID(),
        email,
        name: username,
        password: hashedPassword
      }
    })

    return NextResponse.json(newUser)
  } catch (error) {
    return NextResponse.json(error)
  }
}