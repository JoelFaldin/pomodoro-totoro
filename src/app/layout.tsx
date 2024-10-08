import { ReactNode } from "react"
import { Toaster } from "sonner"
import { UserProvider } from "./context/UserContext"

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <UserProvider>
          <Toaster richColors position="bottom-center" />
          {children}
        </UserProvider>
      </body>
    </html>
  )
}

export default RootLayout