import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const uploadAudio = async (file: File, email: string) => {
  const cookie = await axios.get('/api/auth/cookie')

  if (cookie.data.message === "ok") {
    const { data, error } = await supabase.storage
      .from("audios_pomodoro")
      .upload(`${cookie.data.userId}/${file.name}`, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      throw new Error("There was an error, try not using special characters on audio name and try again later.")
    }

    const { data: { publicUrl } } = supabase.storage
      .from("audios_pomodoro")
      .getPublicUrl(data?.fullPath)

    return { publicUrl, userId: cookie.data.userId }
  } else {
    try {
      const res = await axios.post("/api/auth/cookie", {
        email
      })

      const { data, error } = await supabase.storage
        .from("audios-pomodoro")
        .upload(`${res.data.userId}/${file.name}`, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (error) {
        throw new Error("There was an error, try not using special characters on audio name and try again later.")
      }

      const { data: { publicUrl } } = supabase.storage
      .from("audios_pomodoro")
      .getPublicUrl(data?.fullPath)

    return { publicUrl, userId: cookie.data.userId }
    } catch (error) {
      throw new Error("There was an error, check supabase bucket.")
    }
  }
}