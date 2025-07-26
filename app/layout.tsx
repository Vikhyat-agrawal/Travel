import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Web3Provider } from "@/components/providers/web3-provider"
import { SocketProvider } from "@/components/providers/socket-provider"
import { GoogleOAuthProvider } from "@react-oauth/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TravelMate - Decentralized Travel Community Platform",
  description: "AI-powered, blockchain-secured travel planning with real-time collaboration",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <Web3Provider>
            <SocketProvider>
              {children}
              <Toaster />
          </SocketProvider>
          </Web3Provider>
        </GoogleOAuthProvider>
      </body>
    </html>
  )
}
