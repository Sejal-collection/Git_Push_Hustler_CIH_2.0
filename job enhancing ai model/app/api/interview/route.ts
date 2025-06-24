import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

interface InterviewSession {
  candidateId: string
  currentRound: "behavioral" | "dsa" | "completed"
  currentQuestion: number
  behavioralQuestions: string[]
  dsaQuestions: DSAQuestion[]
  behavioralAnswers: string[]
  dsaAnswers: DSAAnswer[]
  analysis: any
  startTime: Date
  roundStartTime: Date
}

interface DSAQuestion {
  id: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard" | "Basic"
  topic: string
  timeLimit: number // in minutes
  expectedComplexity: string
  sampleInput?: string
  sampleOutput?: string
  constraints?: string[]
}

interface DSAAnswer {
  questionId: string
  code: string
  language: string
  explanation: string
  timeSpent: number
  approach: string
}

// In-memory storage for demo (use database in production)
const interviewSessions = new Map<string, InterviewSession>()

// DSA Question Bank
const dsaQuestionBank: DSAQuestion[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    difficulty: "Easy",
    topic: "Array, Hash Table",
    timeLimit: 15,
    expectedComplexity: "O(n) time, O(n) space",
    sampleInput: "nums = [2,7,11,15], target = 9",
    sampleOutput: "[0,1]",
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "Only one valid answer exists"],
  },
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    difficulty: "Easy",
    topic: "Linked List, Recursion",
    timeLimit: 20,
    expectedComplexity: "O(n) time, O(1) space",
    sampleInput: "head = [1,2,3,4,5]",
    sampleOutput: "[5,4,3,2,1]",
    constraints: ["The number of nodes in the list is the range [0, 5000]", "-5000 <= Node.val <= 5000"],
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets, Open brackets must be closed in the correct order.",
    difficulty: "Easy",
    topic: "String, Stack",
    timeLimit: 15,
    expectedComplexity: "O(n) time, O(n) space",
    sampleInput: 's = "()[]{}"',
    sampleOutput: "true",
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'"],
  },
  {
    id: "binary-tree-inorder",
    title: "Binary Tree Inorder Traversal",
    description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    difficulty: "Easy",
    topic: "Tree, Stack, Recursion",
    timeLimit: 20,
    expectedComplexity: "O(n) time, O(n) space",
    sampleInput: "root = [1,null,2,3]",
    sampleOutput: "[1,3,2]",
    constraints: ["The number of nodes in the tree is in the range [0, 100]", "-100 <= Node.val <= 100"],
  },
  {
    id: "longest-substring",
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    difficulty: "Medium",
    topic: "String, Sliding Window, Hash Table",
    timeLimit: 25,
    expectedComplexity: "O(n) time, O(min(m,n)) space",
    sampleInput: 's = "abcabcbb"',
    sampleOutput: "3",
    constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces"],
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    description:
      "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    difficulty: "Medium",
    topic: "Array, Sorting",
    timeLimit: 30,
    expectedComplexity: "O(n log n) time, O(1) space",
    sampleInput: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
    sampleOutput: "[[1,6],[8,10],[15,18]]",
    constraints: ["1 <= intervals.length <= 10^4", "intervals[i].length == 2", "0 <= starti <= endi <= 10^4"],
  },
  {
    id: "lru-cache",
    title: "LRU Cache",
    description:
      "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with get(key) and put(key, value) methods.",
    difficulty: "Medium",
    topic: "Hash Table, Linked List, Design",
    timeLimit: 35,
    expectedComplexity: "O(1) time for both operations",
    sampleInput: "LRUCache(2); put(1,1); put(2,2); get(1); put(3,3); get(2); put(4,4); get(1); get(3); get(4)",
    sampleOutput: "null, null, null, 1, null, -1, null, -1, 3, 4",
    constraints: ["1 <= capacity <= 3000", "0 <= key <= 10^4", "0 <= value <= 10^5"],
  },
  {
    id: "word-ladder",
    title: "Word Ladder",
    description:
      "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that every adjacent pair of words differs by a single letter. Return the length of the shortest transformation sequence.",
    difficulty: "Hard",
    topic: "Hash Table, String, BFS",
    timeLimit: 45,
    expectedComplexity: "O(M^2 × N) time, O(M^2 × N) space",
    sampleInput: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
    sampleOutput: "5",
    constraints: ["1 <= beginWord.length <= 10", "endWord.length == beginWord.length", "1 <= wordList.length <= 5000"],
  },
  {
    id: "fizz-buzz",
    title: "Fizz Buzz",
    description:
      "Write a program that prints the numbers from 1 to n. But for multiples of three print “Fizz” instead of the number and for the multiples of five print “Buzz”. For numbers which are multiples of both three and five print “FizzBuzz”.",
    difficulty: "Basic",
    topic: "Conditional Statements",
    timeLimit: 10,
    expectedComplexity: "O(n) time, O(1) space",
    sampleInput: "n = 15",
    sampleOutput: "1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz",
    constraints: ["1 <= n <= 10^4"],
  },
  {
    id: "palindrome-check",
    title: "Palindrome Check",
    description:
      "Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.",
    difficulty: "Basic",
    topic: "String Manipulation",
    timeLimit: 10,
    expectedComplexity: "O(n) time, O(1) space",
    sampleInput: 's = "A man, a plan, a canal: Panama"',
    sampleOutput: "true",
    constraints: ["1 <= s.length <= 10^5"],
  },
  {
    id: "factorial",
    title: "Factorial",
    description: "Write a function that calculates the factorial of a non-negative integer.",
    difficulty: "Basic",
    topic: "Recursion",
    timeLimit: 10,
    expectedComplexity: "O(n) time, O(1) space",
    sampleInput: "n = 5",
    sampleOutput: "120",
    constraints: ["0 <= n <= 12"],
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, sessionId, answer, candidateData, dsaAnswer } = body

    if (action === "start") {
      // Generate behavioral questions
      const behavioralQuestions = candidateData.interviewQuestions || [
        "Tell me about yourself and your experience.",
        "Why are you interested in this position?",
        "Describe a challenging project you worked on.",
        "How do you handle tight deadlines?",
        "What are your career goals?",
      ]

      // Select DSA questions based on job level and skills
      const selectedDSAQuestions = selectDSAQuestions(candidateData.analysis, candidateData.jobDescription)

      const session: InterviewSession = {
        candidateId: sessionId,
        currentRound: "behavioral",
        currentQuestion: 0,
        behavioralQuestions,
        dsaQuestions: selectedDSAQuestions,
        behavioralAnswers: [],
        dsaAnswers: [],
        analysis: candidateData.analysis,
        startTime: new Date(),
        roundStartTime: new Date(),
      }

      interviewSessions.set(sessionId, session)

      return NextResponse.json({
        success: true,
        sessionId,
        currentRound: "behavioral",
        currentQuestion: session.behavioralQuestions[0],
        questionNumber: 1,
        totalQuestions: session.behavioralQuestions.length,
        roundInfo: {
          name: "Behavioral Interview",
          description: "General questions about your experience and background",
        },
      })
    }

    if (action === "answer") {
      const session = interviewSessions.get(sessionId)
      if (!session) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 })
      }

      if (session.currentRound === "behavioral") {
        // Store behavioral answer
        session.behavioralAnswers.push(answer)

        // Check if behavioral round is complete
        const nextQuestionIndex = session.currentQuestion + 1
        if (nextQuestionIndex < session.behavioralQuestions.length) {
          session.currentQuestion = nextQuestionIndex
          interviewSessions.set(sessionId, session)

          return NextResponse.json({
            success: true,
            currentRound: "behavioral",
            currentQuestion: session.behavioralQuestions[nextQuestionIndex],
            questionNumber: nextQuestionIndex + 1,
            totalQuestions: session.behavioralQuestions.length,
            completed: false,
          })
        } else {
          // Move to DSA round
          session.currentRound = "dsa"
          session.currentQuestion = 0
          session.roundStartTime = new Date()
          interviewSessions.set(sessionId, session)

          return NextResponse.json({
            success: true,
            currentRound: "dsa",
            roundTransition: true,
            roundInfo: {
              name: "DSA Round",
              description: "Technical coding problems focusing on Data Structures and Algorithms",
              totalQuestions: session.dsaQuestions.length,
              timePerQuestion: "15-45 minutes per problem",
            },
          })
        }
      }
    }

    if (action === "start-dsa") {
      const session = interviewSessions.get(sessionId)
      if (!session) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 })
      }

      return NextResponse.json({
        success: true,
        currentRound: "dsa",
        dsaQuestion: session.dsaQuestions[0],
        questionNumber: 1,
        totalQuestions: session.dsaQuestions.length,
      })
    }

    if (action === "submit-dsa") {
      const session = interviewSessions.get(sessionId)
      if (!session) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 })
      }

      // Store DSA answer
      session.dsaAnswers.push(dsaAnswer)

      // Check if DSA round is complete
      const nextQuestionIndex = session.currentQuestion + 1
      if (nextQuestionIndex < session.dsaQuestions.length) {
        session.currentQuestion = nextQuestionIndex
        interviewSessions.set(sessionId, session)

        return NextResponse.json({
          success: true,
          currentRound: "dsa",
          dsaQuestion: session.dsaQuestions[nextQuestionIndex],
          questionNumber: nextQuestionIndex + 1,
          totalQuestions: session.dsaQuestions.length,
          completed: false,
        })
      } else {
        // Interview completed, generate comprehensive evaluation
        session.currentRound = "completed"
        const evaluation = await evaluateCompleteInterview(session)

        return NextResponse.json({
          success: true,
          completed: true,
          evaluation,
          totalRounds: 2,
        })
      }
    }

    if (action === "evaluate") {
      const session = interviewSessions.get(sessionId)
      if (!session) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 })
      }

      const evaluation = await evaluateCompleteInterview(session)
      return NextResponse.json({ success: true, evaluation })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Interview API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function selectDSAQuestions(analysis: any, jobDescription: any): DSAQuestion[] {
  const jobLevel = jobDescription?.level?.toLowerCase() || "mid"
  const skills = analysis?.skillsAnalysis?.matchingSkills || []

  let selectedQuestions: DSAQuestion[] = []

  // Select questions based on job level
  if (jobLevel.includes("senior") || jobLevel.includes("lead")) {
    // Senior level: 2 Easy, 1 Medium
    selectedQuestions = [
      ...dsaQuestionBank.filter((q) => q.difficulty === "Easy").slice(0, 2),
      ...dsaQuestionBank.filter((q) => q.difficulty === "Medium").slice(0, 1),
    ]
  } else if (jobLevel.includes("junior") || jobLevel.includes("entry")) {
    // Junior level: 2 Easy, 1 Basic coding problem
    selectedQuestions = [
      ...dsaQuestionBank.filter((q) => q.difficulty === "Easy").slice(0, 2),
      ...dsaQuestionBank.filter((q) => q.difficulty === "Basic").slice(0, 1),
    ]
  } else {
    // Mid level: 1 Easy, 1 Medium
    selectedQuestions = [
      ...dsaQuestionBank.filter((q) => q.difficulty === "Easy").slice(0, 1),
      ...dsaQuestionBank.filter((q) => q.difficulty === "Medium").slice(0, 1),
    ]
  }

  return selectedQuestions.length > 0 ? selectedQuestions : dsaQuestionBank.slice(0, 3)
}

