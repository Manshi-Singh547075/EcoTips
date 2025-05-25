import "./globals.css"
import { FloatingActionButton } from "@/components/floating-action-button"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "EcoTips - Sustainability Platform",
  description: "Share and discover daily sustainability tips for a greener future",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <FloatingActionButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
