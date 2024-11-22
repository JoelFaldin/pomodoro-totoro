'use client'

import axios from 'axios';
import React, { createContext, ReactNode, useEffect, useState } from 'react'

interface User {
  email: string;
  username: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUserData = async () => {
      const data = await axios.get("/api/auth/check")
      
      if (data.data.message === 'ok') {
        const authUser = {
          email: data.data.email,
          username: data.data.username
        }
        setUser(authUser)
      }
    }
    getUserData()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}