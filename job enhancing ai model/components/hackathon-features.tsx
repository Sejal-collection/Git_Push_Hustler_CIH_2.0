"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, DollarSign, Clock, Award, Target, Lightbulb, Rocket } from "lucide-react"

export default function HackathonFeatures() {
  const [activeTab, setActiveTab] = useState("impact")

  const impactMetrics = [
    { label: "Time Saved", value: "85%", icon: Clock, color: "text-blue-500" },
    { label: "Cost Reduction", value: "$50K/year", icon: DollarSign, color: "text-green-500" },
    { label: "Accuracy Improvement", value: "73%", icon: Target, color: "text-purple-500" },
    { label: "Candidate Experience", value: "4.8/5", icon: Award, color: "text-orange-500" },
  ]

  const winningFeatures = [
    {
      title: "AI-Powered Bias Detection",
      description: "Identifies and flags potential bias in job descriptions and evaluation criteria",
      impact: "Promotes diversity and inclusion",
      difficulty: "High",
      wow: 9,
    },
    {
      title: "Real-time Market Salary Analysis",
      description: "Live salary benchmarking against current market data",
      impact: "Ensures competitive offers",
      difficulty: "Medium",
      wow: 8,
    },
    {
      title: "Candidate Journey Analytics",
      description: "Tracks and optimizes the entire hiring funnel",
      impact: "Improves conversion rates",
      difficulty: "Medium",
      wow: 7,
    },
    {
      title: "Video Interview Analysis",
      description: "AI analysis of facial expressions, tone, and communication style",
      impact: "Deeper candidate insights",
      difficulty: "High",
      wow: 10,
    },
    {
      title: "Automated Reference Checking",
      description: "AI-powered reference verification and sentiment analysis",
      impact: "Reduces manual work",
      difficulty: "Medium",
      wow: 8,
    },
    {
      title: "Predictive Success Modeling",
      description: "ML model predicting job performance based on historical data",
      impact: "Better hiring decisions",
      difficulty: "High",
      wow: 9,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Hackathon Winning Strategy
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Transform your resume analyzer into a hackathon champion with these strategic additions
          </p>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {impactMetrics.map((metric, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <metric.icon className={`h-8 w-8 ${metric.color} mx-auto mb-3`} />
                <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                <div className="text-gray-300 text-sm">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Winning Features */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Rocket className="h-6 w-6 text-yellow-400" />
              Hackathon-Winning Features to Add
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {winningFeatures.map((feature, index) => (
                <div key={index} className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-white font-semibold text-lg">{feature.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                        WOW: {feature.wow}/10
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{feature.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 text-sm">💡 {feature.impact}</span>
                    <Badge variant={feature.difficulty === "High" ? "destructive" : "secondary"} className="text-xs">
                      {feature.difficulty}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Presentation Strategy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-400" />
                Demo Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  1
                </div>
                <div>
                  <h4 className="text-white font-medium">Hook with Problem</h4>
                  <p className="text-sm">"Companies waste 23 hours per hire on manual resume screening"</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  2
                </div>
                <div>
                  <h4 className="text-white font-medium">Live Demo Magic</h4>
                  <p className="text-sm">Upload resume → AI analysis → Live interview → Instant decision</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  3
                </div>
                <div>
                  <h4 className="text-white font-medium">Show the Numbers</h4>
                  <p className="text-sm">ROI calculator, time savings, accuracy improvements</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  4
                </div>
                <div>
                  <h4 className="text-white font-medium">Future Vision</h4>
                  <p className="text-sm">Roadmap to full hiring automation platform</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Judge Appeal Factors
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm">
                    <strong>Technical Depth:</strong> AI integration, real-time features
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">
                    <strong>Market Potential:</strong> $240B hiring market
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-sm">
                    <strong>Social Impact:</strong> Reduces hiring bias
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <span className="text-sm">
                    <strong>Execution Quality:</strong> Polished UI/UX
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                  <span className="text-sm">
                    <strong>Innovation:</strong> Novel AI interview approach
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                  <span className="text-sm">
                    <strong>Scalability:</strong> Ready for enterprise deployment
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-600/20 border border-yellow-400/30 p-8 rounded-3xl">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Win? 🏆</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Your project already has 80% of what it takes to win. Add 2-3 of these features, nail the presentation,
              and you'll have judges fighting over who gets to fund you!
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-8 py-3 text-lg">
                <Award className="h-5 w-5 mr-2" />
                Let's Win This!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
