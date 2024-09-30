'use client'

import { SessionProvider } from "next-auth/react"

interface ProviderInterface {
  children: React.ReactNode
}

const Provider = ({ children }: ProviderInterface) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default Provider