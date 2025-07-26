"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  MapPin,
  Calendar,
  DollarSign,
  Settings,
  Crown,
  TrendingUp,
  MessageCircle,
  ArrowLeft,
  Plus,
  Eye,
} from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from API
const communityData = {
  id: 1,
  name: "Backpacking Pune 2025",
  role: "admin", // or "member"
  members: [
    {
      id: 1,
      name: "Priya Sharma",
      role: "admin",
      avatar: "/images/Priya.jpg?height=40&width=40",
      joined: "2024-01-15",
    },
    { id: 2, name: "Radhika Merchant", role: "member", avatar: "/images/radhika.jpg?height=40&width=40", joined: "2024-01-18" },
    { id: 3, name: "Shresth", role: "member", avatar: "/images/shrestha.jpg?height=40&width=40", joined: "2024-01-20" },
    { id: 4, name: "Peeyush", role: "member", avatar: "/images/peeyush.jpg?height=40&width=40", joined: "2024-01-22" },
  ],
  roadmap: [
    { id: 1, location: "Pune", status: "completed", date: "2025-06-15", cost: 800 },
    { id: 2, location: "Bombay", status: "current", date: "2025-07-20", cost: 600 },
    { id: 3, location: "Delhi", status: "upcoming", date: "2025-10-25", cost: 700 },
    { id: 4, location: "Prayagraj", status: "upcoming", date: "2025-11-30", cost: 500 },
  ],
  wallet: {
    balance: 2400,
    contributions: [
      { member: "Priya Sharma", amount: 800, date: "2025-06-15" },
      { member: "Radhika Merchant", amount: 600, date: "2025-07-20" },
      { member: "Shrestha", amount: 500, date: "2025-10-25" },
      { member: "Peeyush", amount: 500, date: "2025-11-30" },
    ],
  },
  expenses: [
    { id: 1, description: "Flight tickets to Pune", amount: 1200, date: "2025-07-01", approvedBy: "Priya Sharma" },
    { id: 2, description: "Hotel booking - PUne", amount: 800, date: "2025-07-15", approvedBy: "Priya Sharma" },
    { id: 3, description: "Train tickets", amount: 400, date: "2025-07-20", approvedBy: "Priya Sharma" },
  ],
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const isAdmin = communityData.role === "admin"

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/communities" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-[#0D9488]" />
              <span className="text-lg font-semibold text-gray-900">Back to Community</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              <Link href="/profile-dashboard" className="text-white/90 hover:text-white transition">
                My Dashboard
              </Link>  
            </h1>
            <div className="flex items-center space-x-2">
              {isAdmin && <Crown className="h-5 w-5 text-yellow-500" />}
              <span className="text-sm text-gray-600">{isAdmin ? "Admin" : "Member"}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Community Header */}
        <Card className="border-0 shadow-xl rounded-2xl mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl mb-2">{communityData.name}</CardTitle>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    {communityData.members.length} members
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />${communityData.wallet.balance.toLocaleString()} in wallet
                  </div>
                </div>
              </div>
              {isAdmin && (
                <Link href="/analytics">
                  <Button className="bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl">
                    <Settings className="mr-2 h-4 w-4" />
                    Manage Community
                  </Button>
                </Link>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
            <TabsTrigger value="finances">Finances</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-[#0D9488] mx-auto mb-4" />
                  <div className="text-2xl font-bold">{communityData.members.length}</div>
                  <p className="text-gray-600">Total Members</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-6 text-center">
                  <MapPin className="h-8 w-8 text-[#0D9488] mx-auto mb-4" />
                  <div className="text-2xl font-bold">{communityData.roadmap.length}</div>
                  <p className="text-gray-600">Destinations</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 text-[#0D9488] mx-auto mb-4" />
                  <div className="text-2xl font-bold">${communityData.wallet.balance.toLocaleString()}</div>
                  <p className="text-gray-600">Wallet Balance</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-[#0D9488] mx-auto mb-4" />
                  <div className="text-2xl font-bold">75%</div>
                  <p className="text-gray-600">Trip Progress</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">Alakh joined the community</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">Shrestha added Goa to roadmap</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">Radhika contributed ₹600 to wallet</p>
                        <p className="text-xs text-gray-500">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trip Progress */}
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle>Trip Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {communityData.roadmap.map((location) => (
                      <div key={location.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              location.status === "completed"
                                ? "bg-green-500"
                                : location.status === "current"
                                  ? "bg-blue-500"
                                  : "bg-gray-300"
                            }`}
                          ></div>
                          <span className="font-medium">{location.location}</span>
                        </div>
                        <Badge
                          variant={
                            location.status === "completed"
                              ? "default"
                              : location.status === "current"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {location.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Community Members</h2>
              {isAdmin && (
                <Button className="bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl">
                  <Plus className="mr-2 h-4 w-4" />
                  Invite Members
                </Button>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityData.members.map((member) => (
                <Card key={member.id} className="border-0 shadow-lg rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar || "/images/maneesh.jpg"} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{member.name}</h3>
                          {member.role === "admin" && <Crown className="h-4 w-4 text-yellow-500" />}
                        </div>
                        <p className="text-sm text-gray-600">Joined {new Date(member.joined).toLocaleDateString()}</p>
                        <Badge variant="secondary" className="mt-2">
                          {member.role}
                        </Badge>
                      </div>
                    </div>
                    {isAdmin && member.role !== "admin" && (
                      <div className="mt-4 flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <MessageCircle className="mr-1 h-3 w-3" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Settings className="mr-1 h-3 w-3" />
                          Manage
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Travel Roadmap</h2>
              {isAdmin && (
                <Button className="bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Destination
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {communityData.roadmap.map((location, index) => (
                <Card key={location.id} className="border-0 shadow-lg rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0D9488] text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{location.location}</h3>
                          <div className="flex items-center space-x-4 text-gray-600 text-sm">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(location.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />${location.cost}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant={
                            location.status === "completed"
                              ? "default"
                              : location.status === "current"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {location.status}
                        </Badge>
                        {isAdmin && (
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Finances Tab */}
          <TabsContent value="finances" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Wallet Balance */}
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle>Community Wallet</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-[#0D9488] mb-2">
                      ${communityData.wallet.balance.toLocaleString()}
                    </div>
                    <p className="text-gray-600">Available Balance</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Member Contributions</h4>
                    {communityData.wallet.contributions.map((contribution, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{contribution.member}</span>
                        <span className="font-semibold text-[#0D9488]">${contribution.amount}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Expenses */}
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle>Recent Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {communityData.expenses.map((expense) => (
                      <div key={expense.id} className="border-b pb-3 last:border-b-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm">{expense.description}</p>
                            <p className="text-xs text-gray-500">
                              Approved by {expense.approvedBy} • {new Date(expense.date).toLocaleDateString()}
                            </p>
                          </div>
                          <span className="font-semibold text-red-600">-${expense.amount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {isAdmin && (
                    <Button className="w-full mt-4 bg-[#0D9488] hover:bg-[#0C837A] text-white">
                      <Eye className="mr-2 h-4 w-4" />
                      View All Expenses
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
