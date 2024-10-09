import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const uploadAudio = async (file: File) => {
  const cookie = await axios.get('/api/auth/cookie')

  if (cookie) {
    
    const { data, error } = await supabase.storage
      .from("audios_pomodoro")
      .upload(`${cookie.data.userId}/${file.name}`, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      return NextResponse.json({ error: "There was an error, try not using special characters on audio name and try again later." }, { status: 400 })
    }

    const { data: { publicUrl } } = supabase.storage
      .from("audios_pomodoro")
      .getPublicUrl(data?.fullPath)

    return publicUrl
  }
}