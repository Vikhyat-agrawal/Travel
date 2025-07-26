"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { io, type Socket } from "socket.io-client"

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
  joinRoom: (roomId: string) => void
  leaveRoom: (roomId: string) => void
  sendMessage: (roomId: string, message: any) => void
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001", {
      transports: ["websocket"],
    })

    socketInstance.on("connect", () => {
      setIsConnected(true)
      console.log("Connected to socket server")
    })

    socketInstance.on("disconnect", () => {
      setIsConnected(false)
      console.log("Disconnected from socket server")
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  const joinRoom = (roomId: string) => {
    if (socket) {
      socket.emit("join-room", roomId)
    }
  }

  const leaveRoom = (roomId: string) => {
    if (socket) {
      socket.emit("leave-room", roomId)
    }
  }

  const sendMessage = (roomId: string, message: any) => {
    if (socket) {
      socket.emit("send-message", { roomId, message })
    }
  }

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        joinRoom,
        leaveRoom,
        sendMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider")
  }
  return context
}
