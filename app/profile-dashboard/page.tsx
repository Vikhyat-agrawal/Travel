"use client"

import { useState } from "react"
// import Link from "next/link" // Removed Next.js specific Link import
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  User,
  MapPin,
  Star,
  Calendar,
  Camera,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Bell,
  Shield,
  Globe,
  Users,
  MessageCircle,
  Share2,
  Award,
  TrendingUp,
  Plane,
  CheckCircle,
  Lock,
  Instagram,
  Linkedin,
  ExternalLink,
  ArrowLeft,
} from "lucide-react"

// userData is now a const again, as changes will not persist without
// a proper storage solution (like local storage or a database).
const userData = {
  id: "12",
  name: "Shweta Sha",
  username: "@Shwetasha12",
  email: "shweta.sha@example.com",
  avatar: "/images/shweta.jpg?height=120&width=120",
  coverImage: "/images/1.jpg?height=300&width=800",
  bio: "Passionate traveler and community organizer with over 5 years of experience exploring the world. I love connecting with fellow adventurers and creating unforgettable group experiences.",
  location: "Udaipur, CA",
  joinedDate: "March 2023",
  rating: 4.5,
  totalReviews: 24,
  isVerified: true,
  socialLinks: {
    instagram: "https://instagram.com/shweta_travels",
    linkedin: "https://linkedin.com/in/shweta-sha",
    website: "https://shweta-travels.com",
  },
  stats: {
    tripsCompleted: 12,
    totalDistance: 1200,
    countriesVisited: 4,
    communitiesJoined: 8,
    followersCount: 156,
    followingCount: 89,
  },
  preferences: {
    travelStyle: ["Adventure", "Cultural", "Budget"],
    interests: ["Photography", "Food", "History", "Nature"],
    languages: ["English", "Hindi", "Marathi"],
  },
  privacy: {
    profileVisibility: "public",
    showEmail: false,
    showLocation: true,
    allowMessages: true,
  },
  notifications: {
    tripInvites: true,
    communityUpdates: true,
    newFollowers: true,
    messages: true,
    marketing: false,
  },
}

const badges = [
  { id: 1, name: "Travel Explorer", icon: "🗺️", earned: true, description: "Visited 5+ countries" },
  { id: 2, name: "Community Leader", icon: "👑", earned: true, description: "Led 3+ group trips" },
  { id: 3, name: "Adventure Seeker", icon: "🏔️", earned: true, description: "Completed extreme activities" },
  { id: 4, name: "Cultural Ambassador", icon: "�", earned: true, description: "Immersed in local cultures" },
  { id: 5, name: "Budget Master", icon: "💰", earned: true, description: "Saved 50%+ on trips" },
  { id: 6, name: "Photo Storyteller", icon: "📸", earned: true, description: "Shared 100+ travel photos" },
  { id: 7, name: "Solo Traveler", icon: "🎒", earned: true, description: "Completed 5+ solo trips" },
  { id: 8, name: "Group Organizer", icon: "👥", earned: true, description: "Organized 10+ group events" },
  { id: 9, name: "Local Guide", icon: "🧭", earned: true, description: "Guided fellow travelers" },
  { id: 10, name: "Eco Warrior", icon: "🌱", earned: false, description: "Sustainable travel advocate" },
]

const recentTrips = [
  {
    id: 1,
    destination: "Haridwar, India",
    image: "/images/haridwar.jpg?height=200&width=300",
    date: "Dec 2025",
    rating: 5,
    companions: 3,
  },
  {
    id: 2,
    destination: "Delhi, India",
    image: "/images/delhi.jpg?height=200&width=300",
    date: "Nov 2025",
    rating: 5,
    companions: 2,
  },
  {
    id: 3,
    destination: "Pune, India",
    image: "/images/pune.jpg?height=200&width=300",
    date: "Oct 2024",
    rating: 4,
    companions: 5,
  },
]

