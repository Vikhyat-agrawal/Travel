"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Star,
  MapPin,
  Users,
  MessageCircle,
  Share2,
  UserPlus,
  Instagram,
  Linkedin,
  Mail,
  Lock,
  CheckCircle,
  Camera,
  Plane,
  Globe,
  Heart,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const badges = [
  { id: 1, name: "Travel Explorer", icon: "🗺️", earned: true, description: "Visited 5+ countries" },
  { id: 2, name: "Community Leader", icon: "👑", earned: true, description: "Led 3+ group trips" },
  { id: 3, name: "Adventure Seeker", icon: "🏔️", earned: true, description: "Completed extreme activities" },
  { id: 4, name: "Cultural Ambassador", icon: "🎭", earned: true, description: "Immersed in local cultures" },
  { id: 5, name: "Budget Master", icon: "💰", earned: true, description: "Saved 50%+ on trips" },
  { id: 6, name: "Photo Storyteller", icon: "📸", earned: true, description: "Shared 100+ travel photos" },
  { id: 7, name: "Solo Traveler", icon: "🎒", earned: true, description: "Completed 5+ solo trips" },
  { id: 8, name: "Group Organizer", icon: "👥", earned: true, description: "Organized 10+ group events" },
  { id: 9, name: "Local Guide", icon: "🧭", earned: true, description: "Guided fellow travelers" },
  { id: 10, name: "Eco Warrior", icon: "🌱", earned: false, description: "Sustainable travel advocate" },
]

const recentTrips = [
  { id: 1, location: "Pune, Hyderabad", image: "/images/pune.jpg?height=200&width=300", date: "Dec 2025" },
  { id: 2, location: "Haridwar, Uttarakhand", image: "/images/haridwar.jpg?height=200&width=300", date: "Nov 2025" },
  { id: 3, location: "Delhi, India", image: "/images/delhi.jpg?height=200&width=300", date: "Oct 2025" },
  { id: 4, location: "Kerala, India", image: "/images/kerala.jpg?height=200&width=300", date: "Sep 2025" },
]

const reviews = [
  {
    id: 1,
    reviewer: "Priya Sharma",
    avatar: "/images/Priya.jpg?height=40&width=40",
    rating: 5,
    comment: "Selena was an amazing travel companion! Very organized and fun to be around.",
    date: "2 weeks ago",
  },
  {
    id: 2,
    reviewer: "Radhika Merchant",
    avatar: "/images/radhika.jpg?height=40&width=40",
    rating: 5,
    comment: "Great local knowledge and helped make our trip unforgettable!",
    date: "1 month ago",
  },
  {
    id: 3,
    reviewer: "David jha",
    avatar: "/images/peeyush.jpg?height=40&width=40",
    rating: 4,
    comment: "Reliable and trustworthy. Would definitely travel with again.",
    date: "2 months ago",
  },
]

export default function ProfilePage({ params }: { params: { userId: string } }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [showAllBadges, setShowAllBadges] = useState(false)

  const earnedBadges = badges.filter((badge) => badge.earned)
  const displayedBadges = showAllBadges ? badges : badges.slice(0, 8)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/connecting" className="flex items-center space-x-2 text-gray-600 hover:text-[#0D9488]">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Connecting</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share Profile
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-[#0D9488] to-purple-600 p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <AvatarImage src="/images/shweta.jpg?height=128&width=128" alt="Shweta sha" />
                    <AvatarFallback className="text-2xl bg-gray-300">SS</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left text-white">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">Shweta sha</h1>
                      <p className="text-white/80 text-lg mb-2">@Username12</p>
                      <div className="flex items-center justify-center md:justify-start space-x-1 mb-4">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="text-lg font-semibold">4.5</span>
                        <span className="text-white/80">(24 reviews)</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => setIsFollowing(!isFollowing)}
                        className={`${
                          isFollowing
                            ? "bg-white/20 text-white border-white/30"
                            : "bg-white text-[#0D9488] hover:bg-gray-100"
                        } border rounded-xl px-6`}
                        variant={isFollowing ? "outline" : "default"}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        {isFollowing ? "Following" : "Follow"}
                      </Button>
                      <Button
                        className="bg-white/20 text-white border-white/30 hover:bg-white/30 rounded-xl px-6"
                        variant="outline"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center md:justify-start space-x-6">
                    <a href="#" className="text-white/80 hover:text-white transition">
                      <Linkedin className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-white/80 hover:text-white transition">
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-white/80 hover:text-white transition">
                      <Mail className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">About</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Passionate traveler and community organizer with over 5 years of experience exploring the world. I
                    love connecting with fellow adventurers and creating unforgettable group experiences. From
                    backpacking through South Asia to luxury North tours, I've done it all and love sharing my
                    knowledge with others. Always looking for the next great adventure!
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Badges Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Badges</h2>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-[#0D9488]">{earnedBadges.length}</span>
                      <span className="text-gray-500">/ {badges.length}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAllBadges(!showAllBadges)}
                        className="text-[#0D9488] hover:text-[#0C837A]"
                      >
                        {showAllBadges ? "View Less" : "View All"}
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {displayedBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className={`relative p-4 rounded-2xl border-2 transition-all ${
                          badge.earned ? "border-[#0D9488] bg-[#0D9488]/5" : "border-gray-200 bg-gray-50 opacity-60"
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-2">{badge.icon}</div>
                          <h3 className="font-semibold text-sm mb-1">{badge.name}</h3>
                          <p className="text-xs text-gray-500">{badge.description}</p>
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
            </motion.div>

            {/* Recent Trips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Recent Trips</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {recentTrips.map((trip) => (
                      <div key={trip.id} className="relative group cursor-pointer">
                        <div className="aspect-video rounded-xl overflow-hidden">
                          <img
                            src={trip.image || "/placeholder.svg"}
                            alt={trip.location}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="font-semibold">{trip.location}</h3>
                          <p className="text-sm text-white/80">{trip.date}</p>
                        </div>
                        <Camera className="absolute top-4 right-4 h-6 w-6 text-white/80" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reviews Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Reviews</h2>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="flex space-x-4">
                        <Avatar>
                          <AvatarImage src={review.avatar || "/images/shristi.jpg"} alt={review.reviewer} />
                          <AvatarFallback>
                            {review.reviewer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{review.reviewer}</h4>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Travel Stats */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Travel Stats</h2>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-[#0D9488]/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <Plane className="h-8 w-8 text-[#0D9488]" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900">12</div>
                      <p className="text-gray-600">Trips Completed</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <Globe className="h-8 w-8 text-purple-600" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900">1200</div>
                      <p className="text-gray-600">Miles Traveled</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <MapPin className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900">4</div>
                      <p className="text-gray-600">States Visited</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
                  <div className="space-y-3">
                    <Button className="w-full bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white rounded-xl bg-transparent"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Invite to Trip
                    </Button>
                    <Button variant="outline" className="w-full rounded-xl bg-transparent">
                      <Heart className="h-4 w-4 mr-2" />
                      Add to Favorites
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
