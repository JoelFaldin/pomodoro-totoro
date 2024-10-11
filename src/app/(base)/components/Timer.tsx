'use client'

import { RefObject, useEffect, useState } from "react"

import { useUser } from "@/app/hooks/userHook"
import { useTime } from "@/app/hooks/timeHook"

interface TimerInterface {
  isWork: boolean,
  setIsWork: React.Dispatch<boolean>,
  audioRef: RefObject<HTMLAudioElement>,
}

const Timer: React.FC<TimerInterface> = ({ isWork, setIsWork, audioRef }) => {
  const { user } = useUser()
  const [isRunning, setIsRunning] = useState(false)
  const { time, setTime } = useTime()

  // Timer:
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    if (isRunning && time && time.time > 0) {
      timer = setInterval(() => {
        const prevTime = time.time
        setTime((prev) => ({
          ...prev,
          time: Math.floor(prevTime - 1)
        }))
      }, 1000)
    } else if (time.time <= 0) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        audioRef.current.play()
      }

      if (isWork) {
        setIsWork(false)
        setTime((prev) => ({
          ...prev,
          time: 5 * 60
        }))
      } else {
        setIsWork(true)
        setTime((prev) => ({
          ...prev,
          time: prev.userTime ?? 25 * 60
        }))
      }
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [time, isRunning, audioRef, setIsRunning, setIsWork, isWork, setTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const remaining = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`
  }

  const calculateProgress = () => {
    const totalTime = isWork ? Math.floor((time.userTime ?? 25 * 60)) : 5 * 60
    return ((totalTime - time.time) / totalTime) * 100
  }

  const resetTimer = () => {
    if (time.userTime && user) {
      setTime((prev) => ({
        ...prev,
        time: Number(prev.userTime)
      }))
    } else {
      setTime((prev) => ({
        ...prev,
        time: 25 * 60
      }))
    }
    setIsRunning(false)
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  return (
    <>
      <div className="text-6xl text-slate-200 font-bold mb-4" aria-live="polite">{formatTime(time.time)}</div>

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