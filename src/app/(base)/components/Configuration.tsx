'use client'

import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import axios from "axios"

import Save from "@/app/icons/Save"

interface ConfigInterface {
  timer?: string,
  audio?: File
}

const Configuration = () => {
  const { register, handleSubmit } = useForm<ConfigInterface>()
  const [audioFile, setAudioFile] = useState<string | null>(null)

  const saveTimer: SubmitHandler<ConfigInterface> = async (data) => {
    try {
      const { data, error } = await supabase
      
      const formData = new FormData()



      const timerData = await axios.post('/api/timer', formData)

      console.log(timerData)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAudioFileChange = (event: React.FormEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setAudioFile(url)
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
            {...register("audio")}
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