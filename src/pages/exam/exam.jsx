"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Circle, Clock } from "lucide-react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

// Mock data for the exam with new structure
const mockExam = {
  id: "exam-001",
  title: "Đề thi thử THPT Quốc Gia môn Toán",
  duration: 60, // in minutes
  totalQuestions: 10,
  questions: Array.from({ length: 10 }, (_, i) => ({
    id: `question-${i + 1}`,
    examId: "exam-001",
    content: `Câu ${i + 1}: Tính giá trị của biểu thức sau: ${Math.floor(Math.random() * 10) + 1} + ${Math.floor(Math.random() * 10) + 1} = ?`,
    answer: [
      {
        id: "A",
        content: `${Math.floor(Math.random() * 20) + 1}`,
        isCorrect: false,
        explanation: null,
        },
      { 
        id: "B", 
        content: `${Math.floor(Math.random() * 20) + 1}`,
        isCorrect: false,
        explanation: null,
      },
      { 
        id: "C", 
        content: `${Math.floor(Math.random() * 20) + 1}`,
        isCorrect: false,
        explanation: null,
      },
      { 
        id: "D",
        content: `${Math.floor(Math.random() * 20) + 1}`,
        isCorrect: false,
        explanation: null,
      },
    ],
    correctAnswer: "A",
  })),
}

export default function ExamPage({ params }) {
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(mockExam.duration * 60) // in seconds
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState(null) // For sidebar navigation

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Handle timer
  useEffect(() => {
    if (timeLeft <= 0 || isSubmitted) return

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
  }, [timeLeft, isSubmitted])

  // Calculate progress
  const progress = (Object.keys(answers).length / mockExam.totalQuestions) * 100

  // Handle answer selection
  const handleAnswerSelect = (questionId, answerId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }))
  }

  // Handle submit
  const handleSubmit = () => {
    setIsSubmitted(true)
    alert(`Bài thi đã được nộp! Bạn đã hoàn thành ${Object.keys(answers).length}/${mockExam.totalQuestions} câu hỏi.`)
  }

  // Khi click vào câu hỏi bên bảng: thì sẽ di chuyển xuống câu tương ứng
  const scrollToQuestion = (questionId) => {
    setActiveQuestion(questionId)
    const element = document.getElementById(`question-${questionId}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // check bên bảng nhỏ danh sách câu hỏi
  const getQuestionStatusIcon = (questionId) => {
    if (answers[questionId]) {
      return <CheckCircle className="h-4 w-4 text-green-500" />
    }
    return <Circle className="h-4 w-4 text-gray-400" />
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto py-4 px-4 mt-20">
      {/* progress và tiêu đề bài*/}
      <div className="left-0 right-0 z-20 -mb-20">
        <div className="container mx-auto py-3 px-4">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold">{mockExam.title}</h1>
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
              {Object.keys(answers).length}/{mockExam.totalQuestions}
            </span>
          </div>
        </div>
      </div>

      {/* */}
      <div className="mt-24 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* bảng câu hỏi nhỏ */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="sticky top-28">
            <div className="border rounded-lg">
              <div className="p-4">
                <h2 className="text-lg font-medium mb-4">Danh sách câu hỏi</h2>
                <div className="grid grid-cols-5 gap-2">
                  {mockExam.questions.map((question, index) => (
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
                {mockExam.questions.map((question, index) => (
                  <div key={question.id} id={`question-${question.id}`} className="pb-6 border-b last:border-b-0">
                    <h3 className="text-lg font-medium mb-4">{question.content}</h3>

                    <div className="space-y-3">
                      {question.answer.map((option,idx) => (
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
                          />
                          <label htmlFor={`${question.id}-option-${option.id}`} className="flex-1 cursor-pointer">
                            <span className="font-medium mr-2">{String.fromCharCode(65+idx)}.</span>
                            {option.content}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* nut nop bai */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setIsSubmitDialogOpen(true)}
                  disabled={isSubmitted}
                  className={`px-[80px] py-3 rounded-md text-lg ${
                    isSubmitted
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Nộp bài
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog xac nhan nop bai*/}
      {isSubmitDialogOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Xác nhận nộp bài</h2>
                <p className="text-gray-500 mt-2">
                  Bạn đã trả lời {Object.keys(answers).length}/{mockExam.totalQuestions} câu hỏi.
                </p>
                {Object.keys(answers).length < mockExam.totalQuestions && (
                  <p className="text-red-500 mt-2">
                    Bạn còn {mockExam.totalQuestions - Object.keys(answers).length} câu hỏi chưa trả lời.
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                  onClick={() => setIsSubmitDialogOpen(false)}
                >
                  Quay lại làm bài
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={() => {
                    handleSubmit()
                    setIsSubmitDialogOpen(false)
                  }}
                >
                  Xác nhận nộp bài
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
      <Footer/>
    </div> 
    
  )
}
