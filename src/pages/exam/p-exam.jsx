"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { CheckCircle, Circle, Clock } from "lucide-react"
import axios from "axios"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { useAuth } from "../../context/AuthContext"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

export default function ExamPage() {
  const [examData, setExamData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState(null)
  const { user } = useAuth()
  const { id } = useParams();
  const examId = id

  // Fetch exam questions
  useEffect(() => {
    const fetchExamQuestions = async () => {
      if (!examId) {
        setError("Exam ID not found")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await axios.get(`${API_URL}/questions/exam/${examId}`)
        
        if (response.data && Array.isArray(response.data)) {
          // Transform data to match the expected structure
          const transformedData = {
            id: examId,
            title: "Đề thi thử THPT Quốc Gia",
            duration: 60, // Default duration, you might want to get this from another API
            totalQuestions: response.data.length,
            questions: response.data.map((question, index) => ({
              id: question.id,
              examId: question.examId,
              content: question.content,
              answers: question.answers || [],
              correctAnswer: question.answers?.find(answer => answer.isCorrect)?.id || null
            }))
          }
          
          setExamData(transformedData)
          setTimeLeft(transformedData.duration * 60) // Set timer
        } else {
          setError("No questions found for this exam")
        }
      } catch (err) {
        console.error("Error fetching exam questions:", err)
        setError("Failed to load exam questions")
      } finally {
        setLoading(false)
      }
    }

    fetchExamQuestions()
  }, [examId])

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Handle timer
  useEffect(() => {
    if (timeLeft <= 0 || isSubmitted || !examData) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, isSubmitted, examData])

  // Calculate progress
  const progress = examData ? (Object.keys(answers).length / examData.totalQuestions) * 100 : 0

  // Handle answer selection
  const handleAnswerSelect = (questionId, answerId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }))
  }

  // Calculate score and prepare submission data
  const calculateScoreAndPrepareData = () => {
    if (!examData) return { score: 0, details: [] }

    let correctCount = 0
    const details = []

    examData.questions.forEach(question => {
      const selectedAnswerId = answers[question.id]
      if (selectedAnswerId) {
        const selectedAnswer = question.answers.find(ans => ans.id === selectedAnswerId)
        const isCorrect = selectedAnswer ? selectedAnswer.isCorrect : false
        
        if (isCorrect) {
          correctCount++
        }

        details.push({
          questionId: question.id,
          answerId: selectedAnswerId,
          isCorrect: isCorrect
        })
      }
    })

    const score = (correctCount / examData.totalQuestions) * 10
    return { score: Math.round(score * 100) / 100, details, correctCount }
  }

  // Handle submit
  const handleSubmit = async () => {
    if (!user || !examData || isSubmitting) return

    setIsSubmitting(true)
    
    try {
      const { score, details } = calculateScoreAndPrepareData()
      
      // Step 1: Create exam attempt
      const examAttemptResponse = await axios.post(`${API_URL}/exam_attempts`, {
        examId: examId,
        accountId: user.id,
        score: score
      })

      const examAttemptId = examAttemptResponse.data.id

      // Step 2: Create exam attempt details in bulk
      if (details.length > 0) {
        const bulkDetails = {
          details: details.map(detail => ({
            questionId: detail.questionId,
            examAttemptId: examAttemptId,
            isCorrect: detail.isCorrect,
            answerId: detail.answerId
          }))
        }
        console.log("Bulk details:", bulkDetails)
        
        await axios.post(`${API_URL}/exam_attempt_details/bulk`, bulkDetails)
      }

      setIsSubmitted(true)
      alert(`Bài thi đã được nộp thành công! 
  Điểm số: ${score}/10
  Số câu đúng: ${calculateScoreAndPrepareData().correctCount}/${examData.totalQuestions}`)

    } catch (error) {
      console.error("Error submitting exam:", error)
      alert("Có lỗi xảy ra khi nộp bài. Vui lòng thử lại!")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Scroll to question
  const scrollToQuestion = (questionId) => {
    setActiveQuestion(questionId)
    const element = document.getElementById(`question-${questionId}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Get question status icon
  const getQuestionStatusIcon = (questionId) => {
    if (answers[questionId]) {
      return <CheckCircle className="h-4 w-4 text-green-500" />
    }
    return <Circle className="h-4 w-4 text-gray-400" />
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto py-4 px-4 mt-20 flex items-center justify-center">
          <div>Đang tải đề thi...</div>
        </div>
        <Footer />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto py-4 px-4 mt-20 flex items-center justify-center">
          <div className="text-red-500">Lỗi: {error}</div>
        </div>
        <Footer />
      </div>
    )
  }

  // No exam data
  if (!examData) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto py-4 px-4 mt-20 flex items-center justify-center">
          <div>Không tìm thấy dữ liệu đề thi</div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto py-4 px-4 mt-20">
        {/* Progress và tiêu đề bài */}
        <div className="left-0 right-0 z-20 -mb-20">
          <div className="container mx-auto py-3 px-4">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl font-bold">{examData.title}</h1>
              <div className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-full">
                <Clock className="h-4 w-4" />
                <span className="font-medium">{formatTime(timeLeft)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Custom Progress Bar */}
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">
                {Object.keys(answers).length}/{examData.totalQuestions}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Bảng câu hỏi nhỏ */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-28">
              <div className="border rounded-lg">
                <div className="p-4">
                  <h2 className="text-lg font-medium mb-4">Danh sách câu hỏi</h2>
                  <div className="grid grid-cols-5 gap-2">
                    {examData.questions.map((question, index) => (
                      <button
                        key={question.id}
                        className={`h-10 w-10 p-0 relative rounded-md ${
                          activeQuestion === question.id
                            ? "bg-blue-600 text-white"
                            : "border border-gray-200 hover:bg-gray-50"
                        }`}
                        onClick={() => scrollToQuestion(question.id)}
                      >
                        <span>{index + 1}</span>
                        <span className="absolute -top-1 -right-1">{getQuestionStatusIcon(question.id)}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Đã trả lời</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Circle className="h-4 w-4 text-gray-400" />
                      <span>Chưa trả lời</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Danh sách hiển thị các câu hỏi */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="border rounded-lg">
              <div className="p-6">
                <div className="space-y-8">
                  {examData.questions.map((question, index) => (
                    <div key={question.id} id={`question-${question.id}`} className="pb-6 border-b last:border-b-0">
                      <h3 className="text-lg font-medium mb-4">
                        Câu {index + 1}: {question.content}
                      </h3>

                      <div className="space-y-3">
                        {question.answers.map((option, idx) => (
                          <div
                            key={option.id}
                            className={`flex items-center space-x-2 rounded-lg border p-4 transition-colors ${
                              answers[question.id] === option.id ? "bg-blue-100 border-blue-900" : ""
                            }`}
                          >
                            <input
                              type="radio"
                              id={`${question.id}-option-${option.id}`}
                              name={`question-${question.id}`}
                              value={option.id}
                              checked={answers[question.id] === option.id}
                              onChange={() => handleAnswerSelect(question.id, option.id)}
                              className="h-4 w-4 text-blue-600"
                              disabled={isSubmitted}
                            />
                            <label htmlFor={`${question.id}-option-${option.id}`} className="flex-1 cursor-pointer">
                              <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>
                              {option.content}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Nút nộp bài */}
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => setIsSubmitDialogOpen(true)}
                    disabled={isSubmitted || isSubmitting}
                    className={`px-20 py-3 rounded-md text-lg ${
                      isSubmitted || isSubmitting
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {isSubmitting ? "Đang nộp bài..." : isSubmitted ? "Đã nộp bài" : "Nộp bài"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dialog xác nhận nộp bài */}
        {isSubmitDialogOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
              <div className="p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">Xác nhận nộp bài</h2>
                  <p className="text-gray-500 mt-2">
                    Bạn đã trả lời {Object.keys(answers).length}/{examData.totalQuestions} câu hỏi.
                  </p>
                  {Object.keys(answers).length < examData.totalQuestions && (
                    <p className="text-red-500 mt-2">
                      Bạn còn {examData.totalQuestions - Object.keys(answers).length} câu hỏi chưa trả lời.
                    </p>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 border rounded-md hover:bg-gray-50"
                    onClick={() => setIsSubmitDialogOpen(false)}
                    disabled={isSubmitting}
                  >
                    Quay lại làm bài
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                    onClick={() => {
                      handleSubmit()
                      setIsSubmitDialogOpen(false)
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Đang nộp..." : "Xác nhận nộp bài"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}