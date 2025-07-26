"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Users, MapPin, Calendar, ArrowLeft, Gift, Star, CheckCircle } from "lucide-react"
import Link from "next/link"

const donationCampaigns = [
  {
    id: 1,
    title: "Dreams of Hyderabad - Orphanage Trip",
    description: "Help 15 children from Sunshine Orphanage experience the magic of Hyderabad for the first time.",
    beneficiary: "Sunshine Orphanage",
    location: "Local Community",
    target: 8000,
    raised: 5200,
    donors: 42,
    daysLeft: 18,
    image: "/images/pune.jpg?height=200&width=300",
    category: "Orphans",
    verified: true,
  },
  {
    id: 2,
    title: "Healing Journey to Udaipur",
    description: "Support therapeutic trip to Udaipur for her recovery journey.",
    beneficiary: "Maria Sharma",
    location: "Udaipur",
    target: 3500,
    raised: 2100,
    donors: 28,
    daysLeft: 25,
    image: "/images/udaipur.jpg?height=200&width=300",
    category: "Medical",
    verified: true,
  },
  {
    id: 3,
    title: "Adventure Camp for Special Needs",
    description: "Enable 20 special needs individuals to experience an adventure camp in Colorado.",
    beneficiary: "Hope Foundation",
    location: "Noida, India",
    target: 12000,
    raised: 8500,
    donors: 67,
    daysLeft: 12,
    image: "/images/noida.jpg?height=200&width=300",
    category: "Special Needs",
    verified: true,
  },
]

const recentDonations = [
  { id: 1, donor: "Anonymous", amount: 100, campaign: "Dreams of Hyderabad", time: "2 hours ago" },
  { id: 2, donor: "Sarah khan.", amount: 50, campaign: "Healing Journey", time: "4 hours ago" },
  { id: 3, donor: "Mihir", amount: 200, campaign: "Adventure Camp", time: "6 hours ago" },
  { id: 4, donor: "Arjun", amount: 75, campaign: "Dreams of Pune", time: "8 hours ago" },
]

export default function DonateTripPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<(typeof donationCampaigns)[0] | null>(null)
  const [showDonateDialog, setShowDonateDialog] = useState(false)
  const [donationAmount, setDonationAmount] = useState("")

  const handleDonate = (formData: FormData) => {
    const donationData = Object.fromEntries(formData)
    console.log("Processing donation:", donationData)
    // In real app: POST /api/donate/trip
    setShowDonateDialog(false)
    setSelectedCampaign(null)
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
            <h1 className="text-2xl font-bold text-gray-900">Donate a Trip</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-12 w-12 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Give the Gift of Travel</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help make dreams come true by supporting travel experiences for orphans, special individuals, and those in
            need. Every donation creates unforgettable memories.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="border-0 shadow-lg rounded-2xl text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-[#0D9488] mb-2">156</div>
              <p className="text-gray-600">Lives Impacted</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg rounded-2xl text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-[#0D9488] mb-2">₹47K</div>
              <p className="text-gray-600">Total Raised</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg rounded-2xl text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-[#0D9488] mb-2">23</div>
              <p className="text-gray-600">Trips Funded</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg rounded-2xl text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-[#0D9488] mb-2">89%</div>
              <p className="text-gray-600">Success Rate</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Donation Campaigns */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Campaigns</h2>
            <div className="space-y-6">
              {donationCampaigns.map((campaign) => {
                const progress = (campaign.raised / campaign.target) * 100
                return (
                  <Card
                    key={campaign.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={campaign.image || "/placeholder.svg"}
                          alt={campaign.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className="bg-[#0D9488]/10 text-[#0D9488]">{campaign.category}</Badge>
                              {campaign.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
                            <p className="text-gray-600 text-sm mb-3">{campaign.description}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>₹{campaign.raised.toLocaleString()} raised</span>
                            <span>Goal: ₹{campaign.target.toLocaleString()}</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center">
                                <Users className="h-4 w-4 mr-1 text-gray-400" />
                                {campaign.donors} donors
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                                {campaign.daysLeft} days left
                              </span>
                            </div>
                            <Button
                              onClick={() => {
                                setSelectedCampaign(campaign)
                                setShowDonateDialog(true)
                              }}
                              className="bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl"
                            >
                              <Heart className="mr-2 h-4 w-4" />
                              Donate
                            </Button>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>Beneficiary: {campaign.beneficiary}</span>
                            <span className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {campaign.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Donations */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="mr-2 h-5 w-5" />
                  Recent Donations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDonations.map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{donation.donor}</p>
                        <p className="text-xs text-gray-500">{donation.campaign}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#0D9488]">₹{donation.amount}</p>
                        <p className="text-xs text-gray-500">{donation.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#0D9488] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Choose a Campaign</h4>
                      <p className="text-xs text-gray-600">
                        Browse verified campaigns and select one that resonates with you
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#0D9488] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Make a Donation</h4>
                      <p className="text-xs text-gray-600">Contribute any amount securely through our platform</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#0D9488] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Track Impact</h4>
                      <p className="text-xs text-gray-600">
                        Receive updates on how your donation is making a difference
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust & Safety */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2 h-5 w-5 text-yellow-500" />
                  Trust & Safety
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">All campaigns verified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Secure payment processing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">100% transparency</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Regular impact reports</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Donation Dialog */}
      <Dialog open={showDonateDialog} onOpenChange={setShowDonateDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Make a Donation</DialogTitle>
          </DialogHeader>
          {selectedCampaign && (
            <form action={handleDonate} className="space-y-4">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold">{selectedCampaign.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{selectedCampaign.beneficiary}</p>
              </div>

              <div>
                <Label htmlFor="amount">Donation Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[25, 50, 100].map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant="outline"
                    onClick={() => setDonationAmount(amount.toString())}
                    className="rounded-lg"
                  >
                    ₹{amount}
                  </Button>
                ))}
              </div>

              <div>
                <Label htmlFor="payment-method">Payment Method</Label>
                <Select name="paymentMethod">
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="wallet">TravelMate Wallet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="anonymous" name="anonymous" className="rounded" />
                <Label htmlFor="anonymous" className="text-sm">
                  Donate anonymously
                </Label>
              </div>

              <Button type="submit" className="w-full bg-[#0D9488] hover:bg-[#0C837A] text-white">
                <Heart className="mr-2 h-4 w-4" />
                Donate ₹{donationAmount || "0"}
              </Button>

              <input type="hidden" name="campaignId" value={selectedCampaign.id} />
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}