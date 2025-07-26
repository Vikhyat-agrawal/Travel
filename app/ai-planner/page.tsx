"use client"

import React, { useEffect, useState } from 'react';
import type { HTMLAttributes } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Brain,
  Clock,
  ArrowLeft,
  Plane,
  Hotel,
  Camera,
  Utensils,
  Zap,
  Map,
  TrendingUp,
  Coins,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface TripPlan {
  destination: string
  duration: string
  budget: string
  travelers: string
  interests: string[]
  itinerary: {
    day: number
    title: string
    activities: string[]
    accommodation: string
    meals: string[]
    estimated_cost: string
    ai_optimizations: string[]
  }[]
  total_estimated_cost: string
  best_time_to_visit: string
  travel_tips: string[]
  ai_insights: {
    cost_savings: string
    time_optimization: string
    hidden_gems: string[]
    weather_forecast: string
  }
  blockchain_integration: {
    estimated_gas_fees: string
    smart_contract_savings: string
    group_payment_benefits: string[]
  }
}

export default function AIPlannerPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null)
  const [formData, setFormData] = useState({
    destination: "",
    duration: "",
    budget: "",
    travelers: "",
    interests: "",
    additional_preferences: "",
    ai_optimization_level: "standard",
    blockchain_integration: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateTripPlan = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate AI generation progress
    const progressSteps = [
      { step: 20, message: "Analyzing destination data..." },
      { step: 40, message: "Optimizing routes with AI..." },
      { step: 60, message: "Finding hidden gems..." },
      { step: 80, message: "Calculating blockchain savings..." },
      { step: 100, message: "Finalizing your perfect trip..." },
    ]

    for (const { step, message } of progressSteps) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setGenerationProgress(step)
    }

    // After simulation, set the mock plan
    const mockPlan: TripPlan = {
      destination: formData.destination || "Delhi, India",
      duration: formData.duration || "7 days",
      budget: formData.budget || "₹999 - ₹99999",
      travelers: formData.travelers || "2 people",
      interests:
        formData.interests?.split(",").map((i) => i.trim()).filter(Boolean) || [
          "Culture",
          "Food",
          "Technology",
        ],
      itinerary: [
        {
          day: 1,
          title: "AI-Optimized Delhi Arrival",
          activities: [
            "Arrive at Indira Gandhi International Airport (AI suggests 2:30 PM for minimal congestion)",
            "AI-optimized cab route to Connaught Place (saves 20 minutes via Ring Road)",
            "Check into AI-recommended hotel with best location-to-cost ratio",
            "Evening stroll at India Gate during golden hour for optimal lighting",
          ],
          accommodation:
            "Hotel near Connaught Place (AI-selected for metro accessibility & comfort)",
          meals: [
            "AI-curated welcome dinner at a hidden Mughlai gem in Old Delhi",
            "Late-night chaat adventure at AI-suggested local favorite near Bengali Market",
          ],
          estimated_cost: "₹6,600–₹9,100",
          ai_optimizations: [
            "Cab route optimized to avoid peak Delhi traffic",
            "Hotel selected for 35% better cost-location rating than tourist hotspots",
            "Dining suggestions filtered by local reviews, hygiene rating, and price",
          ],
        },
        {
          day: 2,
          title: "Heritage Delhi with AI Insights",
          activities: [
            "Morning visit to Humayun's Tomb (AI recommends 8 AM for low crowd density)",
            "AI-guided walking tour of Lodhi Art District with AR historical overlays",
            "Qutub Minar exploration with AI-powered AR facts and crowd prediction",
            "Evening AI-predicted best weather slot for Hauz Khas Lake sunset view",
          ],
          accommodation: "Same hotel",
          meals: [
            "Traditional Delhi breakfast at AI-recommended local dhaba",
            "Lunch in Mehrauli at AI-predicted less busy hours",
            "Dinner in Hauz Khas Village (AI price optimization saved 40%)",
          ],
          estimated_cost: "₹7,500–₹10,800",
          ai_optimizations: [
            "Real-time crowd analysis for monuments",
            "AR walking tour enhances cultural context",
            "Restaurant pricing tracked in real time for best meal value",
          ],
        },
        {
          day: 3,
          title: "Smart Delhi & Tech Exploration",
          activities: [
            "Visit to AI-recommended time slot at Bharat Mandapam (ITPO)",
            "AI-mapped journey to Dilli Haat for artisan shopping with AR translator",
            "Interactive science experience at National Science Centre (entry optimized for group flow)",
            "Evening visit to Select Citywalk, with AI-curated smart retail & digital wallet discounts",
          ],
          accommodation: "Same hotel",
          meals: [
            "Breakfast at hotel",
            "Lunch at Dilli Haat (AI-recommended regional cuisine based on reviews)",
            "Dinner in Saket with digital wallet cashback & AI-discovered rooftop view",
          ],
          estimated_cost: "₹10,000–₹14,000",
          ai_optimizations: [
            "Smart scheduling to avoid school trips at science center",
            "AR-based language assistant for interacting with local artisans",
            "Cashback offers integrated via fintech APIs",
          ],
        },
      ],
      total_estimated_cost:
        "₹1,32,000–₹1,81,000 for 2 people (15% savings with AI optimization)",
      best_time_to_visit:
        "February–April (Spring) - AI weather analysis confirms optimal conditions",
      travel_tips: [
        "AI suggests booking flights 3 weeks early for best rates",
        "Download AI-powered Delhi Metro app with offline navigation",
        "UPI-enabled digital wallet setup recommended for 500+ local vendors",
        "AI crowd prediction app reduces wait times by average 45 minutes daily",
        "Smart contract group payments can save 8–12% on group bookings and hotel stays",
      ],
      ai_insights: {
        cost_savings:
          "AI optimization saved ₹33,000–₹49,000 compared to traditional planning",
        time_optimization:
          "Route optimization saves 3.5 hours of travel time over 7 days",
        hidden_gems: [
          "Secret rooftop café in Connaught Place (AI-discovered, 98% positive reviews)",
          "Underground Mughlai kitchen in Jama Masjid area (AI-analyzed, locals only)",
          "Traditional Kathak performance in a lesser-known Haveli (AI-matched to your interests)",
        ],
        weather_forecast:
          "AI predicts 85% clear days, 15% light showers - pack accordingly",
      },
      blockchain_integration: {
        estimated_gas_fees: "~₹1,200–₹2,000 for all transactions during trip",
        smart_contract_savings:
          "Group payments save 8–12% on accommodations and activities",
        group_payment_benefits: [
          "Transparent fund pooling with smart contracts",
          "Automatic expense splitting and refunds",
          "Crypto cashback at 50+ participating Delhi venues",
          "Decentralized travel insurance integration for domestic travel",
        ],
      },
    };

    setTripPlan(mockPlan);
    setIsGenerating(false);
    setGenerationProgress(0);
  };


  if (tripPlan) {
    return <AIPlanResult plan={tripPlan} onBack={() => setTripPlan(null)} />;
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
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#0D9488] to-purple-600 bg-clip-text text-transparent">
              AI Trip Planner
            </h1>
            <Badge className="bg-purple-100 text-purple-800">Powered by GPT-4</Badge>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <Brain className="h-12 w-12 text-purple-600" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#0D9488] rounded-full animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered Trip Planner</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get personalized travel itineraries with AI optimization, blockchain integration, and real-time cost
              savings. Our advanced AI analyzes millions of data points to create your perfect trip.
            </p>
          </motion.div>
        </div>

        {/* Planning Form */}
        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-1">
            <div className="bg-white rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-center flex items-center justify-center">
                  <Zap className="mr-2 h-6 w-6 text-purple-600" />
                  Plan Your Perfect AI-Optimized Trip
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="destination" className="text-base font-semibold">
                      Destination
                    </Label>
                    <div className="relative mt-2">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="destination"
                        placeholder="e.g., Delhi, India"
                        value={formData.destination}
                        onChange={(e) => handleInputChange("destination", e.target.value)}
                        className="pl-10 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="duration" className="text-base font-semibold">
                      Trip Duration
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("duration", value)}>
                      <SelectTrigger className="mt-2 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3 days">3 days</SelectItem>
                        <SelectItem value="5 days">5 days</SelectItem>
                        <SelectItem value="7 days">1 week</SelectItem>
                        <SelectItem value="10 days">10 days</SelectItem>
                        <SelectItem value="14 days">2 weeks</SelectItem>
                        <SelectItem value="21 days">3 weeks</SelectItem>
                        <SelectItem value="30 days">1 month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="budget" className="text-base font-semibold">
                      Budget Range
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("budget", value)}>
                      <SelectTrigger className="mt-2 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="₹41,500–₹83,000">₹41,500–₹83,000</SelectItem>
                        <SelectItem value="₹83,000–₹1,66,000">₹83,000–₹1,66,000</SelectItem>
                        <SelectItem value="₹1,66,000–₹2,49,000">₹1,66,000–₹2,49,000</SelectItem>
                        <SelectItem value="₹2,49,000–₹4,15,000">₹2,49,000–₹4,15,000</SelectItem>
                        <SelectItem value="₹4,15,000+">₹4,15,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="travelers" className="text-base font-semibold">
                      Number of Travelers
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("travelers", value)}>
                      <SelectTrigger className="mt-2 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500">
                        <SelectValue placeholder="Select travelers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 person">Solo traveler</SelectItem>
                        <SelectItem value="2 people">2 people</SelectItem>
                        <SelectItem value="3-4 people">3-4 people</SelectItem>
                        <SelectItem value="5-6 people">5-6 people</SelectItem>
                        <SelectItem value="7+ people">Large group (7+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="interests" className="text-base font-semibold">
                    Interests & Activities
                  </Label>
                  <Input
                    id="interests"
                    placeholder="e.g., Culture, Food, Adventure, Technology, Art"
                    value={formData.interests}
                    onChange={(e) => handleInputChange("interests", e.target.value)}
                    className="mt-2 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">Separate multiple interests with commas</p>
                </div>

                <div>
                  <Label htmlFor="ai_optimization" className="text-base font-semibold">
                    AI Optimization Level
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("ai_optimization_level", value)}>
                    <SelectTrigger className="mt-2 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500">
                      <SelectValue placeholder="Select optimization level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic - Cost optimization only</SelectItem>
                      <SelectItem value="standard">Standard - Cost + Route optimization</SelectItem>
                      <SelectItem value="advanced">Advanced - Full AI analysis with predictions</SelectItem>
                      <SelectItem value="premium">Premium - AI + Blockchain + Real-time updates</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="blockchain"
                    checked={formData.blockchain_integration}
                    onChange={(e) => handleInputChange("blockchain_integration", e.target.checked)}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <Label htmlFor="blockchain" className="text-base font-semibold flex items-center">
                    <Coins className="mr-2 h-4 w-4 text-purple-600" />
                    Enable Blockchain Integration
                  </Label>
                </div>
                <p className="text-sm text-gray-500 ml-7">
                  Get crypto payment options, smart contract savings, and decentralized travel benefits
                </p>

                <div>
                  <Label htmlFor="preferences" className="text-base font-semibold">
                    Additional Preferences
                  </Label>
                  <Textarea
                    id="preferences"
                    placeholder="Any specific requirements, dietary restrictions, accessibility needs, or special requests..."
                    value={formData.additional_preferences}
                    onChange={(e) => handleInputChange("additional_preferences", e.target.value)}
                    className="mt-2 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500 min-h-[100px]"
                  />
                </div>

                {isGenerating && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Brain className="h-5 w-5 text-purple-600 animate-pulse" />
                      <span className="text-purple-600 font-medium">AI is analyzing your preferences...</span>
                    </div>
                    <Progress value={generationProgress} className="h-3" />
                    <p className="text-center text-sm text-gray-600">
                      {generationProgress < 20 && "Analyzing destination data..."}
                      {generationProgress >= 20 && generationProgress < 40 && "Optimizing routes with AI..."}
                      {generationProgress >= 40 && generationProgress < 60 && "Finding hidden gems..."}
                      {generationProgress >= 60 && generationProgress < 80 && "Calculating blockchain savings..."}
                      {generationProgress >= 80 && "Finalizing your perfect trip..."}
                    </p>
                  </div>
                )}

                <Button
                  onClick={generateTripPlan}
                  disabled={isGenerating || !formData.destination}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl py-4 text-lg font-semibold"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Generating Your AI-Optimized Trip...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-5 w-5" />
                      Generate AI Trip Plan
                    </>
                  )}
                </Button>
              </CardContent>
            </div>
          </div>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg rounded-2xl text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Advanced AI Analysis</h3>
                <p className="text-gray-600 text-sm">
                  GPT-4 powered analysis of millions of travel data points for optimal recommendations
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg rounded-2xl text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#0D9488]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Map className="h-6 w-6 text-[#0D9488]" />
                </div>
                <h3 className="font-semibold mb-2">Real-Time Optimization</h3>
                <p className="text-gray-600 text-sm">
                  Dynamic route and cost optimization based on live data and crowd predictions
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border-0 shadow-lg rounded-2xl text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Blockchain Integration</h3>
                <p className="text-gray-600 text-sm">
                  Smart contract savings, crypto payments, and decentralized travel benefits
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function AIPlanResult({ plan, onBack }: { plan: TripPlan; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={onBack} className="flex items-center space-x-2 text-[#0D9488]">
              <ArrowLeft className="h-5 w-5" />
              <span className="text-lg font-semibold">Back to Planner</span>
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#0D9488] to-purple-600 bg-clip-text text-transparent">
              Your AI-Optimized Trip Plan
            </h1>
            <div className="flex space-x-2">
              <Button className="bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl">Save Plan</Button>
              <Button
                variant="outline"
                className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white rounded-xl bg-transparent"
              >
                Share with Community
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trip Overview */}
        <Card className="border-0 shadow-xl rounded-2xl mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-1">
            <div className="bg-white rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2 flex items-center">
                      <Brain className="mr-3 h-8 w-8 text-purple-600" />
                      {plan.destination}
                    </CardTitle>
                    <div className="flex items-center space-x-6 text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        {plan.duration}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-2" />
                        {plan.budget}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        {plan.travelers}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">AI-Optimized Cost</p>
                    <p className="text-2xl font-bold text-purple-600">{plan.total_estimated_cost}</p>
                    <Badge className="bg-green-100 text-green-800 mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      15% AI Savings
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Zap className="mr-2 h-4 w-4 text-purple-600" />
                      Your Interests
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {plan.interests.map((interest, index) => (
                        <Badge key={index} className="bg-purple-100 text-purple-800">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-[#0D9488]" />
                      Best Time to Visit
                    </h3>
                    <p className="text-gray-700">{plan.best_time_to_visit}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-purple-600" />
                      Blockchain Benefits
                    </h3>
                    <p className="text-gray-700">{plan.blockchain_integration.smart_contract_savings}</p>
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>

        {/* AI Insights */}
        <Card className="border-0 shadow-xl rounded-2xl mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-6 w-6 text-purple-600" />
              AI Insights & Optimizations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold mb-2">Cost Savings</h4>
                <p className="text-sm text-gray-600">{plan.ai_insights.cost_savings}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2">Time Optimization</h4>
                <p className="text-sm text-gray-600">{plan.ai_insights.time_optimization}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Camera className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold mb-2">Hidden Gems</h4>
                <p className="text-sm text-gray-600">{plan.ai_insights.hidden_gems.length} AI-discovered spots</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-yellow-600" />
                </div>
                <h4 className="font-semibold mb-2">Weather Forecast</h4>
                <p className="text-sm text-gray-600">{plan.ai_insights.weather_forecast}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Itinerary */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Map className="mr-2 h-6 w-6 text-[#0D9488]" />
              AI-Optimized Daily Itinerary
            </h2>
            <div className="space-y-6">
              {plan.itinerary.map((day) => (
                <Card key={day.day} className="border-0 shadow-lg rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-[#0D9488] to-purple-600 p-1">
                    <div className="bg-white rounded-2xl">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#0D9488] to-purple-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                            {day.day}
                          </div>
                          {day.title}
                          <Badge className="ml-auto bg-purple-100 text-purple-800">
                            <Brain className="h-3 w-3 mr-1" />
                            AI-Optimized
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center">
                              <Camera className="h-4 w-4 mr-2 text-[#0D9488]" />
                              Activities
                            </h4>
                            <ul className="space-y-1">
                              {day.activities.map((activity, index) => (
                                <li key={index} className="text-gray-700 text-sm flex items-start">
                                  <span className="text-[#0D9488] mr-2">•</span>
                                  {activity}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2 flex items-center">
                              <Hotel className="h-4 w-4 mr-2 text-[#0D9488]" />
                              Accommodation
                            </h4>
                            <p className="text-gray-700 text-sm">{day.accommodation}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2 flex items-center">
                              <Utensils className="h-4 w-4 mr-2 text-[#0D9488]" />
                              Meals
                            </h4>
                            <ul className="space-y-1">
                              {day.meals.map((meal, index) => (
                                <li key={index} className="text-gray-700 text-sm flex items-start">
                                  <span className="text-[#0D9488] mr-2">•</span>
                                  {meal}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2 flex items-center">
                              <Brain className="h-4 w-4 mr-2 text-purple-600" />
                              AI Optimizations
                            </h4>
                            <ul className="space-y-1">
                              {day.ai_optimizations.map((optimization, index) => (
                                <li key={index} className="text-purple-700 text-sm flex items-start">
                                  <span className="text-purple-600 mr-2">✓</span>
                                  {optimization}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex justify-between items-center pt-4 border-t">
                            <span className="text-sm text-gray-600">Estimated daily cost:</span>
                            <Badge className="bg-green-100 text-green-800">{day.estimated_cost}</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Travel Tips */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-purple-600" />
                  AI Travel Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {plan.travel_tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-purple-600 text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className="text-sm text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hidden Gems */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="mr-2 h-5 w-5 text-[#0D9488]" />
                  AI-Discovered Hidden Gems
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {plan.ai_insights.hidden_gems.map((gem, index) => (
                    <div key={index} className="p-3 bg-emerald-50 rounded-lg">
                      <p className="text-sm text-gray-700">{gem}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Benefits */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Coins className="mr-2 h-5 w-5 text-purple-600" />
                  Blockchain Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Estimated Gas Fees</h4>
                  <p className="text-sm text-gray-600">{plan.blockchain_integration.estimated_gas_fees}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Smart Contract Savings</h4>
                  <p className="text-sm text-gray-600">{plan.blockchain_integration.smart_contract_savings}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Group Payment Benefits</h4>
                  <ul className="space-y-1">
                    {plan.blockchain_integration.group_payment_benefits.map((benefit, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl">
                  <Users className="mr-2 h-4 w-4" />
                  Share with Community
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white rounded-xl bg-transparent"
                >
                  <Coins className="mr-2 h-4 w-4" />
                  Create Smart Contract
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white rounded-xl bg-transparent"
                >
                  <Plane className="mr-2 h-4 w-4" />
                  Book with AI Prices
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
