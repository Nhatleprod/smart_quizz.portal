import { Star } from "lucide-react";

export default function TestCard({
  title,
  avgRating,
  attemptCount,
  category,
  questionCount,
  onSelectExam,
}) {
  // Mặc định enroll = 120 như yêu cầu
  const enroll = 120;
  
  // Rating trên thang điểm 5 thay vì 10
  const rating = avgRating || 0;

  return (
    <div className="h-80 border rounded-lg shadow-sm p-4 flex flex-col">
      {/* Header Section */}
      <div className="flex-shrink-0 mb-4">
        <h3 className="font-semibold text-lg mb-3 line-clamp-2 leading-tight">
          {title}
        </h3>
      </div>
      
      {/* Content Section - Flexible space */}
      <div className="flex-grow space-y-2">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span>🕒 90 phút</span>
          <span className="flex items-center gap-1">
            <Star size={12} className="text-yellow-400 fill-current" /> 
            {rating}/5
          </span>
        </div>
        
        <div className="text-sm text-gray-700">✍️ {attemptCount} lượt thi</div>
        <div className="text-sm text-gray-700">📢 {enroll} đăng ký</div>
        <div className="text-sm text-gray-700">
          📚 1 Phần | {questionCount} câu hỏi
        </div>
        
        <div className="pt-2">
          <span className="text-blue-500 font-medium text-sm">
            #{category}
          </span>
        </div>
      </div>
      
      {/* Button Section - Fixed at bottom */}
      <div className="flex-shrink-0 pt-4">
        <button 
          onClick={onSelectExam}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium cursor-pointer transition-all duration-200 hover:scale-105"
        >
          Chi tiết
        </button>
      </div>
    </div>
  );
}