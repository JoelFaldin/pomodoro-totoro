'use client'

import { useContext } from "react"

import { TimeContext } from "../context/TimeContext"

export const useTime = () => {
  const context = useContext(TimeContext)

  if (!context) {
    throw new Error("This hook can only be used within its correct TimeProvider")
  }

  return context
}