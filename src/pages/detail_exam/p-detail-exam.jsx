import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function detailExamPage() {
  // dữ liệu test mặc định
  const examDetail = {
    id: "1",
    title: "Đề thi thử THPT Quốc Gia môn Toán năm 2023",
    subject: "Toán học",
    description:
      "Đề thi thử THPT Quốc Gia môn Toán được biên soạn bởi các giáo viên có nhiều năm kinh nghiệm giảng dạy và luyện thi. Đề thi bám sát cấu trúc và độ khó của đề thi chính thức, giúp học sinh làm quen với các dạng bài tập và cấu trúc đề thi thực tế.",
    totalQuestions: 50,
    totalTime: 90, // minutes
    difficulty: "Trung bình - Khó",
    author: "TS. Nguyễn Văn A",
    dateCreated: "15/04/2023",
    lastUpdated: "20/05/2023",
    totalAttempts: 1250,
    averageScore: 7.5,
    passRate: 68,
    rating: 4.7,
    totalRatings: 256,
    tags: ["THPT Quốc Gia", "Toán học", "Đề thi thử", "2023"],
    notes: [
      "Đề thi gồm 50 câu hỏi trắc nghiệm, mỗi câu 0.2 điểm.",
      "Thời gian làm bài mặc định là 90 phút.",
      "Học sinh nên đọc kỹ đề bài trước khi làm.",
      "Nên làm các câu dễ trước để đảm bảo thời gian và điểm số.",
      "Đề thi có độ khó tương đương với đề thi chính thức.",
    ],
    relatedExams: [
      { id: "2", title: "Đề thi thử THPT Quốc Gia môn Toán năm 2022" },
      {
        id: "3",
        title: "Đề thi thử THPT Quốc Gia môn Toán - Đề số 2 năm 2023",
      },
      {
        id: "4",
        title:
          "Đề thi thử THPT Quốc Gia môn Toán - Trường THPT Chuyên Lê Hồng Phong",
      },
    ],
  };

  // Dữ liệu giả lập comment
  const comments = [
    {
      id: "1",
      user: {
        id: "user1",
        name: "Ngô Thành Tiến",
        avatar: "https://danviet.ex-cdn.com/files/f1/296231569849192448/2024/6/13/son-tung-mtp-17182382517241228747767.jpg",
      },
      content:
        "Đề thi khá sát với cấu trúc đề thi thật. Mình làm được 42/50 câu, các bạn nên thử sức với đề này.",
      date: "10/06/2023",
      likes: 24,
    },
    {
      id: "2",
      user: {
        id: "user4",
        name: "Jack Bến Tre",
        avatar: "https://anhnail.vn/wp-content/uploads/2025/01/jack-j97-bo-con-meme-12.webp",
      },
      content:
        "Đề thi có độ khó vừa phải, nhưng có một số câu hỏi về tích phân khá khó. Mình nghĩ cần ôn kỹ phần này.",
      date: "15/06/2023",
      likes: 15,
    },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 px-4 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Exam header */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {examDetail.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl font-bold">{examDetail.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  <span>{examDetail.subject}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>Cập nhật: {examDetail.lastUpdated}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span>{examDetail.totalAttempts} lượt thi</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{examDetail.totalTime} phút</span>
                </div>
              </div>
            </div>
            {/* Tab cho các thông tin khác/mở rộng thêm*/}
            <div className="flex bg-gray-300 rounded-[5px] p-2">
                <div className="flex space-x-2">
                    <button className="px-[105px] py-2 rounded-[5px] bg-white font-semibold text-base shadow-sm transition-all duration-200 cursor-pointer">
                    Mô tả
                    </button>
                    <button className="px-[105px] py-2 rounded-[5px] hover:bg-blue-50 font-medium text-base transition-all duration-200   hover:border-blue-200 cursor-pointer">
                    Lưu ý
                    </button>
                    <button className="px-[105px] py-2 rounded-[5px] hover:bg-blue-50 font-medium text-base transition-all duration-200  hover:border-blue-200 cursor-pointer">
                    Thống kê
                    </button>
                </div>
            </div>

            {/* Mô tả đề thi*/}
            <div className="py-4">
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Thông tin đề thi
                  </h2>
                  <p className="text-gray-600">{examDetail.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Số câu hỏi:</span>
                      <span className="font-medium">
                        {examDetail.totalQuestions} câu
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Thời gian:</span>
                      <span className="font-medium">
                        {examDetail.totalTime} phút (đề xuất)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Độ khó:</span>
                      <span className="font-medium">
                        {examDetail.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tác giả:</span>
                      <span className="font-medium">{examDetail.author}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Ngày tạo:</span>
                      <span className="font-medium">
                        {examDetail.dateCreated}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Cập nhật:</span>
                      <span className="font-medium">
                        {examDetail.lastUpdated}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Radiobutton thời gian làm và bắt đầu làm bài */}
            <div className="border rounded-lg overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Bắt đầu làm bài</h2>
                <p className="text-sm text-gray-500">
                  Chọn thời gian làm bài và bắt đầu
                </p>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-3">
                      Chọn thời gian làm bài:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="time-60"
                          name="time"
                          value="60"
                          className="h-4 w-4 text-blue-600"
                        />
                        <label htmlFor="time-60" className="text-sm">
                          60 phút
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="time-90"
                          name="time"
                          value="90"
                          checked
                          className="h-4 w-4 text-blue-600"
                        />
                        <label htmlFor="time-90" className="text-sm">
                          90 phút (Đề xuất)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="time-120"
                          name="time"
                          value="120"
                          className="h-4 w-4 text-blue-600"
                        />
                        <label htmlFor="time-120" className="text-sm">
                          120 phút
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t bg-gray-50">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer">
                  Bắt đầu làm bài
                </button>
              </div>
            </div>

            {/* User ratings section */}
            <div className="border rounded-lg overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">
                  Đánh giá từ người dùng
                </h2>
              </div>
              <div className="p-4">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Overall rating */}
                  <div className="md:w-1/3 flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-5xl font-bold text-gray-800 mb-2">
                      {examDetail.rating}
                    </div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill={
                            star <= Math.floor(examDetail.rating)
                              ? "gold"
                              : "none"
                          }
                          stroke="gold"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      {examDetail.totalRatings} đánh giá
                    </div>
                  </div>

                  {/* Rating breakdown */}
                  <div className="md:w-2/3">
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center">
                          <div className="w-12 text-sm text-gray-600">
                            {rating} sao
                          </div>
                          <div className="flex-1 mx-2">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400"
                                style={{
                                  width: `${
                                    rating === 5
                                      ? "70"
                                      : rating === 4
                                      ? "20"
                                      : rating === 3
                                      ? "5"
                                      : rating === 2
                                      ? "3"
                                      : "2"
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="w-10 text-sm text-gray-500 text-right">
                            {rating === 5
                              ? "70%"
                              : rating === 4
                              ? "20%"
                              : rating === 3
                              ? "5%"
                              : rating === 2
                              ? "3%"
                              : "2%"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Bình luận ({comments.length})
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sắp xếp theo:</span>
                  <select className="border rounded-md px-2 py-1 text-sm">
                    <option value="newest">Mới nhất</option>
                    <option value="oldest">Cũ nhất</option>
                    <option value="popular">Phổ biến nhất</option>
                  </select>
                </div>
              </div>

              {/* Thêm Comment: user*/}
              <div className="border rounded-lg p-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src="https://cdn.prod.website-files.com/65b95c11ae04f06420162f26/65d7aec04aa4d730958b4951_gs-student-center-hero.webp"
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <textarea
                      placeholder="Viết bình luận của bạn..."
                      className="w-full border rounded-md p-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-700"
                    ></textarea>
                    <div className="flex justify-end">
                      <button className="px-4 py-2 rounded-md flex items-center bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                        Gửi bình luận
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Danh sách các comment */}
              <div className="space-y-6 p-2 border-1 rounded-lg">
                <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="rounded-lg overflow-hidden">
                    <div className="p-4">
                      {/* Comment */}
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                          <img
                            src={comment.user.avatar || "/placeholder.svg"}
                            alt={comment.user.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">
                                {comment.user.name}
                              </h4>
                              <p className="text-xs text-gray-500">
                                {comment.date}
                              </p>
                            </div>
                            <div className="relative">
                              <button className="p-1 rounded-full hover:bg-gray-100">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <circle cx="12" cy="12" r="1" />
                                  <circle cx="19" cy="12" r="1" />
                                  <circle cx="5" cy="12" r="1" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <p className="mt-2">{comment.content}</p>
                          <div className="mt-2 flex items-center gap-4">
                            <button className="flex items-center text-gray-500 hover:text-gray-700">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-[18px] w-[18px] mr-1"
                              >
                                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                              </svg>
                              <span>{comment.likes}</span>
                            </button>

                            <button className="flex items-center text-gray-500 hover:text-gray-700">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-[18px] w-[18px] mr-1"
                              >
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                              </svg>
                              <span>Phản hồi</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Related exams */}
            <div className="border rounded-lg overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-bold text-xl">Đề thi liên quan</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {examDetail.relatedExams.map((exam, index) => (
                    <div key={exam.id} className="flex items-start gap-3">
                      <div className="bg-gray-200 p-5 rounded-md h-12 w-12 flex items-center justify-center text-lg font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <a href={`/exam-detail/${exam.id}`} className="font-medium hover:underline line-clamp-2">
                          {exam.title}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
