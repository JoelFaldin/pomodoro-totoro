'use client'

import { useContext } from "react"
import { UserContext } from "../context/UserContext"

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error("This hook can only be used within a UserProvider!")
  }

  return context
}