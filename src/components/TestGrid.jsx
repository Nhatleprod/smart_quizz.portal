import { useState, useEffect } from "react";
import TestCard from "./TestCard";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TestGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [examData, setExamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const totalPages = 5;
  const navigate = useNavigate();

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/exams`);
        setExamData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching exams:", err);
        setError("Không thể tải dữ liệu đề thi");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  // Hàm đổi trang
  function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }

  // Hàm xử lý click vào exam
  const handleSelectExam = (exam) => {
    navigate(`/detail_exam/${exam.id}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Đang tải...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {examData.map((exam) => (
          <TestCard 
            key={exam.id} 
            {...exam} 
            onSelectExam={() => handleSelectExam(exam)}
          />
        ))}
      </div>

      {/* Phân trang */}
      <div className="flex justify-end mt-6 items-center gap-2">
        <button
          className="p-2 rounded bg-gray-100 hover:bg-gray-200"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={20} />
        </button>
        {[...Array(totalPages).keys()].map((i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              className={`px-3 py-1 rounded border ${
                page === currentPage ? "bg-blue-500 text-white" : "bg-white"
              }`}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          );
        })}
        <button
          className="p-2 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}