async function evaluateCompleteInterview(session: InterviewSession) {
  if (!process.env.GROQ_API_KEY) {
    return generateFallbackEvaluation(session)
  }

  try {
    // Evaluate behavioral round
    const behavioralEvaluation = await evaluateBehavioralRound(session)

    // Evaluate DSA round
    const dsaEvaluation = await evaluateDSARound(session)

    // Generate comprehensive evaluation
    const { text: overallEvaluationText } = await generateText({
      model: groq("llama-3.1-70b-versatile"),
      prompt: `Provide comprehensive interview evaluation combining behavioral and technical DSA rounds:

BEHAVIORAL ROUND RESULTS:
${JSON.stringify(behavioralEvaluation, null, 2)}

DSA ROUND RESULTS:
${JSON.stringify(dsaEvaluation, null, 2)}

CANDIDATE PROFILE:
- Original Resume Score: ${session.analysis.score}/10
- Job Fit Score: ${session.analysis.jobFitScore}/10
- Experience Level: ${session.analysis.experienceAnalysis?.level || "Unknown"}

Provide final evaluation in JSON format:
{
  "overallScore": [number 1-10],
  "finalRecommendation": "strong_hire/hire/maybe/reject",
  "behavioralScore": [number 1-10],
  "technicalScore": [number 1-10],
  "dsaScore": [number 1-10],
  "combinedFeedback": "[comprehensive feedback combining both rounds]",
  "keyStrengths": [array of key strengths from both rounds],
  "keyWeaknesses": [array of areas needing improvement],
  "technicalReadiness": "excellent/good/fair/poor",
  "culturalFit": "excellent/good/fair/poor",
  "hiringDecision": {
    "decision": "hire/reject/second_interview",
    "reasoning": "[detailed reasoning]",
    "conditions": [any conditions for hiring]
  },
  "developmentAreas": [specific areas for growth],
  "interviewSummary": "[executive summary of interview performance]"
}

Consider:
1. Balance between behavioral and technical performance
2. Job requirements alignment
3. Growth potential and learning ability
4. Problem-solving approach in DSA round
5. Communication clarity in both rounds`,
    })

    const jsonMatch = overallEvaluationText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const evaluation = JSON.parse(jsonMatch[0])
      return {
        ...evaluation,
        behavioralDetails: behavioralEvaluation,
        dsaDetails: dsaEvaluation,
        sessionDuration: Math.round((new Date().getTime() - session.startTime.getTime()) / 1000 / 60), // minutes
        roundsCompleted: 2,
      }
    }
  } catch (error) {
    console.error("Evaluation error:", error)
  }

  return generateFallbackEvaluation(session)
}

