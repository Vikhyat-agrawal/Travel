"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  MessageCircle,
  Users,
  Heart,
  Share2,
  ArrowLeft,
  Search,
  Plus,
  MapPin,
  Star,
  Send,
  Camera,
  Globe,
  UserPlus,
  Settings,
  Filter,
  Shuffle,
  MessageSquare,
  Eye,
} from "lucide-react"
import Link from "next/link"

const randomTravelers = [
  {
    id: 1,
    name: "Priya Goel",
    age: 28,
    location: "Delhi , India",
    interests: ["Photography", "Hiking", "Street Food"],
    currentTrip: "Backpacking through Southeast Asia",
    avatar: "/images/Priya.jpg?height=80&width=80",
    isOnline: true,
    bio: "Digital nomad exploring the world one city at a time. Love capturing moments and trying local cuisines!",
    tripsCompleted: 15,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Priyanka Singh",
    age: 32,
    location: "Chandigarh , Punjab",
    interests: ["Art", "Museums", "Wine Tasting"],
    currentTrip: "Art galleries tour in Europe",
    avatar: "/images/priyanka.jpg?height=80&width=80",
    isOnline: false,
    bio: "Art enthusiast and wine lover. Always looking for hidden gems and local art scenes.",
    tripsCompleted: 22,
    rating: 4.9,
  },
  {
    id: 3,
    name: "Maneesh Sharma",
    age: 25,
    location: "Aligarh , Uttar Pradesh",
    interests: ["Adventure", "Rock Climbing", "Camping"],
    currentTrip: "Mountain climbing in Nepal",
    avatar: "/images/maneesh.jpg?height=80&width=80",
    isOnline: true,
    bio: "Adrenaline junkie seeking the next adventure. Love extreme sports and outdoor activities.",
    tripsCompleted: 8,
    rating: 4.7,
  },
]

const travelStories = [
  {
    id: 1,
    author: "Shristi Sharma",
    avatar: "/images/shristi.jpg?height=40&width=40",
    location: "Mathura , Uttar Pradesh",
    timeAgo: "2 hours ago",
    content: "Just witnessed the most beautiful place Mathura! #premmandir#mathura#vrindavan 🌅⛩️",
    image: "/images/mathura.jpg?height=300&width=400",
    likes: 24,
    comments: 8,
    shares: 3,
    tags: ["Mathura", "Temples", "Photography"],
  },
  {
    id: 2,
    author: "Hiya Jain",
    avatar: "/images/hiya.jpg?height=40&width=40",
    location: "Haridwar , Uttarakhand",
    timeAgo: "5 hours ago",
    content: "Visited one of the religious and peaceful place #haridwar#peace#ganga  💙",
    image: "/images/haridwar.jpg?height=300&width=400",
    likes: 42,
    comments: 15,
    shares: 7,
    tags: ["Haridwar", "Islands", "Friends"],
  },
  {
    id: 3,
    author: "Shresth Agrawal",
    avatar: "/images/shrestha.jpg?height=40&width=40",
    location: "Udaipur, Rajasthan",
    timeAgo: "1 day ago",
    content: " Experiencing the pure vibe with the atmosphere and the lakes ....#lakecity#udaipur 🏔️",
    image: "/images/udaipur.jpg?height=300&width=400",
    likes: 67,
    comments: 23,
    shares: 12,
    tags: ["Udaipur", "Hiking", "Adventure"],
  },
]

const chatMessages = [
  {
    id: 1,
    sender: "Saksham",
    message: "Hey! I saw you're interested in photography too!",
    time: "2:30 PM",
    isMe: false,
  },
  {
    id: 2,
    sender: "You",
    message: "Yes! I love capturing travel moments. Where are you traveling next?",
    time: "2:32 PM",
    isMe: true,
  },
  {
    id: 3,
    sender: "Saksham",
    message: "Planning to visit Goa. Want to join?",
    time: "2:35 PM",
    isMe: false,
  },
]

