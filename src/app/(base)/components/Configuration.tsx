'use client'

import { SubmitHandler, useForm } from "react-hook-form"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"
import axios from "axios"

import { uploadAudio } from "@/app/libs/supabaseClient"
import { useAudio } from "@/app/hooks/useAudio"
import { useTime } from "@/app/hooks/timeHook"
import Success from "@/app/icons/Success"
import Error from "@/app/icons/Error"
import Save from "@/app/icons/Save"

interface ConfigInterface {
  timer?: string,
  audio?: File
}

interface ConfigurationInterface {
  setShowConfig: React.Dispatch<React.SetStateAction<boolean>>
}

const Configuration: React.FC<ConfigurationInterface> = ({ setShowConfig }) => {
  const { register, formState: { errors }, handleSubmit } = useForm<ConfigInterface>()
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const { setTime } = useTime()
  const { setAudio } = useAudio()

  const saveTimer: SubmitHandler<ConfigInterface> = async (data) => {
    try {
      if (audioFile) {
        setIsLoading(true)
        const loading = toast.loading("Saving timer data...")
        const audioUrl = await uploadAudio(audioFile, session?.user?.email ?? "")
        
        if (audioUrl?.userId) {
          await axios.post("/api/timer", {
            timer: Number(data.timer),
            audio: audioUrl?.publicUrl.toString(),
            userId: audioUrl?.userId
          })

          toast.success("Time and audio saved!", {
            duration: 3000,
            icon: <Success />
          })

          setTime({
            time: Math.floor(Number(data.timer) * 60),
            userTime: Math.floor(Number(data.timer) * 60)
          })

          setAudio(audioUrl?.publicUrl.toString())
  
          toast.dismiss(loading)
          setShowConfig(false)
        } else {
          toast.error("There was a problem in the server, please try again later.", {
            duration: 3000,
            icon: <Error />
          })
        }
      } else {
        const loading = toast.loading("Saving timer data...")

        try {
          const cookie = await axios.get('/api/auth/cookie')

          await axios.post("/api/time", {
            timer: Number(data.timer),
            userId: cookie.data.userId
          })

          toast.success("Time saved!", {
            duration: 3000,
            icon: <Success />
          })

          setTime({
            time: Math.floor(Number(data.timer) * 60),
            userTime: Math.floor(Number(data.timer) * 60)
          })
  
          setShowConfig(false)
        } catch (error) {
          console.log(error)
          toast.error("There was a problem in the server, please try again later.", {
            duration: 3000,
            icon: <Error />
          })
        } finally {
          toast.dismiss(loading)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error("There was an error, try again later.", {
        duration: 3000,
        icon: <Error />
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAudioFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAudioFile(file)
    }
  }

  return (
    <div className="bg-black rounded-lg shadow-md py-5 px-5 mb-5 w-3/12 min-w-[330px]">
      <h2 className="text-2xl">Settings</h2>

      <form onSubmit={handleSubmit(saveTimer)}>
        <section className="flex flex-col mt-2 mb-5">
          <label htmlFor="timer" className="text-sm">Session time</label>
          <input
            id="timer"
            type="text"
            className="appearance-none bg-transparent rounded-sm relative block w-full px-2 py-1 border border-gray-700 text-gray-100"
            placeholder="25"
            {...register("timer", { required: "Please indicate a time. (It is 25 by default)" })}
          />
          {errors.timer && <p className="text-sm my-1 text-red-500">{errors.timer.message}</p>}
        </section>

        <section className="flex flex-col mb-5">
          <label htmlFor="audio" className="text-sm">Alarm Sound</label>
          <input
            type="file"
            id="audio"
            accept="audio/*"
            onChange={event => handleAudioFileChange(event)}
          />
        </section>

        <div className="flex justify-center">
          <button type="submit" disabled={isLoading} className={`w-24 py-2 px-4 flex flex-row gap-x-2 ${isLoading ? "bg-gray-200 text-gray-500 cursor-default" : "bg-gray-500/70 text-white hover:bg-orange-700 cursor-pointer font-semibold"} rounded-lg shadow-md transition-colors duration-200`}>
            <Save />
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default Configuration