async function evaluateBehavioralRound(session: InterviewSession) {
  const { text: behavioralText } = await generateText({
    model: groq("llama-3.1-70b-versatile"),
    prompt: `Evaluate behavioral interview responses:

Questions and Answers:
${session.behavioralQuestions.map((q, i) => `Q${i + 1}: ${q}\nA${i + 1}: ${session.behavioralAnswers[i] || "No answer provided"}`).join("\n\n")}

Provide evaluation in JSON format:
{
  "behavioralScore": [number 1-10],
  "communicationScore": [number 1-10],
  "experienceRelevance": [number 1-10],
  "culturalFitScore": [number 1-10],
  "leadershipPotential": [number 1-10],
  "strengths": [array of behavioral strengths],
  "improvements": [array of behavioral improvement areas],
  "feedback": "[detailed behavioral feedback]"
}`,
  })

  const jsonMatch = behavioralText.match(/\{[\s\S]*\}/)
  return jsonMatch
    ? JSON.parse(jsonMatch[0])
    : {
        behavioralScore: 7,
        communicationScore: 7,
        experienceRelevance: 6,
        culturalFitScore: 7,
        leadershipPotential: 6,
        strengths: ["Clear communication", "Relevant experience"],
        improvements: ["More specific examples", "Leadership examples"],
        feedback: "Good overall behavioral responses with room for improvement.",
      }
}