export default function ConnectingPage() {
  const [activeTab, setActiveTab] = useState("discover")
  const [selectedTraveler, setSelectedTraveler] = useState<(typeof randomTravelers)[0] | null>(null)
  const [showChatDialog, setShowChatDialog] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(chatMessages)
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [newPost, setNewPost] = useState({ content: "", location: "", tags: "" })

  const filteredTravelers = randomTravelers.filter(
    (traveler) =>
      traveler.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      traveler.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      traveler.interests.some((interest) => interest.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "You",
          message: message.trim(),
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isMe: true,
        },
      ])
      setMessage("")
    }
  }

  const handleCreatePost = async () => {
    try {
      const res = await fetch("/api/social/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to create post")
      console.log("Post created:", data)
    } catch (error) {
      console.error("Error creating post:", error)
    }
    setShowCreatePost(false)
    setNewPost({ content: "", location: "", tags: "" })
  }

  const connectWithTraveler = async (travelerId: number) => {
    try {
      const res = await fetch("/api/social/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ travelerId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to connect")
      console.log("Connected with traveler:", data)
    } catch (error) {
      console.error("Error connecting with traveler:", error)
    }
  }

  const likeStory = async (storyId: number) => {
    try {
      const res = await fetch("/api/social/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storyId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to like story")
      console.log("Liked story:", data)
    } catch (error) {
      console.error("Error liking story:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-[#0D9488]" />
              <span className="text-lg font-semibold text-gray-900">Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Connecting</h1>
            <Button className="bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Globe className="h-12 w-12 text-[#0D9488]" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Connect with Fellow Travelers</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet random travelers, share your stories, give feedback, and build your travel network. The world is full
            of amazing people waiting to be discovered!
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="discover">Discover People</TabsTrigger>
            <TabsTrigger value="stories">Travel Stories</TabsTrigger>
            <TabsTrigger value="feedback">Give Feedback</TabsTrigger>
            <TabsTrigger value="dashboard" asChild>
              <Link href="/profile-dashboard">My Dashboard</Link>
            </TabsTrigger>
          </TabsList>

          {/* Discover People Tab */}
          <TabsContent value="discover" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search by name, location, or interests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-xl border-gray-200 focus:border-[#0D9488] focus:ring-[#0D9488]"
                />
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                <Shuffle className="mr-2 h-4 w-4" />
                Random Match
              </Button>
              <Button variant="outline" className="rounded-xl bg-transparent">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTravelers.map((traveler) => (
                <Card
                  key={traveler.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden"
                >
                  <CardHeader className="text-center">
                    <div className="relative mx-auto">
                      <Avatar className="h-20 w-20 mx-auto mb-4">
                        <img src={traveler.avatar || "/images/-3.jpg"} alt={traveler.name} className="object-cover" />
                        <AvatarFallback>
                          {traveler.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                          traveler.isOnline ? "bg-green-500" : "bg-gray-400"
                        }`}
                      ></div>
                    </div>
                    <CardTitle className="text-xl">{traveler.name}</CardTitle>
                    <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{traveler.location}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{traveler.rating}</span>
                      <span className="text-sm text-gray-500">({traveler.tripsCompleted} trips)</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{traveler.bio}</p>

                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-2">Current Trip:</p>
                      <Badge className="bg-[#0D9488]/10 text-[#0D9488]">{traveler.currentTrip}</Badge>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-2">Interests:</p>
                      <div className="flex flex-wrap gap-1">
                        {traveler.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedTraveler(traveler)
                          setShowChatDialog(true)
                        }}
                        className="flex-1 bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-lg"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => connectWithTraveler(traveler.id)}
                        className="flex-1 rounded-lg bg-transparent"
                      >
                        <UserPlus className="h-4 w-4 mr-1" />
                        Connect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTravelers.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No travelers found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or use random match</p>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                  <Shuffle className="mr-2 h-4 w-4" />
                  Find Random Travelers
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Travel Stories Tab */}
          <TabsContent value="stories" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Travel Stories</h2>
              <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
                <DialogTrigger asChild>
                  <Button className="bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl">
                    <Plus className="mr-2 h-4 w-4" />
                    Share Story
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Share Your Travel Story</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="content">What's your story?</Label>
                      <Textarea
                        id="content"
                        placeholder="Share your amazing travel experience..."
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="Where are you?"
                        value={newPost.location}
                        onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        placeholder="e.g., Adventure, Food, Culture"
                        value={newPost.tags}
                        onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <Button onClick={handleCreatePost} className="w-full bg-[#0D9488] hover:bg-[#0C837A] text-white">
                      <Camera className="mr-2 h-4 w-4" />
                      Share Story
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-6">
              {travelStories.map((story) => (
                <Card key={story.id} className="border-0 shadow-lg rounded-2xl overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <img src={story.avatar || "/images/haridwar.jpg"} alt={story.author} className="object-cover" />
                        <AvatarFallback>
                          {story.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{story.author}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <MapPin className="h-3 w-3" />
                          <span>{story.location}</span>
                          <span>•</span>
                          <span>{story.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{story.content}</p>
                    {story.image && (
                      <img
                        src={story.image || "/placeholder.svg"}
                        alt="Travel story"
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                    )}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {story.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => likeStory(story.id)}
                          className="text-gray-600 hover:text-red-500"
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          {story.likes}
                        </Button>
                        <Button size="sm" variant="ghost" className="text-gray-600 hover:text-blue-500">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {story.comments}
                        </Button>
                        <Button size="sm" variant="ghost" className="text-gray-600 hover:text-green-500">
                          <Share2 className="h-4 w-4 mr-1" />
                          {story.shares}
                        </Button>
                      </div>
                      <Button size="sm" variant="ghost" className="text-gray-600">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Give Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Give Feedback</h2>
              <p className="text-gray-600">
                Help fellow travelers by sharing your experiences and rating your travel companions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle>Rate Travel Companions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {randomTravelers.slice(0, 2).map((traveler) => (
                      <div key={traveler.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <img
                              src={traveler.avatar || "/placeholder.svg"}
                              alt={traveler.name}
                              className="object-cover"
                            />
                            <AvatarFallback>
                              {traveler.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{traveler.name}</p>
                            <p className="text-sm text-gray-500">Traveled together in {traveler.currentTrip}</p>
                          </div>
                        </div>
                        <Button size="sm" className="bg-[#0D9488] hover:bg-[#0C837A] text-white">
                          Rate
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle>Community Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Backpacking Europe 2024</h4>
                      <p className="text-sm text-gray-600 mb-3">Rate your overall experience with this community</p>
                      <div className="flex items-center space-x-2 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-5 w-5 text-yellow-500 cursor-pointer hover:fill-current" />
                        ))}
                      </div>
                      <Button size="sm" className="w-full bg-[#0D9488] hover:bg-[#0C837A] text-white">
                        Submit Feedback
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      

      {/* Chat Dialog */}
      <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
        <DialogContent className="max-w-md h-[600px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              {selectedTraveler && (
                <>
                  <Avatar className="h-8 w-8">
                    <img
                      src={selectedTraveler.avatar || "/images/traveller.jpg"}
                      alt={selectedTraveler.name}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {selectedTraveler.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{selectedTraveler.name}</span>
                  <div
                    className={`w-3 h-3 rounded-full ${selectedTraveler.isOnline ? "bg-green-500" : "bg-gray-400"}`}
                  ></div>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto space-y-4 p-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.isMe ? "bg-[#0D9488] text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className={`text-xs mt-1 ${msg.isMe ? "text-white/70" : "text-gray-500"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex space-x-2 p-4 border-t">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage} className="bg-[#0D9488] hover:bg-[#0C837A] text-white">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
