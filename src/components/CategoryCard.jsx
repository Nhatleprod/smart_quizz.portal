const categories = [
  {
    id: 1,
    title: "Math",
    img: "https://cdn-icons-png.flaticon.com/512/2991/2991251.png",
  },
  {
    id: 2,
    title: "English",
    img: "https://cdn-icons-png.flaticon.com/512/2991/2991218.png",
  },
  {
    id: 3,
    title: "Chemistry",
    img: "https://cdn-icons-png.flaticon.com/512/2991/2991260.png",
  },
  {
    id: 4,
    title: "Physics",
    img: "https://cdn-icons-png.flaticon.com/512/2991/2991247.png",
  },
];

export default function CategoryCards() {
  return (
    <>
      <section className="flex justify-center space-x-4 px-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="w-36 h-48 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow"
          >
            <img
              src={cat.img}
              alt={cat.title}
              className="w-full h-40 object-cover"
            />
            <div className="text-center mt-2 font-semibold">{cat.title}</div>
          </div>
        ))}
      </section>

      <div className="flex justify-center mt-4">
        <button className="text-blue-700 font-semibold flex items-center space-x-1 hover:underline">
          <span>Khám phá thêm</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </>
  );
}
