'use client'

import { useEffect, useState } from "react"

const Timer = () => {
  const [time, setTime] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isWork, setIsWork] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(prev => prev - 1)
      }, 1000)
    } else if (time === 0) {
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

  return (
    <div className="bg-black rounded-lg shadow-md mb-8 w-3/12">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-8 w-full rounded-t-lg py-4 bg-gradient-to-r from-orange-500 to-orange-700">Pomodoro Timer</h1>
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
            className="w-24 py-2 px-4 bg-gray-500/70 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75 transition-colors duration-200"
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
      </div>
    </div>
  )
}

export default Timer
