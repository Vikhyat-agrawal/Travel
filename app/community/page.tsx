"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  Calendar,
  Search,
  Plus,
  MessageCircle,
  ArrowLeft,
  Crown,
  User,
  Coins,
  Shield,
  Zap,
  Globe,
  Filter,
  TrendingUp,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { useWeb3 } from "@/components/providers/web3-provider"
import { useSocket } from "@/components/providers/socket-provider"
import { motion } from "framer-motion"

type Community = {
  _id: string
  name: string
  destination: string
  members: number
  maxMembers: number
  pooledFunds: string
  startDate?: string
  admin: string
  description: string
  image?: string
  tags: string[]
  type: string
  verified: boolean
  contractAddress?: string
}

export default function CommunitiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [communities, setCommunities] = useState<Community[]>([])
  const [loading, setLoading] = useState(true)
  const { account, connectWallet, signMessage } = useWeb3()
  const { isConnected } = useSocket()

  // Fetch communities from backend
  useEffect(() => {
    async function fetchCommunities() {
      setLoading(true)
      try {
        const res = await fetch("/api/community/list")
        const data = await res.json()
        setCommunities(data.communities || [])
      } catch {
        setCommunities([])
      }
      setLoading(false)
    }
    fetchCommunities()
  }, [])

  const filteredCommunities = communities.filter(
    (community) =>
      (community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        community.destination.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedType === "all" || community.type === selectedType)
  )

  // Join community with backend call and Web3 signature
  const handleJoinCommunity = async (communityId: string) => {
    if (!account) {
      await connectWallet()
      return
    }
    try {
      const message = `Join community ${communityId} as ${account}`
      const signature = await signMessage(message)
      const res = await fetch(`/api/community/${communityId}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: account, signature }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to join community")
      alert("Successfully joined community!")
    } catch (error) {
      alert("Error joining community")
    }
  }

  // Create community with backend call
  const handleCreateCommunity = async (formData: FormData) => {
    if (!account) {
      await connectWallet()
      return
    }
    const payload: any = {
      name: formData.get("name"),
      destination: formData.get("destination"),
      type: formData.get("type"),
      maxMembers: formData.get("maxMembers"),
      description: formData.get("description"),
      admin: account,
    }
    try {
      const res = await fetch("/api/community/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to create community")
      setCommunities((prev) => [data.community, ...prev])
      setShowCreateDialog(false)
    } catch (error) {
      alert("Error creating community")
    }
  }

  if (selectedCommunity) {
    return <CommunityDetail community={selectedCommunity} onBack={() => setSelectedCommunity(null)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-[#0D9488]" />
              <span className="text-lg font-semibold text-gray-900">Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Decentralized Communities</h1>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
              <span className="text-sm text-gray-600">{isConnected ? "Connected" : "Offline"}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Travel Tribe</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join blockchain-secured communities, pool funds with smart contracts, and plan amazing trips with AI
            assistance.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search communities by destination or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl border-gray-200 focus:border-[#0D9488] focus:ring-[#0D9488]"
            />
          </div>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full md:w-48 rounded-xl border-gray-200 focus:border-[#0D9488] focus:ring-[#0D9488]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Communities</SelectItem>
              <SelectItem value="special">Special Groups</SelectItem>
              <SelectItem value="ai-optimized">AI-Optimized</SelectItem>
              <SelectItem value="blockchain">Blockchain</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl px-6">
                <Plus className="mr-2 h-5 w-5" />
                Create Community
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Community</DialogTitle>
              </DialogHeader>
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault()
                  const form = e.target as HTMLFormElement
                  const formData = new FormData(form)
                  await handleCreateCommunity(formData)
                }}
              >
                <div>
                  <Label htmlFor="name">Community Name</Label>
                  <Input id="name" name="name" placeholder="e.g., Crypto Nomads Asia 2025" required />
                </div>
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input id="destination" name="destination" placeholder="e.g., Gurgaon, Haryana" required />
                </div>
                <div>
                  <Label htmlFor="type">Community Type</Label>
                  <Select name="type" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="special">Special Group</SelectItem>
                      <SelectItem value="ai-optimized">AI-Optimized</SelectItem>
                      <SelectItem value="blockchain">Blockchain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="maxMembers">Max Members</Label>
                  <Select name="maxMembers" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select max members" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50">50 members</SelectItem>
                      <SelectItem value="100">100 members</SelectItem>
                      <SelectItem value="200">200 members</SelectItem>
                      <SelectItem value="500">500 members</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" placeholder="Describe your community..." />
                </div>
                <Button type="submit" className="w-full bg-[#0D9488] hover:bg-[#0C837A] text-white">
                  {account ? "Create Community" : "Connect Wallet First"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Communities Grid */}
        {loading ? (
          <div className="text-center py-12 text-lg text-gray-500">Loading communities...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredCommunities.map((community, index) => (
              <motion.div
                key={community._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                  <div className="relative">
                    <img
                      src={community.image || "/placeholder.svg"}
                      alt={community.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 flex space-x-2">
                      <Badge
                        className={`${
                          community.type === "blockchain"
                            ? "bg-purple-100 text-purple-800"
                            : community.type === "special"
                            ? "bg-pink-100 text-pink-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {community.type === "blockchain" ? (
                          <Coins className="h-3 w-3 mr-1" />
                        ) : community.type === "special" ? (
                          <Shield className="h-3 w-3 mr-1" />
                        ) : (
                          <Zap className="h-3 w-3 mr-1" />
                        )}
                        {community.type}
                      </Badge>
                      {community.verified && (
                        <Badge className="bg-green-100 text-green-800">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-gray-900">
                        {community.members}/{community.maxMembers} members
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl">{community.name}</CardTitle>
                    <div className="flex items-center text-gray-600 space-x-4 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {community.destination}
                      </div>
                      {community.startDate && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {community.startDate}
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-2">{community.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {community.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Coins className="h-4 w-4 mr-1 text-purple-500" />
                          <span className="font-semibold text-purple-600">{community.pooledFunds}</span>
                        </div>
                        <div className="flex items-center">
                          <Crown className="h-4 w-4 mr-1 text-yellow-500" />
                          {community.admin}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCommunity(community)}
                        className="flex-1 rounded-lg bg-transparent"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleJoinCommunity(community._id)}
                        className="flex-1 bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-lg"
                      >
                        {account ? "Join Community" : "Connect Wallet"}
                      </Button>
                    </div>

                    {community.contractAddress && (
                      <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500">Smart Contract:</p>
                        <p className="text-xs font-mono text-gray-700">
                          {community.contractAddress.slice(0, 10)}...{community.contractAddress.slice(-8)}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filteredCommunities.length === 0 && (
          <div className="text-center py-12">
            <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No communities found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or create a new community</p>
            <Button
              onClick={() => setShowCreateDialog(true)}
              className="bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl"
            >
              Create Your Community
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function CommunityDetail({ community, onBack }: { community: Community; onBack: () => void }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: community.admin,
      message: "Welcome everyone! Our smart contract is now live and ready for contributions!",
      time: "2:30 PM",
      isAdmin: true,
    },
  ])
  const { sendMessage: socketSendMessage, joinRoom } = useSocket()
  const { account } = useWeb3()

  useEffect(() => {
    joinRoom(`community-${community._id}`)
  }, [community._id, joinRoom])

  const sendMessage = () => {
    if (message.trim() && account) {
      const newMessage = {
        id: messages.length + 1,
        user: "You",
        message: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isAdmin: false,
      }
      setMessages([...messages, newMessage])
      socketSendMessage(`community-${community._id}`, newMessage)
      setMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={onBack} className="flex items-center space-x-2 text-[#0D9488]">
              <ArrowLeft className="h-5 w-5" />
              <span className="text-lg font-semibold">Back to Communities</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">{community.name}</h1>
            <Link href="/dashboard">
              <Button className="bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Community Info */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg rounded-2xl mb-6">
              <CardHeader>
                <img
                  src={community.image || "/placeholder.svg"}
                  alt={community.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <CardTitle className="text-2xl">{community.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Crown className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-600">Admin: {community.admin}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Members</span>
                    <Badge>
                      {community.members}/{community.maxMembers}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Pooled Funds</span>
                    <div className="flex items-center space-x-1">
                      <Coins className="h-4 w-4 text-purple-500" />
                      <span className="font-semibold text-purple-600">{community.pooledFunds}</span>
                    </div>
                  </div>
                  {community.startDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Start Date</span>
                      <span className="font-semibold">{community.startDate}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Destination</span>
                    <span className="font-semibold">{community.destination}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-gray-600 text-sm">{community.description}</p>
                </div>

                {community.contractAddress && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Smart Contract</h4>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs font-mono text-gray-700 break-all">{community.contractAddress}</p>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {community.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-[#0D9488] hover:bg-[#0C837A] text-white">
                  <Coins className="mr-2 h-4 w-4" />
                  Contribute to Pool
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white rounded-xl bg-transparent"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  AI Trip Optimizer
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white rounded-xl bg-transparent"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  View Contract
                </Button>
              </CardContent>
            </Card>

            {/* Analytics & Charts Section */}
            <Card className="border-0 shadow-lg rounded-2xl mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-[#0D9488]" />
                  Community Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Fund Flow Chart */}
                  <div>
                    <h4 className="font-semibold text-sm mb-3">Fund Pool Growth</h4>
                    <div className="h-32 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4 relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 w-full h-full flex items-end space-x-1">
                        {[20, 35, 45, 60, 75, 85, 95].map((height, index) => (
                          <div
                            key={index}
                            className="bg-[#0D9488] rounded-t flex-1 transition-all duration-1000 ease-out"
                            style={{ height: `${height}%` }}
                          ></div>
                        ))}
                      </div>
                      <div className="relative z-10 text-right">
                        <p className="text-2xl font-bold text-[#0D9488]">{community.pooledFunds}</p>
                        <p className="text-xs text-gray-600">Total Pooled</p>
                      </div>
                    </div>
                  </div>

                  {/* Member Activity */}
                  <div>
                    <h4 className="font-semibold text-sm mb-3">Member Activity (7 days)</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Messages</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
                          </div>
                          <span className="text-xs font-medium">156</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Contributions</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="w-1/2 h-full bg-green-500 rounded-full"></div>
                          </div>
                          <span className="text-xs font-medium">8</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Votes</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="w-2/3 h-full bg-purple-500 rounded-full"></div>
                          </div>
                          <span className="text-xs font-medium">23</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expense Breakdown */}
                  <div>
                    <h4 className="font-semibold text-sm mb-3">Planned Expenses</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-xs">Accommodation</span>
                        <span className="text-xs font-medium text-[#0D9488]">45%</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-xs">Transportation</span>
                        <span className="text-xs font-medium text-blue-600">30%</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-xs">Activities</span>
                        <span className="text-xs font-medium text-purple-600">25%</span>
                      </div>
                    </div>
                  </div>

                  <Button size="sm" className="w-full bg-[#0D9488] hover:bg-[#0C837A] text-white">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Detailed Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Section */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg rounded-2xl h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Real-time Community Chat
                  <Badge className="ml-2 bg-green-100 text-green-800">Live</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {msg.isAdmin ? <Crown className="h-4 w-4" /> : <User className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-sm">{msg.user}</span>
                          {msg.isAdmin && <Crown className="h-3 w-3 text-yellow-500" />}
                          <span className="text-xs text-gray-500">{msg.time}</span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder={account ? "Type your message..." : "Connect wallet to chat"}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    disabled={!account}
                    className="flex-1 rounded-xl"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!account}
                    className="bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl"
                  >
                    Send
                  </Button>
                </div>
                {!account && (
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Connect your Web3 wallet to participate in chat
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}