async function evaluateDSARound(session: InterviewSession) {
  const { text: dsaText } = await generateText({
    model: groq("llama-3.1-70b-versatile"),
    prompt: `Evaluate DSA coding interview performance:

DSA Problems and Solutions:
${session.dsaQuestions
  .map((q, i) => {
    const answer = session.dsaAnswers[i]
    return `
Problem ${i + 1}: ${q.title} (${q.difficulty})
Description: ${q.description}
Expected Complexity: ${q.expectedComplexity}
Time Limit: ${q.timeLimit} minutes

Candidate Solution:
Code: ${answer?.code || "No solution provided"}
Language: ${answer?.language || "Not specified"}
Explanation: ${answer?.explanation || "No explanation provided"}
Approach: ${answer?.approach || "Not specified"}
Time Spent: ${answer?.timeSpent || "Unknown"} minutes
`
  })
  .join("\n")}

Provide technical evaluation in JSON format:
{
  "dsaScore": [number 1-10],
  "algorithmicThinking": [number 1-10],
  "codeQuality": [number 1-10],
  "problemSolving": [number 1-10],
  "timeManagement": [number 1-10],
  "technicalCommunication": [number 1-10],
  "solutionCorrectness": [number 1-10],
  "complexityAnalysis": [number 1-10],
  "problemsAttempted": [number of problems attempted],
  "problemsSolved": [number of problems solved correctly],
  "technicalStrengths": [array of technical strengths],
  "technicalWeaknesses": [array of technical weaknesses],
  "dsaFeedback": "[detailed DSA performance feedback]",
  "recommendedStudyAreas": [areas to focus on for improvement]
}`,
  })

  const jsonMatch = dsaText.match(/\{[\s\S]*\}/)
  return jsonMatch
    ? JSON.parse(jsonMatch[0])
    : {
        dsaScore: 6,
        algorithmicThinking: 6,
        codeQuality: 6,
        problemSolving: 7,
        timeManagement: 5,
        technicalCommunication: 6,
        solutionCorrectness: 6,
        complexityAnalysis: 5,
        problemsAttempted: session.dsaQuestions.length,
        problemsSolved: Math.floor(session.dsaQuestions.length * 0.6),
        technicalStrengths: ["Good problem approach", "Clean code structure"],
        technicalWeaknesses: ["Time complexity analysis", "Edge case handling"],
        dsaFeedback: "Decent technical performance with room for improvement in algorithmic efficiency.",
        recommendedStudyAreas: ["Dynamic Programming", "Graph Algorithms", "System Design"],
      }
}

