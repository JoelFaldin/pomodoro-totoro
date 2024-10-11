'use client'

import { createContext, ReactNode, useState } from "react"

interface AudioContextType {
  audio: string | null,
  setAudio: React.Dispatch<React.SetStateAction<string | null>>
}

export const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [audio, setAudio] = useState<string | null>(null)

  return (
    <AudioContext.Provider value={{ audio, setAudio }}>
      {children}
    </AudioContext.Provider>
  )
}