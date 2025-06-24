"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, AlertCircle, Star, TrendingUp, Users, Code, Award } from "lucide-react"

export default function ResumeScoringGuide() {
  const [selectedProfile, setSelectedProfile] = useState("winner")

  const resumeProfiles = {
    winner: {
      name: "Sarah Chen - Senior Frontend Developer",
      overallScore: 9,
      jobFitScore: 9,
      shortlisted: true,
      experience: "6 years",
      highlights: [
        "Led team of 8 frontend developers",
        "Built React apps serving 2M+ users",
        "Expert in TypeScript, Next.js, performance optimization",
        "Mentored 5 junior developers",
        "Improved app performance by 65%",
        "AWS Certified, React Professional Certified",
      ],
      skills: {
        required: ["JavaScript", "HTML", "CSS", "React"],
        bonus: ["TypeScript", "Next.js", "Redux", "Testing", "AWS", "Performance Optimization"],
        missing: [],
      },
      weaknesses: ["Could use more system design experience"],
      interviewQuestions: [
        "How would you optimize a React app with 100+ components for performance?",
        "Describe your approach to mentoring junior developers",
        "Walk me through architecting a scalable frontend system",
        "How do you handle state management in large React applications?",
        "Tell me about a time you had to make a critical technical decision",
      ],
    },
    average: {
      name: "Mike Johnson - Frontend Developer",
      overallScore: 6,
      jobFitScore: 5,
      shortlisted: false,
      experience: "2 years",
      highlights: [
        "2 years React development experience",
        "Built 5+ web applications",
        "Familiar with JavaScript ES6+",
        "Some experience with CSS frameworks",
        "Worked in Agile teams",
      ],
      skills: {
        required: ["JavaScript", "HTML", "CSS", "React"],
        bonus: ["Redux"],
        missing: ["TypeScript", "Next.js", "Testing", "Leadership", "Performance Optimization"],
      },
      weaknesses: ["Lacks senior-level experience", "No leadership experience", "Missing key technologies"],
      interviewQuestions: [],
    },
    junior: {
      name: "Alex Rodriguez - Junior Developer",
      overallScore: 4,
      jobFitScore: 3,
      shortlisted: false,
      experience: "8 months",
      highlights: [
        "Recent bootcamp graduate",
        "Built 3 personal projects with React",
        "Basic JavaScript and CSS knowledge",
        "Eager to learn and grow",
      ],
      skills: {
        required: ["JavaScript", "HTML", "CSS", "React"],
        bonus: [],
        missing: [
          "TypeScript",
          "Next.js",
          "Testing",
          "Leadership",
          "Performance Optimization",
          "Professional Experience",
        ],
      },
      weaknesses: ["Insufficient experience", "No professional background", "Missing most required skills"],
      interviewQuestions: [],
    },
  }

  const currentProfile = resumeProfiles[selectedProfile as keyof typeof resumeProfiles]

  const scoringCriteria = [
    {
      category: "Technical Skills",
      weight: "30%",
      maxScore: 10,
      factors: [
        "JavaScript/TypeScript proficiency",
        "React ecosystem knowledge",
        "Modern frontend tools",
        "Performance optimization",
        "Testing practices",
      ],
    },
    {
      category: "Experience Level",
      weight: "25%",
      maxScore: 10,
      factors: [
        "Years of relevant experience",
        "Project complexity",
        "Scale of applications built",
        "Industry experience",
        "Problem-solving examples",
      ],
    },
    {
      category: "Leadership & Mentoring",
      weight: "20%",
      maxScore: 10,
      factors: [
        "Team leadership experience",
        "Mentoring junior developers",
        "Code review practices",
        "Technical decision making",
        "Cross-functional collaboration",
      ],
    },
    {
      category: "Job Fit",
      weight: "15%",
      maxScore: 10,
      factors: [
        "Skill alignment with requirements",
        "Experience level match",
        "Industry background",
        "Company size experience",
        "Remote work capability",
      ],
    },
    {
      category: "Growth Potential",
      weight: "10%",
      maxScore: 10,
      factors: [
        "Learning trajectory",
        "Certifications and education",
        "Open source contributions",
        "Technical writing/speaking",
        "Innovation mindset",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Senior Frontend Developer Selection Criteria
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Understanding what makes a resume get shortlisted for senior frontend positions
          </p>
        </div>

        {/* Profile Selector */}
        <div className="flex justify-center gap-4 mb-8">
          {Object.entries(resumeProfiles).map(([key, profile]) => (
            <button
              key={key}
              onClick={() => setSelectedProfile(key)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                selectedProfile === key
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {profile.name.split(" - ")[1]}
            </button>
          ))}
        </div>

        {/* Selected Profile Analysis */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-xl">{currentProfile.name}</CardTitle>
              <div className="flex items-center gap-3">
                {currentProfile.shortlisted ? (
                  <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Shortlisted
                  </Badge>
                ) : (
                  <Badge className="bg-red-500/20 text-red-300 border-red-400/30">
                    <XCircle className="h-4 w-4 mr-1" />
                    Not Shortlisted
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Scores */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  Scoring Breakdown
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Overall Score</span>
                      <span className="text-white font-medium">{currentProfile.overallScore}/10</span>
                    </div>
                    <Progress value={currentProfile.overallScore * 10} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Job Fit Score</span>
                      <span className="text-white font-medium">{currentProfile.jobFitScore}/10</span>
                    </div>
                    <Progress value={currentProfile.jobFitScore * 10} className="h-2" />
                  </div>
                  <div className="mt-4 p-3 bg-white/5 rounded-lg">
                    <div className="text-sm text-gray-300">Experience Level</div>
                    <div className="text-white font-medium">{currentProfile.experience}</div>
                  </div>
                </div>
              </div>

              {/* Skills Analysis */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Code className="h-5 w-5 text-green-400" />
                  Skills Analysis
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-green-300 mb-2">✅ Required Skills</div>
                    <div className="flex flex-wrap gap-1">
                      {currentProfile.skills.required.map((skill, index) => (
                        <Badge key={index} className="bg-green-500/20 text-green-300 border-green-400/30 text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {currentProfile.skills.bonus.length > 0 && (
                    <div>
                      <div className="text-sm text-blue-300 mb-2">🚀 Bonus Skills</div>
                      <div className="flex flex-wrap gap-1">
                        {currentProfile.skills.bonus.map((skill, index) => (
                          <Badge key={index} className="bg-blue-500/20 text-blue-300 border-blue-400/30 text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {currentProfile.skills.missing.length > 0 && (
                    <div>
                      <div className="text-sm text-red-300 mb-2">❌ Missing Skills</div>
                      <div className="flex flex-wrap gap-1">
                        {currentProfile.skills.missing.map((skill, index) => (
                          <Badge key={index} className="bg-red-500/20 text-red-300 border-red-400/30 text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-400" />
                Key Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentProfile.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interview Questions */}
            {currentProfile.interviewQuestions.length > 0 && (
              <div className="mt-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-400" />
                  Likely Interview Questions
                </h3>
                <div className="space-y-2">
                  {currentProfile.interviewQuestions.map((question, index) => (
                    <div key={index} className="bg-white/5 p-3 rounded-lg">
                      <span className="text-gray-300 text-sm">{question}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Scoring Criteria */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Detailed Scoring Criteria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scoringCriteria.map((criteria, index) => (
                <div key={index} className="bg-white/5 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-medium">{criteria.category}</h3>
                    <Badge variant="outline" className="text-blue-300 border-blue-400/30">
                      {criteria.weight}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {criteria.factors.map((factor, factorIndex) => (
                      <div key={factorIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <div className="mt-8 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-400/30 p-6 rounded-2xl">
          <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-yellow-400" />
            Pro Tips for Getting Shortlisted
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="space-y-2">
              <div>
                • <strong>Quantify everything:</strong> "Improved performance by 65%"
              </div>
              <div>
                • <strong>Show leadership:</strong> "Led team of X developers"
              </div>
              <div>
                • <strong>Mention scale:</strong> "Built apps serving 2M+ users"
              </div>
            </div>
            <div className="space-y-2">
              <div>
                • <strong>Include certifications:</strong> AWS, React Professional
              </div>
              <div>
                • <strong>Highlight mentoring:</strong> "Mentored 5 junior developers"
              </div>
              <div>
                • <strong>Show impact:</strong> "Reduced load times by 60%"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
