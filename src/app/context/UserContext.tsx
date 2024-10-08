'use client'

import axios from 'axios';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface User {
  email: string;
  username: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUserData = async () => {
      const data = await axios.get("/api/auth/check")
      
      if (data.status === 200) {
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

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error("This hook can only be used within a UserProvider!")
  }

  return context
}