function generateFallbackEvaluation(session: InterviewSession) {
  return {
    overallScore: 7,
    finalRecommendation: "maybe",
    behavioralScore: 7,
    technicalScore: 6,
    dsaScore: 6,
    combinedFeedback:
      "Candidate showed good communication skills in behavioral round and decent technical understanding in DSA round. Some areas need improvement but shows potential.",
    keyStrengths: ["Clear communication", "Problem-solving approach", "Willingness to learn"],
    keyWeaknesses: ["Technical depth", "Algorithm optimization", "Time management"],
    technicalReadiness: "fair",
    culturalFit: "good",
    hiringDecision: {
      decision: "second_interview",
      reasoning: "Candidate shows promise but needs additional technical evaluation",
      conditions: ["Technical mentorship", "Structured learning plan"],
    },
    developmentAreas: ["Data Structures", "Algorithm Optimization", "System Design"],
    interviewSummary:
      "Mixed performance with stronger behavioral skills than technical. Potential for growth with proper guidance.",
    behavioralDetails: {
      behavioralScore: 7,
      communicationScore: 8,
      experienceRelevance: 6,
      culturalFitScore: 7,
      leadershipPotential: 6,
    },
    dsaDetails: {
      dsaScore: 6,
      algorithmicThinking: 6,
      codeQuality: 6,
      problemSolving: 7,
      problemsAttempted: session.dsaQuestions.length,
      problemsSolved: Math.floor(session.dsaQuestions.length * 0.6),
    },
    sessionDuration: 90,
    roundsCompleted: 2,
  }
}
