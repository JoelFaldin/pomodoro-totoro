import { ReactNode } from "react"
import { Toaster } from "sonner"

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Toaster richColors position="bottom-center" />
        {children}
      </body>
    </html>
  )
}

export default RootLayout