'use client'

import { RefObject, useEffect, useState } from "react"
import axios from "axios"

import { useUser } from "@/app/hooks/userHook"

interface TimerInterface {
  isWork: boolean,
  setIsWork: React.Dispatch<boolean>,
  audioRef: RefObject<HTMLAudioElement>,
}

const Timer: React.FC<TimerInterface> = ({ isWork, setIsWork, audioRef }) => {
  const { user } = useUser()
  const [time, setTime] = useState(25 * 60)
  const [userTime, setUserTime] = useState<number | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const res = await axios.get("/api/timer")
          const savedTime = Number(res.data.timer)

          if (!isNaN(savedTime)) {
            setTime(savedTime * 60)
            setUserTime(savedTime * 60)
          }
        } catch (error) {
          console.error("There was a problem fetching the data: ", error)
          setTime(25 * 60)
        }
      } else {
        setTime(25 * 60)
      }
    }

    fetchData()
  }, [user])

  // Timer:
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime(prev => prev - 1)
      }, 1000)
    } else if (time === 0) {
      if (audioRef.current) {
        audioRef.current.play()
      }

      if (isWork) {
        setIsWork(false)
        setTime(0.2 * 60)
      } else {
        setIsWork(true)
        setTime(userTime ?? 25 * 60)
      }
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [time, isRunning, audioRef, setIsRunning, setIsWork, isWork])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const remaining = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`
  }

  const calculateProgress = () => {
    const totalTime = isWork ? (userTime ?? 25 * 60) : 0.2 * 60
    return ((totalTime - time) / totalTime) * 100
  }

  const resetTimer = () => {
    if (userTime && user) {
      setTime(userTime)
    } else {
      setTime(25 * 60)
    }
    setIsRunning(false)
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  return (
    <>
      <div className="text-6xl text-slate-200 font-bold mb-4" aria-live="polite">{formatTime(time)}</div>

      <div className="w-3/4 bg-gray-200 rounded-full h-2 my-5">
        <div
          className="bg-orange-500 h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>

      <div className="flex space-x-4 py-5">
        <button
          onClick={toggleTimer}
          className="w-24 py-2 px-4 bg-gray-500/70 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition-colors duration-200"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="w-24 py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-colors"
        >
          Reset
        </button>

      </div>
    </>
  )
}

export default Timer