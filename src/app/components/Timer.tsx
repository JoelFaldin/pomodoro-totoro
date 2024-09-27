'use client'

import { useEffect, useState } from "react"

const Timer = () => {
  const [time, setTime] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev - 1)
      }, 1000)
    }
    console.log(time)

    return () => {
      if (interval) clearInterval(interval)
    }

  }, [isRunning, time])
  
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

  return (
    <div className="bg-black rounded-lg shadow-md p-6 mb-8 w-2/5">
      <h2 className="text-2xl font-semibold text-gray-200 mb-2">Pomodoro Timer</h2>
      <p className="text-gray-300 mb-4">Use this timer to track your Pomodoro sessions</p>
      <div className="flex flex-col items-center">
        <div className="text-6xl font-bold mb-4" aria-live="polite">{formatTime(time)}</div>
        <div className="flex space-x-4">
          <button
            onClick={toggleTimer}
            className="w-24 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors"
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetTimer}
            className="w-24 py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default Timer
