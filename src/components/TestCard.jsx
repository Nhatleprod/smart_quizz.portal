import { Star } from "lucide-react";

export default function TestCard({
  title,
  duration,
  rating,
  count_user_make,
  enroll,
  tags,
}) {
  return (
    <div className="h-[300px] border rounded-lg shadow-sm p-4 flex flex-col justify-between">
      <div>
        <h3 className="font-semibold text-xl mb-5">{title}</h3>
        <div className="flex items-center gap-2 text-base text-gray-600 mb-2">
          <span>🕒 {duration} phút</span>
          <span className="text-base flex items-center gap-1">
            <Star size={14} className="text-yellow-400" /> {rating}/10
          </span>
        </div>
        <div className="text-base text-gray-700 mb-3">✍️ {count_user_make}</div>
        <div className="text-base text-gray-700 mb-3">📢 {enroll}</div>
        <div className="text-base text-gray-700 mb-3">
          📚 3 Phần | 100 câu hỏi
        </div>
        <div className="text-base space-x-2">
          {tags.map((tag, idx) => (
            <span key={idx} className="text-blue-500 font-medium">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <a href="/detail_exam" className="mt-4 bg-blue-600 text-center hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer transition duration-400 hover:scale-105">
      <button className="">
          Chi tiết
      </button>
      </a>
        
    </div>
  );
}
