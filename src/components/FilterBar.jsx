const filters = [
  "Tất cả",
  "Toán",
  "Tiếng Anh",
  "Vật Lý",
  "Toeic",
  "HSK1",
  "HSK2",
];

export default function FilterBar() {
  return (
    <section className="mt-8 px-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-gray-700 font-semibold text-2xl">
          Thư viện đề thi
        </div>
      </div>

      <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
        {filters.map((f, i) => (
          <button
            key={i}
            className={`px-4 py-1 rounded-full whitespace-nowrap text-sm font-semibold ${
              i === 0 ? "bg-blue-300 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {f}
          </button>
        ))}
        <span className="ml-2 text-gray-500">.....</span>
      </div>
    </section>
  );
}
