'use client'

import { useEffect, useRef, useState } from "react"
import { useSession } from "next-auth/react"

import { useUser } from "@/app/context/UserContext"
import Status from "../../components/Status"
import Settings from "@/app/icons/Settings"

interface TimerInterface {
  showConfig: boolean,
  setShowConfig: React.Dispatch<React.SetStateAction<boolean>>
}

const Timer: React.FC<TimerInterface> = ({ showConfig, setShowConfig }) => {
  const [time, setTime] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isWork, setIsWork] = useState(true)
  const { data: session } = useSession()
  const { user } = useUser()
  
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(prev => prev - 1)
      }, 1000)
    } else if (time === 0) {
      if (audioRef.current) {
        audioRef.current.play()
      }

      setIsRunning(false)
      setIsWork(prev => !prev)
      setTime(isWork ? 5 * 60 : 25 * 60)
    }

    return () => {
      if (interval) clearInterval(interval)
    }

  }, [isRunning, time, isWork])
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const remaining = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    const newSeconds = 25 * 60
    setTime(newSeconds)
    setIsRunning(false)
  }

  const calculateProgress = () => {
    const totalTime = isWork ? 25 * 60 : 5 * 60
    return ((totalTime - time) / totalTime) * 100
  }

  const handleConfig = () => {
    setShowConfig(!showConfig)
  }

  return (
    <div className="bg-black rounded-lg shadow-md mb-8 mt-20 w-3/12 min-w-[330px]">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-8 w-full rounded-t-lg py-4 bg-gradient-to-r from-orange-500 to-orange-700">Pomodoro Timer</h1>
        <div className="text-6xl text-slate-200 font-bold mb-4" aria-live="polite">{formatTime(time)}</div>

        <Status isWork={isWork} />

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
        {session || user ? (
          <>
            <button
            onClick={handleConfig}
            className="w-fit py-2 px-4 mb-5 flex flex-row gap-x-1 bg-gray-500/70 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition-colors duration-200"
            >
              <Settings />
              {showConfig ? "Hide config": "Show config"}
            </button>
          </>
        ) : (
          <></>
        )}
        <audio ref={audioRef} src="/short_alarm.mp3" preload="auto" />
      </div>
    </div>
  )
}

export default Timer
