"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Briefcase,
  Building,
  Brain,
  Zap,
  ChevronRight,
  Users,
  X,
  Download,
  FileStack,
  Trash2,
  Code,
  Timer,
  CheckSquare,
  AlertTriangle,
  Play,
  Pause,
} from "lucide-react"
import { jobDescriptions, type JobDescription } from "@/lib/job-descriptions"

interface InterviewState {
  active: boolean
  sessionId: string
  currentRound: "behavioral" | "dsa" | "completed"
  currentQuestion: string
  questionNumber: number
  totalQuestions: number
  completed: boolean
  evaluation: any
  candidateIndex: number
  dsaQuestion?: any
  roundTransition?: boolean
  roundInfo?: any
}

interface ResumeAnalysis {
  id: string
  filename: string
  fileSize: number
  fileType: string
  analysis: any
  uploadTime: Date
}

interface DSASubmission {
  code: string
  language: string
  explanation: string
  approach: string
  timeSpent: number
}

export default function ResumeUploader() {
  const [selectedJob, setSelectedJob] = useState<JobDescription | null>(null)
  const [showJobSelection, setShowJobSelection] = useState(true)
  const [uploadStatus, setUploadStatus] = useState<{
    type: "idle" | "uploading" | "success" | "error"
    message: string
  }>({ type: "idle", message: "" })
  const [resumeAnalyses, setResumeAnalyses] = useState<ResumeAnalysis[]>([])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedAnalysisIndex, setSelectedAnalysisIndex] = useState(0)
  const [showComparison, setShowComparison] = useState(false)
  const [interview, setInterview] = useState<InterviewState>({
    active: false,
    sessionId: "",
    currentRound: "behavioral",
    currentQuestion: "",
    questionNumber: 0,
    totalQuestions: 0,
    completed: false,
    evaluation: null,
    candidateIndex: 0,
  })
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [dsaSubmission, setDsaSubmission] = useState<DSASubmission>({
    code: "",
    language: "javascript",
    explanation: "",
    approach: "",
    timeSpent: 0,
  })
  const [dsaTimer, setDsaTimer] = useState(0)
  const [timerActive, setTimerActive] = useState(false)

  // Timer effect for DSA round
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (timerActive && interview.currentRound === "dsa") {
      interval = setInterval(() => {
        setDsaTimer((timer) => timer + 1)
      }, 1000)
    } else if (!timerActive) {
      if (interval) clearInterval(interval)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerActive, interview.currentRound])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleJobSelect = (job: JobDescription) => {
    setSelectedJob(job)
    setShowJobSelection(false)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedFiles(files)
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedJob) {
      setUploadStatus({ type: "error", message: "Please select a job position first" })
      return
    }

    if (selectedFiles.length === 0) {
      setUploadStatus({ type: "error", message: "Please select at least one file" })
      return
    }

    setUploadStatus({
      type: "uploading",
      message: `Analyzing ${selectedFiles.length} resume${selectedFiles.length > 1 ? "s" : ""}...`,
    })

    const newAnalyses: ResumeAnalysis[] = []

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        const formData = new FormData()
        formData.append("resumeFile", file)
        formData.append("jobDescription", JSON.stringify(selectedJob))

        setUploadStatus({
          type: "uploading",
          message: `Analyzing resume ${i + 1} of ${selectedFiles.length}: ${file.name}...`,
        })

        const response = await fetch("/api/upload-resume", {
          method: "POST",
          body: formData,
        })

        const result = await response.json()

        if (response.ok) {
          newAnalyses.push({
            id: `analysis_${Date.now()}_${i}`,
            filename: file.name,
            fileSize: file.size,
            fileType: file.type,
            analysis: result.analysis,
            uploadTime: new Date(),
          })
        }
      }

      setResumeAnalyses((prev) => [...prev, ...newAnalyses])
      setUploadStatus({
        type: "success",
        message: `Successfully analyzed ${newAnalyses.length} resume${newAnalyses.length > 1 ? "s" : ""}!`,
      })
      setSelectedFiles([])

      const fileInput = document.getElementById("resumeFile") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    } catch (error) {
      setUploadStatus({ type: "error", message: "Network error occurred" })
    }
  }

  const startInterview = async (analysisIndex: number) => {
    const sessionId = `session_${Date.now()}_${analysisIndex}`
    const analysis = resumeAnalyses[analysisIndex]

    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "start",
          sessionId,
          candidateData: {
            analysis: analysis.analysis,
            interviewQuestions: analysis.analysis.interviewQuestions,
            jobDescription: selectedJob,
          },
        }),
      })

      const result = await response.json()

      if (result.success) {
        setInterview({
          active: true,
          sessionId,
          currentRound: "behavioral",
          currentQuestion: result.currentQuestion,
          questionNumber: result.questionNumber,
          totalQuestions: result.totalQuestions,
          completed: false,
          evaluation: null,
          candidateIndex: analysisIndex,
          roundInfo: result.roundInfo,
        })
      }
    } catch (error) {
      console.error("Failed to start interview:", error)
    }
  }

  const submitBehavioralAnswer = async () => {
    if (!currentAnswer.trim()) return

    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "answer",
          sessionId: interview.sessionId,
          answer: currentAnswer,
        }),
      })

      const result = await response.json()

      if (result.success) {
        if (result.roundTransition) {
          // Moving to DSA round
          setInterview((prev) => ({
            ...prev,
            currentRound: "dsa",
            roundTransition: true,
            roundInfo: result.roundInfo,
          }))
        } else if (result.completed) {
          setInterview((prev) => ({
            ...prev,
            completed: true,
            evaluation: result.evaluation,
          }))
        } else {
          setInterview((prev) => ({
            ...prev,
            currentQuestion: result.currentQuestion,
            questionNumber: result.questionNumber,
          }))
        }
        setCurrentAnswer("")
      }
    } catch (error) {
      console.error("Failed to submit answer:", error)
    }
  }

  const startDSARound = async () => {
    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "start-dsa",
          sessionId: interview.sessionId,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setInterview((prev) => ({
          ...prev,
          currentRound: "dsa",
          dsaQuestion: result.dsaQuestion,
          questionNumber: result.questionNumber,
          totalQuestions: result.totalQuestions,
          roundTransition: false,
        }))
        setDsaTimer(0)
        setTimerActive(true)
      }
    } catch (error) {
      console.error("Failed to start DSA round:", error)
    }
  }

  const submitDSAAnswer = async () => {
    if (!dsaSubmission.code.trim()) return

    setTimerActive(false)
    const timeSpent = Math.floor(dsaTimer / 60) // Convert to minutes

    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit-dsa",
          sessionId: interview.sessionId,
          dsaAnswer: {
            questionId: interview.dsaQuestion?.id,
            ...dsaSubmission,
            timeSpent,
          },
        }),
      })

      const result = await response.json()

      if (result.success) {
        if (result.completed) {
          setInterview((prev) => ({
            ...prev,
            completed: true,
            evaluation: result.evaluation,
          }))
        } else {
          setInterview((prev) => ({
            ...prev,
            dsaQuestion: result.dsaQuestion,
            questionNumber: result.questionNumber,
          }))
          // Reset for next question
          setDsaSubmission({
            code: "",
            language: "javascript",
            explanation: "",
            approach: "",
            timeSpent: 0,
          })
          setDsaTimer(0)
          setTimerActive(true)
        }
      }
    } catch (error) {
      console.error("Failed to submit DSA answer:", error)
    }
  }

  const resetApplication = () => {
    setSelectedJob(null)
    setShowJobSelection(true)
    setUploadStatus({ type: "idle", message: "" })
    setResumeAnalyses([])
    setSelectedFiles([])
    setActiveTab("overview")
    setSelectedAnalysisIndex(0)
    setShowComparison(false)
    setInterview({
      active: false,
      sessionId: "",
      currentRound: "behavioral",
      currentQuestion: "",
      questionNumber: 0,
      totalQuestions: 0,
      completed: false,
      evaluation: null,
      candidateIndex: 0,
    })
    setCurrentAnswer("")
    setDsaSubmission({
      code: "",
      language: "javascript",
      explanation: "",
      approach: "",
      timeSpent: 0,
    })
    setDsaTimer(0)
    setTimerActive(false)
  }

  const deleteAnalysis = (index: number) => {
    setResumeAnalyses((prev) => prev.filter((_, i) => i !== index))
    if (selectedAnalysisIndex >= index && selectedAnalysisIndex > 0) {
      setSelectedAnalysisIndex((prev) => prev - 1)
    }
  }

  const exportAnalysis = (analysis: ResumeAnalysis) => {
    const dataStr = JSON.stringify(analysis, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `${analysis.filename}_analysis.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-emerald-600"
    if (score >= 6) return "text-amber-600"
    return "text-red-500"
  }

  const getScoreBg = (score: number) => {
    if (score >= 8) return "bg-emerald-50 border-emerald-200"
    if (score >= 6) return "bg-amber-50 border-amber-200"
    return "bg-red-50 border-red-200"
  }

  const currentAnalysis = resumeAnalyses[selectedAnalysisIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex justify-center items-center min-h-screen p-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-7xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI Resume Analyzer
              </h1>
            </div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Upload multiple resumes for comprehensive AI analysis with behavioral + DSA interviews
            </p>
          </div>

          {/* Job Selection - Same as before */}
          {showJobSelection && (
            <div className="text-center">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Choose Your Dream Position</h2>
                <p className="text-gray-300 text-lg">Select a role to get personalized AI-powered career insights</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-96 overflow-y-auto">
                {jobDescriptions.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => handleJobSelect(job)}
                    className="group bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl text-left"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                        <Briefcase className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-400/30">
                        {job.level}
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2 group-hover:text-blue-300 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-300">{job.department}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{job.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {job.skills.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-lg border border-purple-400/30"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 3 && (
                          <span className="text-xs text-gray-400">+{job.skills.length - 3}</span>
                        )}
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-300 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Selected Job Display - Same as before */}
          {selectedJob && !interview.active && (
            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-400/30 p-6 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xl">
                        {selectedJob.title} - {selectedJob.department}
                      </h3>
                      <p className="text-blue-300">
                        {selectedJob.location} • {selectedJob.employmentType}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowJobSelection(true)}
                    className="text-blue-300 hover:text-white transition-colors text-sm underline"
                  >
                    Change Position
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Upload Form - Same as before but condensed for space */}
          {selectedJob && !interview.active && (
            <div className="max-w-4xl mx-auto mb-8">
              <div className="text-center mb-6">
                <div className="p-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl inline-block mb-4">
                  <FileStack className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Upload Multiple Resumes</h2>
                <p className="text-gray-300">
                  Upload resumes for comprehensive AI analysis with behavioral + DSA interviews
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-2xl">
                  <input
                    type="file"
                    id="resumeFile"
                    name="resumeFile"
                    accept=".pdf,.docx"
                    multiple
                    onChange={handleFileSelect}
                    className="w-full p-3 border-2 border-dashed border-white/30 rounded-xl bg-white/5 text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-purple-600 file:text-white file:cursor-pointer file:font-semibold hover:file:from-blue-600 hover:file:to-purple-700 transition-all"
                  />

                  {selectedFiles.length > 0 && (
                    <div className="mt-3 max-h-24 overflow-y-auto space-y-1">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white/5 p-2 rounded-lg text-sm"
                        >
                          <span className="text-gray-300 truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-400 hover:text-red-300 ml-2"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={uploadStatus.type === "uploading" || selectedFiles.length === 0}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-6 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  {uploadStatus.type === "uploading" ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      <span>AI Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5" />
                      <span>
                        Analyze {selectedFiles.length} Resume{selectedFiles.length !== 1 ? "s" : ""}
                      </span>
                    </>
                  )}
                </button>
              </form>

              {uploadStatus.message && (
                <div
                  className={`mt-4 p-3 rounded-xl border flex items-center gap-2 text-sm ${
                    uploadStatus.type === "success"
                      ? "bg-emerald-500/20 border-emerald-400/30 text-emerald-300"
                      : uploadStatus.type === "error"
                        ? "bg-red-500/20 border-red-400/30 text-red-300"
                        : "bg-blue-500/20 border-blue-400/30 text-blue-300"
                  }`}
                >
                  {uploadStatus.type === "success" && <CheckCircle className="h-5 w-5" />}
                  {uploadStatus.type === "error" && <AlertCircle className="h-5 w-5" />}
                  {uploadStatus.type === "uploading" && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-300 border-t-transparent" />
                  )}
                  <span>{uploadStatus.message}</span>
                </div>
              )}
            </div>
          )}

          {/* Resume Analysis Results - Condensed version */}
          {resumeAnalyses.length > 0 && !interview.active && (
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileStack className="h-5 w-5" />
                    Analysis Results ({resumeAnalyses.length})
                  </h3>
                  <div className="flex items-center gap-2">
                    {resumeAnalyses.length > 1 && (
                      <button
                        onClick={() => setShowComparison(!showComparison)}
                        className="bg-purple-500/20 text-purple-300 py-1 px-3 rounded-lg text-sm hover:bg-purple-500/30 transition-colors"
                      >
                        {showComparison ? "Hide" : "Show"} Comparison
                      </button>
                    )}
                    <button
                      onClick={resetApplication}
                      className="bg-gray-600/20 text-gray-300 py-1 px-3 rounded-lg text-sm hover:bg-gray-600/30 transition-colors"
                    >
                      Start Over
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resumeAnalyses.map((analysis, index) => (
                    <div
                      key={analysis.id}
                      className={`p-4 rounded-xl cursor-pointer transition-all border ${
                        selectedAnalysisIndex === index
                          ? "bg-blue-500/20 border-blue-400/50"
                          : "bg-white/5 border-white/20 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white text-sm truncate">{analysis.filename}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              exportAnalysis(analysis)
                            }}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            <Download className="h-3 w-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteAnalysis(index)
                            }}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                        <div className="text-center">
                          <div className={`font-bold ${getScoreColor(analysis.analysis.score)}`}>
                            {analysis.analysis.score}/10
                          </div>
                          <div className="text-gray-400">Overall</div>
                        </div>
                        <div className="text-center">
                          <div className={`font-bold ${getScoreColor(analysis.analysis.jobFitScore)}`}>
                            {analysis.analysis.jobFitScore}/10
                          </div>
                          <div className="text-gray-400">Job Fit</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            analysis.analysis.shortlisted
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-red-500/20 text-red-300"
                          }`}
                        >
                          {analysis.analysis.shortlisted ? "✅ Shortlisted" : "❌ Not Shortlisted"}
                        </span>
                        {analysis.analysis.shortlisted && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              startInterview(index)
                            }}
                            className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all flex items-center gap-1"
                          >
                            <MessageSquare className="h-3 w-3" />
                            Interview
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Two-Round Interview Interface */}
          {interview.active && !interview.completed && (
            <div className="max-w-5xl mx-auto">
              {/* Round Transition Screen */}
              {interview.roundTransition && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-3xl text-center">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="p-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl">
                      <Code className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Ready for DSA Round?</h2>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-400/30 p-6 rounded-2xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-3">{interview.roundInfo?.name}</h3>
                    <p className="text-gray-200 mb-4">{interview.roundInfo?.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckSquare className="h-4 w-4 text-green-400" />
                        <span className="text-gray-300">Total Questions: {interview.roundInfo?.totalQuestions}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Timer className="h-4 w-4 text-blue-400" />
                        <span className="text-gray-300">Time: {interview.roundInfo?.timePerQuestion}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-400/30 p-4 rounded-xl mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                      <h4 className="font-bold text-amber-300">DSA Round Instructions</h4>
                    </div>
                    <ul className="text-amber-200 text-sm space-y-1 text-left">
                      <li>• Write clean, efficient code with proper variable names</li>
                      <li>• Explain your approach and time/space complexity</li>
                      <li>• Consider edge cases and handle them appropriately</li>
                      <li>• Timer will start when you begin each problem</li>
                      <li>• You can pause/resume the timer if needed</li>
                    </ul>
                  </div>

                  <button
                    onClick={startDSARound}
                    className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 mx-auto"
                  >
                    <Play className="h-6 w-6" />
                    Start DSA Round
                    <Code className="h-5 w-5" />
                  </button>
                </div>
              )}

              {/* Behavioral Interview */}
              {interview.currentRound === "behavioral" && !interview.roundTransition && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-3xl">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white">Behavioral Interview</h2>
                        <p className="text-gray-300">Candidate: {resumeAnalyses[interview.candidateIndex]?.filename}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 bg-white/10 px-4 py-2 rounded-xl">
                      <MessageSquare className="h-5 w-5" />
                      <span className="font-medium">
                        Question {interview.questionNumber} of {interview.totalQuestions}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-400/30 p-6 rounded-2xl mb-8">
                    <p className="text-white text-lg font-medium">{interview.currentQuestion}</p>
                  </div>

                  <div className="space-y-6">
                    <textarea
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                      placeholder="Share your experience and thoughts..."
                      className="w-full p-6 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 min-h-32 resize-vertical backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                      onClick={submitBehavioralAnswer}
                      disabled={!currentAnswer.trim()}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                    >
                      {interview.questionNumber === interview.totalQuestions ? (
                        <>
                          <Code className="h-6 w-6" />
                          Proceed to DSA Round
                        </>
                      ) : (
                        <>
                          <ChevronRight className="h-6 w-6" />
                          Next Question
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* DSA Interview */}
              {interview.currentRound === "dsa" && !interview.roundTransition && interview.dsaQuestion && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-3xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl">
                        <Code className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">DSA Round</h2>
                        <p className="text-gray-300">
                          Problem {interview.questionNumber} of {interview.totalQuestions}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl">
                        <Timer className="h-5 w-5 text-blue-400" />
                        <span className="font-mono text-white">{formatTime(dsaTimer)}</span>
                        <button
                          onClick={() => setTimerActive(!timerActive)}
                          className="text-blue-400 hover:text-blue-300 ml-2"
                        >
                          {timerActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </button>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          interview.dsaQuestion.difficulty === "Easy"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : interview.dsaQuestion.difficulty === "Medium"
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {interview.dsaQuestion.difficulty}
                      </span>
                    </div>{" "}
                    {/* end flex items-center gap-4 */}
                  </div>{" "}
                  {/* end header bar */}
                  {/* --- Problem Statement --- */}
                  <div className="bg-white/5 p-6 rounded-xl mb-6 text-sm text-gray-200 whitespace-pre-line">
                    {interview.dsaQuestion.description}
                  </div>
                  {/* --- Candidate Code Editor (textarea for demo) --- */}
                  <textarea
                    value={dsaSubmission.code}
                    onChange={(e) => setDsaSubmission({ ...dsaSubmission, code: e.target.value })}
                    placeholder="Paste your code solution here..."
                    className="w-full min-h-40 p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 mb-4"
                  />
                  <button
                    onClick={submitDSAAnswer}
                    disabled={!dsaSubmission.code.trim()}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <ChevronRight className="h-5 w-5" />
                    {interview.questionNumber === interview.totalQuestions
                      ? "Submit & Finish Interview"
                      : "Submit Solution"}
                  </button>
                </div>
              )}

              {/* Interview Completed */}
              {interview.completed && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-3xl text-center">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="p-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Interview Completed!</h2>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-400/30 p-6 rounded-2xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-3">Evaluation Summary</h3>
                    <p className="text-gray-200 mb-4">
                      Here's a summary of the candidate's performance during the interview process.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckSquare className="h-4 w-4 text-green-400" />
                        <span className="text-gray-300">Overall Score: {interview.evaluation?.overallScore}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Timer className="h-4 w-4 text-blue-400" />
                        <span className="text-gray-300">
                          Communication Skills: {interview.evaluation?.communicationSkills}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-purple-400" />
                        <span className="text-gray-300">Problem Solving: {interview.evaluation?.problemSolving}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-green-400" />
                        <span className="text-gray-300">Technical Skills: {interview.evaluation?.technicalSkills}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={resetApplication}
                    className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 mx-auto"
                  >
                    <X className="h-6 w-6" />
                    Start New Analysis
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
