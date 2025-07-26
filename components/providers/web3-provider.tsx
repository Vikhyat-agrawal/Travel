"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { ethers } from "ethers"

interface Web3ContextType {
  account: string | null
  provider: ethers.BrowserProvider | null
  signer: ethers.JsonRpcSigner | null
  balance: string
  isConnecting: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  sendTransaction: (to: string, amount: string) => Promise<string>
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<string | null>(null)
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null)
  const [balance, setBalance] = useState("0")
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        setIsConnecting(true)
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await provider.send("eth_requestAccounts", [])
        const signer = await provider.getSigner()
        const balance = await provider.getBalance(accounts[0])

        setProvider(provider)
        setSigner(signer)
        setAccount(accounts[0])
        setBalance(ethers.formatEther(balance))
      } catch (error) {
        console.error("Failed to connect wallet:", error)
      } finally {
        setIsConnecting(false)
      }
    } else {
      alert("Please install MetaMask!")
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setProvider(null)
    setSigner(null)
    setBalance("0")
  }

  const sendTransaction = async (to: string, amount: string): Promise<string> => {
    if (!signer) throw new Error("Wallet not connected")

    const tx = await signer.sendTransaction({
      to,
      value: ethers.parseEther(amount),
    })

    return tx.hash
  }

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else {
          setAccount(accounts[0])
        }
      })
    }
  }, [])

  return (
    <Web3Context.Provider
      value={{
        account,
        provider,
        signer,
        balance,
        isConnecting,
        connectWallet,
        disconnectWallet,
        sendTransaction,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  const context = useContext(Web3Context)
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3Provider")
  }
  return context
}