export default function ProfileDashboard() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [formData, setFormData] = useState(userData) // Initialize with the original userData

  const handleSave = () => {
    // In a real app, you'd send formData to a backend/local storage here
    // For this demo, changes will revert on full refresh unless you implement persistence.
    setIsEditing(false)
    console.log("Saving profile data:", formData)
  }

  const handleCancel = () => {
    setFormData(userData) // Revert to the original userData
    setIsEditing(false)
  }

  const earnedBadges = badges.filter((badge) => badge.earned)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Changed href from "#" to "/" for actual home navigation */}
            <a href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-[#0D9488]" />
              <span className="text-lg font-semibold text-gray-900">Back to Home</span>
            </a>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "outline" : "default"}
                className={isEditing ? "bg-transparent" : "bg-[#0D9488] hover:bg-[#0C837A] text-white"}
              >
                {isEditing ? (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
              {isEditing && (
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header - Restructured for better control */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* The entire profile card content is now within this single Card component */}
          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden mb-8">
            {/* Top colored background area */}
            <div className="h-48 bg-gradient-to-r from-[#0D9488] to-purple-600 relative">
              {isEditing && (
                <Button
                  size="sm"
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md z-30"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Change Cover
                </Button>
              )}
            </div>

            {/* Main profile content area (overlaps gradient and contains all details) */}
            {/* Adjusted -mt-20 to -mt-10 to provide more space from the blue area */}
            <div className="relative px-8 pb-8 -mt-10">
              <div className="flex flex-col md:flex-row items-center md:items-end md:space-x-8">
                {/* Avatar */}
                <div className="relative mb-6 md:mb-0">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <AvatarImage src={formData.avatar || "/placeholder.svg"} alt={formData.name} />
                    <AvatarFallback className="text-2xl bg-gray-300">
                      {formData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#0D9488] hover:bg-[#0C837A] text-white p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                  {formData.isVerified && (
                    <CheckCircle className="absolute top-0 right-0 h-8 w-8 text-blue-500 bg-white rounded-full p-1" />
                  )}
                </div>

                {/* User Info (Name, Username, Bio, Location, Social Links) */}
                <div className="flex-1 pt-4 md:pt-0">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h1 className="text-3xl font-bold text-gray-900">{formData.name}</h1>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          Verified
                        </Badge>
                      </div>
                      <p className="text-lg text-gray-600 mb-2">{formData.username}</p>
                      <div className="flex items-center space-x-4 text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{formData.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Joined {formData.joinedDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>
                            {formData.rating} ({formData.totalReviews} reviews)
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4 max-w-2xl">{formData.bio}</p>
                      {/* Social Links */}
                      <div className="flex items-center space-x-4">
                        <a
                          href={formData.socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <Instagram className="h-5 w-5 text-pink-600" />
                        </a>
                        <a
                          href={formData.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <Linkedin className="h-5 w-5 text-blue-600" />
                        </a>
                        <a
                          href={formData.socialLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <ExternalLink className="h-5 w-5 text-gray-600" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mt-6 md:mt-0">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{formData.stats.followersCount}</div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{formData.stats.followingCount}</div>
                    <div className="text-sm text-gray-600">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{formData.stats.tripsCompleted}</div>
                    <div className="text-sm text-gray-600">Trips</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trips">My Trips</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Added 'items-stretch' to ensure cards in the grid have equal height */}
            <div className="grid lg:grid-cols-3 gap-8 items-stretch">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8 flex flex-col">
                {/* Travel Stats */}
                <Card className="border-0 shadow-lg rounded-2xl flex-1">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-[#0D9488]" />
                      <span>Travel Statistics</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-[#0D9488]/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <Plane className="h-6 w-6 text-[#0D9488]" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{formData.stats.tripsCompleted}</div>
                        <div className="text-sm text-gray-600">Trips</div>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <Globe className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{formData.stats.countriesVisited}</div>
                        <div className="text-sm text-gray-600">Countries</div>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <MapPin className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{formData.stats.totalDistance}K</div>
                        <div className="text-sm text-gray-600">Miles</div>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <Users className="h-6 w-6 text-orange-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{formData.stats.communitiesJoined}</div>
                        <div className="text-sm text-gray-600">Communities</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Recent Trips */}
                <Card className="border-0 shadow-lg rounded-2xl flex-1">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Trips</CardTitle>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Trip
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {recentTrips.map((trip) => (
                        <div key={trip.id} className="relative group cursor-pointer">
                          <div className="aspect-video rounded-xl overflow-hidden">
                            <img
                              src={trip.image || "/placeholder.svg"}
                              alt={trip.destination}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="font-semibold text-lg">{trip.destination}</h3>
                            <div className="flex items-center space-x-2 text-sm">
                              <span>{trip.date}</span>
                              <span>•</span>
                              <div className="flex items-center space-x-1">
                                <Users className="h-3 w-3" />
                                <span>{trip.companions} companions</span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-4 right-4">
                            <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-md rounded-full px-2 py-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-white text-sm">{trip.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Right Column */}
              <div className="space-y-8 flex flex-col">
                {/* Quick Actions */}
                <Card className="border-0 shadow-lg rounded-2xl flex-1">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button className="w-full bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl">
                        <Plus className="h-4 w-4 mr-2" />
                        Plan New Trip
                      </Button>
                      <Button variant="outline" className="w-full rounded-xl bg-transparent">
                        <Users className="h-4 w-4 mr-2" />
                        Find Communities
                      </Button>
                      <Button variant="outline" className="w-full rounded-xl bg-transparent">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Messages
                      </Button>
                      <Button variant="outline" className="w-full rounded-xl bg-transparent">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                {/* Achievement Progress */}
                <Card className="border-0 shadow-lg rounded-2xl flex-1">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-[#0D9488]" />
                      <span>Achievement Progress</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Badges Earned</span>
                          <span className="text-sm text-gray-600">
                            {earnedBadges.length}/{badges.length}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#0D9488] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(earnedBadges.length / badges.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Profile Completion</span>
                          <span className="text-sm text-gray-600">85%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full w-[85%] transition-all duration-300"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          {/* Trips Tab */}
          <TabsContent value="trips" className="space-y-8">
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>My Travel History</CardTitle>
                <Button className="bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Trip
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentTrips.map((trip) => (
                    <Card key={trip.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        <img
                          src={trip.image || "/placeholder.svg"}
                          alt={trip.destination}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
                          {trip.date}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{trip.destination}</h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm">{trip.rating}/5</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <Users className="h-4 w-4" />
                            <span>{trip.companions}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-3">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Edit3 className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-8">
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Achievement Badges</span>
                  <Badge variant="secondary" className="bg-[#0D9488]/10 text-[#0D9488]">
                    {earnedBadges.length}/{badges.length} Earned
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`relative p-6 rounded-2xl border-2 transition-all ${
                        badge.earned
                          ? "border-[#0D9488] bg-[#0D9488]/5 hover:shadow-lg"
                          : "border-gray-200 bg-gray-50 opacity-60"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-3">{badge.icon}</div>
                        <h3 className="font-semibold text-sm mb-2">{badge.name}</h3>
                        <p className="text-xs text-gray-600">{badge.description}</p>
                      </div>
                      {badge.earned ? (
                        <CheckCircle className="absolute -top-2 -right-2 h-6 w-6 text-[#0D9488] bg-white rounded-full" />
                      ) : (
                        <Lock className="absolute -top-2 -right-2 h-6 w-6 text-gray-400 bg-white rounded-full p-1" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Account Settings */}
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-[#0D9488]" />
                    <span>Account Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={formData.email} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="language">Preferred Language</Label>
                    <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Marathi</option>
                      <option>Bhojpuri</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                      <option>Pacific Time (PT)</option>
                      <option>Eastern Time (ET)</option>
                      <option>Central Time (CT)</option>
                      <option>Mountain Time (MT)</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
              {/* Notification Settings */}
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-[#0D9488]" />
                    <span>Notifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(formData.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</div>
                        <div className="text-sm text-gray-600">
                          {key === "tripInvites" && "Get notified when invited to trips"}
                          {key === "communityUpdates" && "Updates from your communities"}
                          {key === "newFollowers" && "When someone follows you"}
                          {key === "messages" && "New direct messages"}
                          {key === "marketing" && "Promotional emails and offers"}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`${value ? "bg-[#0D9488] text-white border-[#0D9488]" : "bg-transparent"} transition-colors`}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            notifications: { ...formData.notifications, [key]: !value },
                          })
                        }
                      >
                        {value ? "On" : "Off"}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Privacy Settings */}
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-[#0D9488]" />
                    <span>Privacy Controls</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Profile Visibility</Label>
                    <select
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      value={formData.privacy.profileVisibility}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          privacy: { ...formData.privacy, profileVisibility: e.target.value },
                        })
                      }
                    >
                      <option value="public">Public</option>
                      <option value="friends">Friends Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                  {Object.entries(formData.privacy)
                    .filter(([key]) => key !== "profileVisibility")
                    .map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</div>
                          <div className="text-sm text-gray-600">
                            {key === "showEmail" && "Display email on profile"}
                            {key === "showLocation" && "Show your location"}
                            {key === "allowMessages" && "Allow direct messages"}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${value ? "bg-[#0D9488] text-white border-[#0D9488]" : "bg-transparent"} transition-colors`}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              privacy: { ...formData.privacy, [key]: !value },
                            })
                          }
                        >
                          {value ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </Button>
                      </div>
                    ))}
                </CardContent>
              </Card>
              {/* Security Settings */}
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-[#0D9488]" />
                    <span>Security</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full rounded-xl bg-transparent">
                    Enable Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full rounded-xl bg-transparent">
                    Download My Data
                  </Button>
                  <Button variant="destructive" className="w-full rounded-xl">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
