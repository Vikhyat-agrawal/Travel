"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GoogleLogin, CredentialResponse } from "@react-oauth/google"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowRight,
  Users,
  MapPin,
  Star,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  ChevronLeft,
  ChevronRight,
  Play,
  LogIn,
  Plus,
  Sparkles,
} from "lucide-react"

const heroSlides = [
  {
    id: 1,
    image: "/images/1.jpg?height=800&width=1400",
    title: "Plan, Connect, Travel",
    subtitle:
      "Join the world's first decentralized travel platform. Plan trips with AI, connect with communities and pay with crypto.",
    badge: "The Future of Travel Planning",
  },
  {
    id: 2,
    image: "/images/2.jpg?height=800&width=1400",
    title: "AI-Powered Trip Planning",
    subtitle:
      "Let our advanced AI create personalized itineraries based on your preferences, budget, and travel style.",
    badge: "Smart Travel Solutions",
  },
  {
    id: 3,
    image: "/images/-3.jpg?height=800&width=1400",
    title: "Secure Crypto Payments",
    subtitle:
      "Pool funds with your travel community using blockchain technology for transparent and secure transactions.",
    badge: "Web3 Travel Finance",
  },
]

const features = [
  {
    icon: Users,
    title: "Community Travel",
    description: "Join or create travel communities with like-minded adventurers",
    color: "bg-blue-500",
  },
  {
    icon: Zap,
    title: "AI Trip Planner",
    description: "Get personalized itineraries powered by advanced AI technology",
    color: "bg-purple-500",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Pool funds safely with blockchain-powered escrow contracts",
    color: "bg-green-500",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Connect with travelers worldwide and discover hidden gems",
    color: "bg-orange-500",
  },
]

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    avatar: "/images/Priya.jpg?height=60&width=60",
    rating: 5,
    comment: "TravelMate revolutionized how I plan trips. The AI suggestions were spot-on!",
    location: "Mathura,Uttar Pradesh",
  },
  {
    id: 2,
    name: "Radhika Merchant",
    avatar: "/images/radhika.jpg?height=60&width=60",
    rating: 5,
    comment: "Found amazing travel companions through the community feature. Best decision ever!",
    location: "Jaipur,Rajasthan",
  },
  {
    id: 3,
    name: "Yuvraj Jain",
    avatar: "/images/maneesh.jpg?height=60&width=60",
    rating: 5,
    comment: "The crypto payment system made group expenses so much easier to manage.",
    location: "Udaipur,Rajasthan",
  },
]

