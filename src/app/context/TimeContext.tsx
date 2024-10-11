'use client'

import { createContext, ReactNode, useEffect, useState } from "react"
import axios from "axios"

import { useAudio } from "../hooks/useAudio"
import { useUser } from "../hooks/userHook"

interface Time {
  time: number,
  userTime: number | null
}

interface TimeContextType {
  time: Time,
  setTime: React.Dispatch<React.SetStateAction<Time>>
}

export const TimeContext = createContext<TimeContextType | undefined>(undefined)

export const TimeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [time, setTime] = useState<Time>({
    time: 25 * 60,
    userTime: null
  })
  const { user } = useUser()
  const { setAudio } = useAudio()

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const res = await axios.get("/api/timer")
          const savedTime = Number(res.data.timer)

          if (!isNaN(savedTime)) {
            setTime({
              time: savedTime * 60,
              userTime: savedTime * 60
            })
          }
          setAudio(res.data.audio)
        } catch (error) {
          console.error("There was a problem fetching the data: ", error)
          setTime((prev) => ({
            ...prev,
            time: 25 * 60
          }))
        }
      } else {
        setTime((prev) => ({
          ...prev,
          time: 25 * 60
        }))
      }
    }

    fetchData()
  }, [user, setAudio])

  return (
    <TimeContext.Provider value={{ time, setTime }}>
      {children}
    </TimeContext.Provider>
  )
}