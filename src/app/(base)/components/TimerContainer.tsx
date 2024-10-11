'use client'

import { useRef, useState } from "react"
import { useSession } from "next-auth/react"

import { useAudio } from "@/app/hooks/useAudio"
import { useUser } from "@/app/hooks/userHook"
import Status from "@/app/components/Status"
import Settings from "@/app/icons/Settings"
import Timer from "./Timer"

interface TimerContainerInterface {
  showConfig: boolean,
  setShowConfig: React.Dispatch<React.SetStateAction<boolean>>,
}

const TimerContainer: React.FC<TimerContainerInterface> = ({ showConfig, setShowConfig }) => {
  const [isWork, setIsWork] = useState(true)
  const { data: session } = useSession()
  const { user } = useUser()
  const { audio } = useAudio()
  
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleConfig = () => {
    setShowConfig(!showConfig)
  }

  return (
    <div className="bg-black rounded-lg shadow-md mb-8 mt-20 w-3/12 min-w-[330px]">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-8 w-full rounded-t-lg py-4 bg-gradient-to-r from-orange-500 to-orange-700">Pomodoro Timer</h1>
        <Timer isWork={isWork} setIsWork={setIsWork} audioRef={audioRef} />
        <Status isWork={isWork} />
        
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
        <audio ref={audioRef} src={audio ?? "/short_alarm.mp3"} preload="auto" />
      </div>
    </div>
  )
}

export default TimerContainer