const stats = [
  { label: "Active Travelers", value: "50K+", icon: Users },
  { label: "Countries Covered", value: "180+", icon: Globe },
  { label: "Trips Planned", value: "25K+", icon: MapPin },
  { label: "Communities", value: "2K+", icon: TrendingUp },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(null)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const { toast } = useToast()

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential
    if (!idToken) {
      console.error("Google login failed: No ID token received")
      toast({ variant: "destructive", title: "Login Failed", description: "Could not get token from Google." })
      return
    }

    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to authenticate with the server.")
      }

      setIsAuthenticated(true)
      setUser({ name: data.user.name, avatar: data.user.avatar })
      setShowAuthDialog(false)
      toast({ title: "Login Successful", description: `Welcome back, ${data.user.name}!` })
    } catch (error: any) {
      console.error("Authentication error:", error)
      toast({ variant: "destructive", title: "Authentication Failed", description: error.message })
    }
  }

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-1">
              <div className="w-14 h-14 flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="TravelMate Logo"
                  className="w-full h-full object-contain"
                  style={{ background: "transparent" }}
                />
              </div>
              <span className="text-white font-bold text-xl">TravelMate</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white/90 hover:text-white transition">
                Home
              </Link>
              <Link href="/trip-planner" className="text-white/90 hover:text-white transition">
                Trip Planner
              </Link>
              <Link href="/communities" className="text-white/90 hover:text-white transition">
                Communities
              </Link>
               <Link href="/donate-trip" className="text-white/90 hover:text-white transition">
                Donate-Trip
              </Link>
              <Link href="/trip-saver" className="text-white/90 hover:text-white transition">
                Trip-Saver
              </Link>
              <Link href="/connecting" className="text-white/90 hover:text-white transition">
                Connect
              </Link>
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-3">
                    <img
                      src={user?.avatar || "/placeholder.svg?height=32&width=32"}
                      alt={user?.name ?? "User"}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium text-white">{user?.name}</span>
                  </div>
                ) : (
                  <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl">
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>{authMode === "login" ? "Welcome Back" : "Join TravelMate"}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex space-x-2">
                          <Button
                            variant={authMode === "login" ? "default" : "outline"}
                            onClick={() => setAuthMode("login")}
                            className="flex-1"
                          >
                            Login
                          </Button>
                          <Button
                            variant={authMode === "signup" ? "default" : "outline"}
                            onClick={() => setAuthMode("signup")}
                            className="flex-1"
                          >
                            Sign Up
                          </Button>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter your email" />
                          </div>
                          <div>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Enter your password" />
                          </div>
                          {authMode === "signup" && (
                            <div>
                              <Label htmlFor="name">Full Name</Label>
                              <Input id="name" placeholder="Enter your full name" />
                            </div>
                          )}
                        </div>

                        <div className="flex justify-center pt-2">
                          <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => {
                              toast({ variant: "destructive", title: "Google Login Failed" })
                            }}
                            width="320px"
                          />
                        </div>

                        <Button className="w-full bg-[#0D9488] hover:bg-[#0C837A] text-white">
                          {authMode === "login" ? "Sign In" : "Create Account"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative h-full flex items-center justify-center text-center text-white px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-6"
                >
                  <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-8">
                    <Plus className="h-4 w-4" />
                    <span className="text-sm font-medium">{slide.badge}</span>
                  </div>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed"
                >
                  {slide.subtitle}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <Link href="/communities">
                    <Button className="bg-[#0D9488] hover:bg-[#0C837A] text-white text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300">
                      Join Community
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index)
                setIsAutoPlaying(false)
              }}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-[#0D9488] to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center text-white"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-white/80" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-[#0D9488]/10 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="h-4 w-4 text-[#0D9488]" />
              <span className="text-sm font-medium text-[#0D9488]">Why Choose TravelMate</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Travel Smarter, Together
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Experience the future of travel planning with our innovative platform that combines AI, blockchain, and
              community-driven experiences.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              What Travelers Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              Join thousands of satisfied travelers who've transformed their journey with TravelMate
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg rounded-2xl h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.comment}"</p>
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                        <AvatarFallback>
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-gray-600 text-sm">{testimonial.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0D9488] to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mb-6"
          >
            Ready to Start Your Journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-white/90 mb-8"
          >
            Join TravelMate today and discover a new way to explore the world with AI-powered planning and blockchain
            security.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/communities">
              <Button className="bg-white text-[#0D9488] hover:bg-gray-100 text-lg px-8 py-4 rounded-2xl font-semibold">
                Join Community
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/trip-planner">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#0D9488] text-lg px-8 py-4 rounded-2xl font-semibold bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                Try AI Planner
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-[#0D9488] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="font-bold text-xl">TravelMate</span>
              </div>
              <p className="text-gray-400">
                The future of travel planning with AI, blockchain, and community-driven experiences.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/communities" className="hover:text-white transition">
                    Communities
                  </Link>
                </li>
                <li>
                  <Link href="/trip-planner" className="hover:text-white transition">
                    AI Planner
                  </Link>
                </li>
                <li>
                  <Link href="/connecting" className="hover:text-white transition">
                    Connect
                  </Link>
                </li>
                <li>
                  <Link href="/wallet" className="hover:text-white transition">
                    Wallet
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="hover:text-white transition">
                    Safety
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TravelMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
