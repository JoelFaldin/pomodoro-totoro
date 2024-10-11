'use client'

import { useContext } from "react"
import { AudioContext } from "../context/AudioContext"

export const useAudio = () => {
  const context = useContext(AudioContext)

  if (!context) {
    throw new Error("This audio context can only be used indisde its AudioProvider.")
  }

  return context
}