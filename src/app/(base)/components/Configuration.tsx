'use client'

import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import { toast } from "sonner"
import axios from "axios"

import { uploadAudio } from "@/app/libs/supabaseClient"
import Success from "@/app/icons/Success"
import Save from "@/app/icons/Save"

interface ConfigInterface {
  timer?: string,
  audio?: File
}

const Configuration = () => {
  const { register, handleSubmit } = useForm<ConfigInterface>()
  const [audioFile, setAudioFile] = useState<File | null>(null)

  const saveTimer: SubmitHandler<ConfigInterface> = async (data) => {
    const loading = toast.loading("Saving timer data...")

    try {
      if (audioFile) {
        const audioUrl = await uploadAudio(audioFile)
        await axios.post("/api/timer", {
          timer: data.timer,
          audio: audioUrl?.toString()
        })

        toast.success("Time and audio saved!", {
          duration: 3000,
          icon: <Success />
        })

        toast.dismiss(loading)
      } else {
        console.error("No data.audio selected!")
      }
    } catch (error) {
      console.log(error)
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
            {...register("timer")}
          />
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
          <button type="submit" className="w-24 py-2 px-4 flex flex-row gap-x-2 bg-gray-500/70 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition-colors duration-200">
            <Save />
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default Configuration