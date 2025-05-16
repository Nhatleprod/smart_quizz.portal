import { useState } from "react";
import TestCard from "./TestCard";
import { ChevronRight, ChevronLeft } from "lucide-react";

const testData = new Array(6).fill({
  title: "TOEIC Reading Test 1",
  duration: 75,
  rating: 7.8,
  price: 1400,
  enroll: 120,
  tags: ["Toeic", "English"],
});

export default function TestGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  // Hàm đổi trang
  function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {testData.map((test, index) => (
          <TestCard key={index} {...test} />
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
          className="p-2 rounded bg-gray-100 hover:bg-gray-200"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
