"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Wallet,
  Plus,
  Minus,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeft,
  Target,
  PiggyBank,
  History,
} from "lucide-react"
import Link from "next/link"

const transactions = [
  { id: 1, type: "deposit", amount: 500, description: "Initial deposit", date: "2025-06-15", status: "completed" },
  { id: 2, type: "deposit", amount: 200, description: "Monthly savings", date: "2025-06-20", status: "completed" },
  {
    id: 3,
    type: "withdrawal",
    amount: 150,
    description: "Flight booking deposit",
    date: "2025-06-25",
    status: "completed",
  },
  {
    id: 4,
    type: "deposit",
    amount: 300,
    description: "Trip fund contribution",
    date: "2025-06-01",
    status: "completed",
  },
  { id: 5, type: "withdrawal", amount: 75, description: "Hotel booking", date: "2025-06-05", status: "pending" },
]

const savingsGoals = [
  { id: 1, name: "Pune Backpacking", target: 3000, current: 1850, deadline: "2025-08-15" },
  { id: 2, name: "Religious Trip", target: 4000, current: 2400, deadline: "2025-10-20" },
  { id: 3, name: "Emergency Travel Fund", target: 1000, current: 775, deadline: "2025-12-31" },
]

export default function WalletPage() {
  const [balance] = useState(775)
  const [showDepositDialog, setShowDepositDialog] = useState(false)
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false)
  const [showGoalDialog, setShowGoalDialog] = useState(false)

  const handleDeposit = (formData: FormData) => {
    const amount = formData.get("amount")
    console.log("Depositing:", amount)
    // In real app: POST /api/wallet/deposit
    setShowDepositDialog(false)
  }

  const handleWithdraw = (formData: FormData) => {
    const amount = formData.get("amount")
    console.log("Withdrawing:", amount)
    // In real app: POST /api/wallet/withdraw
    setShowWithdrawDialog(false)
  }

  const handleCreateGoal = (formData: FormData) => {
    const goalData = Object.fromEntries(formData)
    console.log("Creating goal:", goalData)
    setShowGoalDialog(false)
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
            <h1 className="text-2xl font-bold text-gray-900">Trip Saver Wallet</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <PiggyBank className="h-12 w-12 text-[#0D9488]" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Save Smart, Travel More</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build your travel fund with our smart wallet system. Set goals, track progress, and make your dream trips a
            reality.
          </p>
        </div>

        {/* Balance Card */}
        <Card className="border-0 shadow-xl rounded-2xl mb-8 overflow-hidden">
          <div className="primary-gradient text-white p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 mb-2">Total Balance</p>
                <h2 className="text-4xl font-bold">${balance.toLocaleString()}</h2>
                <p className="text-white/80 mt-2">Available for travel expenses</p>
              </div>
              <div className="text-right">
                <Wallet className="h-16 w-16 text-white/60 mb-4" />
                <div className="flex space-x-3">
                  <Dialog open={showDepositDialog} onOpenChange={setShowDepositDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-xl">
                        <Plus className="mr-2 h-4 w-4" />
                        Deposit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Money to Wallet</DialogTitle>
                      </DialogHeader>
                      <form action={handleDeposit} className="space-y-4">
                        <div>
                          <Label htmlFor="amount">Amount</Label>
                          <Input id="amount" name="amount" type="number" placeholder="Enter amount" required />
                        </div>
                        <div>
                          <Label htmlFor="method">Payment Method</Label>
                          <Select name="method">
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="card">Credit/Debit Card</SelectItem>
                              <SelectItem value="bank">Bank Transfer</SelectItem>
                              <SelectItem value="paypal">PayPal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button type="submit" className="w-full bg-[#0D9488] hover:bg-[#0C837A] text-white">
                          Add Money
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-xl">
                        <Minus className="mr-2 h-4 w-4" />
                        Withdraw
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Withdraw Money</DialogTitle>
                      </DialogHeader>
                      <form action={handleWithdraw} className="space-y-4">
                        <div>
                          <Label htmlFor="withdraw-amount">Amount</Label>
                          <Input
                            id="withdraw-amount"
                            name="amount"
                            type="number"
                            placeholder="Enter amount"
                            max={balance}
                            required
                          />
                          <p className="text-sm text-gray-500 mt-1">Available: ${balance}</p>
                        </div>
                        <div>
                          <Label htmlFor="withdraw-method">Withdrawal Method</Label>
                          <Select name="method">
                            <SelectTrigger>
                              <SelectValue placeholder="Select withdrawal method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bank">Bank Transfer</SelectItem>
                              <SelectItem value="paypal">PayPal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button type="submit" className="w-full bg-[#0D9488] hover:bg-[#0C837A] text-white">
                          Withdraw Money
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Savings Goals */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Savings Goals</h2>
              <Dialog open={showGoalDialog} onOpenChange={setShowGoalDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-xl">
                    <Target className="mr-2 h-4 w-4" />
                    New Goal
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Savings Goal</DialogTitle>
                  </DialogHeader>
                  <form action={handleCreateGoal} className="space-y-4">
                    <div>
                      <Label htmlFor="goal-name">Goal Name</Label>
                      <Input id="goal-name" name="name" placeholder="e.g., Pune Trip 2024" required />
                    </div>
                    <div>
                      <Label htmlFor="target-amount">Target Amount</Label>
                      <Input
                        id="target-amount"
                        name="target"
                        type="number"
                        placeholder="Enter target amount"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="deadline">Target Date</Label>
                      <Input id="deadline" name="deadline" type="date" required />
                    </div>
                    <Button type="submit" className="w-full bg-[#0D9488] hover:bg-[#0C837A] text-white">
                      Create Goal
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-6">
              {savingsGoals.map((goal) => {
                const progress = (goal.current / goal.target) * 100
                return (
                  <Card key={goal.id} className="border-0 shadow-lg rounded-2xl">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{goal.name}</CardTitle>
                        <Badge
                          className={progress >= 100 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}
                        >
                          {progress >= 100 ? "Completed" : `${Math.round(progress)}%`}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>${goal.current.toLocaleString()} saved</span>
                          <span>Goal: ${goal.target.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-[#0D9488] h-3 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Deadline: {new Date(goal.deadline).toLocaleDateString()}
                          </span>
                          <div className="space-x-2">
                            <Button size="sm" variant="outline" className="rounded-lg bg-transparent">
                              Edit
                            </Button>
                            <Button size="sm" className="bg-[#0D9488] hover:bg-[#0C837A] text-white rounded-lg">
                              Add Funds
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Transaction History */}
          <div>
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="mr-2 h-5 w-5" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            transaction.type === "deposit" ? "bg-green-100" : "bg-red-100"
                          }`}
                        >
                          {transaction.type === "deposit" ? (
                            <ArrowDownLeft className="h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{transaction.description}</p>
                          <p className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            transaction.type === "deposit" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {transaction.type === "deposit" ? "+" : "-"}${transaction.amount}
                        </p>
                        <Badge
                          variant={transaction.status === "completed" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white rounded-xl bg-transparent"
                >
                  View All Transactions
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-lg rounded-2xl mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Deposits</span>
                    <span className="font-semibold text-green-600">+₹5000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Withdrawals</span>
                    <span className="font-semibold text-red-600">-₹2250</span>
                  </div>
                  <div className="flex justify-between border-t pt-4">
                    <span className="font-semibold">Net Savings</span>
                    <span className="font-semibold text-[#0D9488]">+₹2750</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
