import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const uploadAudio = async (file: File, email: string) => {
  const cookie = await axios.get('/api/auth/cookie')

  if (cookie.data.message === "ok") {
    const { data: files, error: listError } = await supabase.storage
      .from("audios_pomodoro")
      .list(cookie.data.userId)

    if (listError) {
      throw new Error("Error checking audio existence on supabase.")
    }

    if (files.length > 0) {
      const filePaths = files.map(file => `${cookie.data.userId}/${file.name}`);
      const { error: deleteError } = await supabase.storage
        .from("audios_pomodoro")
        .remove(filePaths)

      if (deleteError) {
        throw new Error("There was a server problem, try again later D:")
      }
    }

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
      .getPublicUrl(data?.path)

    return { publicUrl, userId: cookie.data.userId }
  } else {
    try {
      const { data: files, error: listError } = await supabase.storage
        .from("audios_pomodoro")
        .list(cookie.data.userId)

      if (listError) {
        throw new Error("Error checking audio existence on supabase.")
      }

      if (files.length > 0) {
        const filePaths = files.map(file => `${cookie.data.userId}/${file.name}`);
        const { error: deleteError } = await supabase.storage
          .from("audios_pomodoro")
          .remove(filePaths)

        if (deleteError) {
          throw new Error("There was a server problem, try again later D:")
        }
      }

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
      .getPublicUrl(data?.path)

    return { publicUrl, userId: cookie.data.userId }
    } catch (error) {
      console.log(error)
      throw new Error("There was an error, check supabase bucket.")
    }
  }
}