import { Star } from "lucide-react";

export default function TestCard({
  title,
  duration,
  rating,
  price,
  enroll,
  tags,
}) {
  return (
    <div className="border rounded-lg shadow-sm p-4 flex flex-col justify-between">
      <div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
          <span>🕒 {duration} phút</span>
          <span className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400" /> {rating}/10
          </span>
        </div>
        <div className="text-sm text-gray-700 mb-1">💰 {price}</div>
        <div className="text-sm text-gray-700 mb-1">📢 {enroll}</div>
        <div className="text-sm text-gray-700 mb-2">
          📚 3 Phần | 100 câu hỏi
        </div>
        <div className="text-sm space-x-2">
          {tags.map((tag, idx) => (
            <span key={idx} className="text-blue-500 font-medium">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        Chi tiết
      </button>
    </div>
  );
}
