"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Users,
  DollarSign,
  Coins,
  Target,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const communityMetrics = {
  overview: {
    totalMembers: 234,
    memberGrowth: 12.5,
    totalFunds: "12.5 ETH",
    fundsGrowth: 8.3,
    avgContribution: "0.53 ETH",
    contributionGrowth: -2.1,
    activityScore: 87,
    activityGrowth: 15.2,
  },
  fundFlow: [
    { month: "Jan", contributions: 2.1, expenses: 0.8, net: 1.3 },
    { month: "Feb", contributions: 3.2, expenses: 1.2, net: 2.0 },
    { month: "Mar", contributions: 4.1, expenses: 2.1, net: 2.0 },
    { month: "Apr", contributions: 2.8, expenses: 1.5, net: 1.3 },
    { month: "May", contributions: 3.5, expenses: 2.8, net: 0.7 },
    { month: "Jun", contributions: 4.2, expenses: 1.9, net: 2.3 },
  ],
  memberActivity: [
    { date: "Mon", messages: 45, votes: 12, contributions: 3 },
    { date: "Tue", messages: 38, votes: 8, contributions: 1 },
    { date: "Wed", messages: 52, votes: 15, contributions: 5 },
    { date: "Thu", messages: 41, votes: 9, contributions: 2 },
    { date: "Fri", messages: 67, votes: 18, contributions: 4 },
    { date: "Sat", messages: 29, votes: 6, contributions: 1 },
    { date: "Sun", messages: 33, votes: 7, contributions: 2 },
  ],
  expenseBreakdown: [
    { category: "Accommodation", amount: 5.6, percentage: 45, color: "bg-[#0D9488]" },
    { category: "Transportation", amount: 3.8, percentage: 30, color: "bg-blue-500" },
    { category: "Activities", amount: 3.1, percentage: 25, color: "bg-purple-500" },
  ],
  topContributors: [
      { name: "Riya Sharma", amount: "2.1 ETH", percentage: 16.8, avatar: "/images/priyanka.jpg?height=32&width=32" },
      { name: "Aarav Mehta", amount: "1.8 ETH", percentage: 14.4, avatar: "/images/maneesh.jpg?height=32&width=32" },
      { name: "Priya Verma", amount: "1.5 ETH", percentage: 12.0, avatar: "/images/Priya.jpg?height=32&width=32" },
      { name: "Rahul Singh", amount: "1.2 ETH", percentage: 9.6, avatar: "/images/shrestha.jpg?height=32&width=32" },
      { name: "Sneha Patel", amount: "1.0 ETH", percentage: 8.0, avatar: "/images/shweta.jpg?height=32&width=32" },
  ],
  predictions: {
    fundTarget: "15.0 ETH",
    targetDate: "2025-08-15",
    completionProbability: 78,
    estimatedShortfall: "0.8 ETH",
    recommendedActions: [
      "Increase member recruitment by 15%",
      "Host community fundraising event",
      "Optimize expense allocation",
    ],
  },
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6m")
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/communities" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-[#0D9488]" />
              <span className="text-lg font-semibold text-gray-900">Back to Community</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Community Analytics</h1>
            <div className="flex items-center space-x-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 Month</SelectItem>
                  <SelectItem value="3m">3 Months</SelectItem>
                  <SelectItem value="6m">6 Months</SelectItem>
                  <SelectItem value="1y">1 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Members</p>
                    <p className="text-2xl font-bold">{communityMetrics.overview.totalMembers}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-500">+{communityMetrics.overview.memberGrowth}%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Users className="h-8 w-8 text-[#0D9488] opacity-20" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Funds</p>
                    <p className="text-2xl font-bold">{communityMetrics.overview.totalFunds}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-500">+{communityMetrics.overview.fundsGrowth}%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Coins className="h-8 w-8 text-purple-500 opacity-20" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Contribution</p>
                    <p className="text-2xl font-bold">{communityMetrics.overview.avgContribution}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-500">{communityMetrics.overview.contributionGrowth}%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <DollarSign className="h-8 w-8 text-blue-500 opacity-20" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Activity Score</p>
                    <p className="text-2xl font-bold">{communityMetrics.overview.activityScore}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-500">+{communityMetrics.overview.activityGrowth}%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Activity className="h-8 w-8 text-yellow-500 opacity-20" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Analytics Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Fund Flow</TabsTrigger>
            <TabsTrigger value="activity">Member Activity</TabsTrigger>
            <TabsTrigger value="expenses">Expense Analysis</TabsTrigger>
            <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
          </TabsList>

          {/* Fund Flow Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="border-0 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-6 w-6 text-[#0D9488]" />
                  Fund Flow Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-end space-x-4 p-4">
                  {communityMetrics.fundFlow.map((data, index) => (
                    <div key={data.month} className="flex-1 flex flex-col items-center space-y-2">
                      <div className="w-full flex flex-col items-center space-y-1">
                        {/* Contributions Bar */}
                        <div
                          className="w-8 bg-[#0D9488] rounded-t transition-all duration-1000 ease-out"
                          style={{ height: `${(data.contributions / 5) * 200}px` }}
                        ></div>
                        {/* Expenses Bar */}
                        <div
                          className="w-8 bg-red-400 transition-all duration-1000 ease-out"
                          style={{ height: `${(data.expenses / 5) * 200}px` }}
                        ></div>
                        {/* Net Bar */}
                        <div
                          className="w-8 bg-blue-500 rounded-b transition-all duration-1000 ease-out"
                          style={{ height: `${(data.net / 5) * 200}px` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">{data.month}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#0D9488] rounded"></div>
                    <span className="text-sm">Contributions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded"></div>
                    <span className="text-sm">Expenses</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-sm">Net Growth</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Member Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2 h-6 w-6 text-blue-500" />
                    Weekly Activity Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-52 flex items-end space-x-1 p-2 overflow-x-auto">
                    {communityMetrics.memberActivity.map((data) => (
                      <div
                        key={data.date}
                        className="flex-1 min-w-[36px] flex flex-col items-center space-y-1"
                      >
                        <div className="w-full flex flex-col items-center space-y-[2px]">
                          <div
                            className="w-3 bg-blue-500 rounded-t transition-all duration-700"
                            style={{
                              height: `${(data.messages / 70) * 120}px`,
                            }}
                          ></div>
                          <div
                            className="w-3 bg-purple-500 transition-all duration-700"
                            style={{
                              height: `${(data.votes / 20) * 120}px`,
                            }}
                          ></div>
                          <div
                            className="w-3 bg-[#0D9488] rounded-b transition-all duration-700"
                            style={{
                              height: `${(data.contributions / 5) * 120}px`,
                            }}
                          ></div>
                        </div>
                        <span className="text-[10px] font-medium">{data.date}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center space-x-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span className="text-sm">Messages</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded"></div>
                      <span className="text-sm">Votes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#0D9488] rounded"></div>
                      <span className="text-sm">Contributions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>


              <Card className="border-0 shadow-xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-6 w-6 text-[#0D9488]" />
                    Top Contributors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {communityMetrics.topContributors.map((contributor, index) => (
                      <div
                        key={contributor.name}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-[#0D9488] rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{contributor.name}</p>
                            <p className="text-xs text-gray-500">{contributor.percentage}% of total</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#0D9488]">{contributor.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Expense Analysis Tab */}
          <TabsContent value="expenses" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="mr-2 h-6 w-6 text-purple-500" />
                    Expense Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {communityMetrics.expenseBreakdown.map((expense, index) => (
                      <div key={expense.category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{expense.category}</span>
                          <span className="text-sm text-gray-600">
                            {expense.amount} ETH ({expense.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all duration-1000 ease-out ${expense.color}`}
                            style={{ width: `${expense.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Budget Optimization</h4>
                    <p className="text-sm text-gray-600">
                      Consider reallocating 5% from accommodation to activities for better member satisfaction.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="mr-2 h-6 w-6 text-[#0D9488]" />
                    Budget vs Actual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {communityMetrics.expenseBreakdown.map((expense, index) => (
                      <div key={expense.category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{expense.category}</span>
                          <Badge className="bg-green-100 text-green-800">Under Budget</Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Budgeted</span>
                            <span>{(expense.amount * 1.1).toFixed(1)} ETH</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Actual</span>
                            <span className="text-[#0D9488] font-medium">{expense.amount} ETH</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 bg-[#0D9488] rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${(expense.amount / (expense.amount * 1.1)) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Predictions Tab */}
          <TabsContent value="predictions" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 h-6 w-6 text-purple-600" />
                    AI Fund Predictions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                      <h3 className="text-2xl font-bold text-purple-600 mb-2">
                        {communityMetrics.predictions.completionProbability}%
                      </h3>
                      <p className="text-sm text-gray-600">Probability of reaching fund target</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Target: {communityMetrics.predictions.fundTarget} by{" "}
                        {new Date(communityMetrics.predictions.targetDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Current Progress</span>
                        <span className="font-medium">83.3%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="w-5/6 h-3 bg-gradient-to-r from-[#0D9488] to-purple-600 rounded-full transition-all duration-1000 ease-out"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>12.5 ETH</span>
                        <span>15.0 ETH</span>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium text-yellow-800">Potential Shortfall</span>
                      </div>
                      <p className="text-sm text-yellow-700">
                        AI predicts a potential shortfall of {communityMetrics.predictions.estimatedShortfall} based on
                        current trends.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 mb-4">
                      Based on community data analysis, here are AI-generated recommendations:
                    </p>

                    {communityMetrics.predictions.recommendedActions.map((action, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg">
                        <div className="w-6 h-6 bg-[#0D9488] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <p className="text-sm text-gray-700">{action}</p>
                      </div>
                    ))}

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Timeline Optimization</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Implementing these recommendations could improve target completion probability to 92% and reduce
                        timeline by 3 weeks.
                      </p>
                    </div>

                    <Button className="w-full bg-[#0D9488] hover:bg-[#0C837A] text-white">
                      Implement AI Suggestions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
