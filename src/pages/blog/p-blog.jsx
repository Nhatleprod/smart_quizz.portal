import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const blogPosts = [
  {
    id: 1,
    title: "Cách học hiệu quả cho kỳ thi THPT Quốc Gia",
    excerpt: "Những phương pháp học tập hiệu quả giúp bạn đạt điểm cao trong kỳ thi THPT Quốc Gia sắp tới...",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1PBqicRE5CrQ3e5dhCVvhdLXEsrPyKQUJYw&s",
    date: "15/05/2025",
    author: "Ngô Thành Tiến",
    readTime: "5 phút",
    category: "Phương pháp học",
  },
  {
    id: 2,
    title: "10 bí quyết giải nhanh bài tập Toán học",
    excerpt: "Khám phá những mẹo giúp bạn giải nhanh các dạng bài tập Toán học thường gặp trong các đề ...",
    image: "https://cdnphoto.dantri.com.vn/F2WBJosx0ieP9awvTjq12qLkvHM=/thumb_w/960/2020/12/25/toan-hoc-1-1608861363353.jpg",
    date: "20/05/2022",
    author: "Trần Thị B",
    readTime: "8 phút",
    category: "Toán học",
  },
  {
    id: 3,
    title: "Phân tích cấu trúc đề thi Tiếng Anh năm 2023",
    excerpt: "Cùng phân tích cấu trúc và độ khó của đề thi Tiếng Anh THPT Quốc Gia năm 2023...",
    image: "https://acet.edu.vn/wp-content/uploads/2020/05/hoc-tieng-anh.jpg",
    date: "25/05/2024",
    author: "Lê Văn C",
    readTime: "6 phút",
    category: "Tiếng Anh",
  },
  {
    id: 4,
    title: "Những lỗi thường gặp khi làm bài thi trắc nghiệm",
    excerpt: "Tránh những sai lầm phổ biến khi làm bài thi trắc nghiệm để cải thiện điểm số...",
    image: "https://imageio.forbes.com/specials-images/imageserve/64fafd47f3f861fc9bf9e2c7/Portrait-of-an-woman-in-front-of-her-laptop-grabbing-her-head-after-she-makes-a-big/960x0.jpg?format=jpg&width=960",
    date: "15/05/2025",
    author: "Phạm Thị D",
    readTime: "7 phút",
    category: "Kỹ năng thi",
  },
];

const categories_blog = [
  "Tất cả",
  "Phương pháp học",
  "Toán học",
  "Vật lý",
  "Hóa học",
  "Sinh học",
  "Tiếng Anh",
  "Ngữ văn",
  "Lịch sử",
  "Địa lý",
  "Kỹ năng thi",
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="w-full flex-grow p-4 mt-16">
        <div className="container mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-center w-full text-5xl md:tetxt-5xl font-bold text-blue-600 mb-5">Nơi chia sẻ các kinh nghiệm quý báu cho các sĩ tử</h1>
            <p className="text-stone-500 text-xl text-center mb-20">Chia sẻ kiến thức, phương pháp học tập và kinh nghiệm luyện thi</p>
          </div>
          <h2 className="col-span-1 text-3xl  md:tetxt-3xl mb-6 font-medium">Danh mục bài viết nổi bật</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/*Danh mục các bài viết nổi bật */}
            <div className="lg:col-span-2">  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts.map((post) => (
                  <div key={post.id} className="bg-stone-200 rounded-lg shadow overflow-hidden">
                    <div className="p-0">
                      <div className="relative h-48 w-full">
                        <img src={post.image} alt={post.title} className="object-cover h-full w-full" />
                      </div>
                    </div>
                    <div className="p-4">
                      <span className="text-sm inline-block bg-black text-white p-2 rounded-3xl mb-2 font-semibold">
                        {post.category}
                      </span>
                      <h2 className="text-xl font-bold mb-2 line-clamp-2">
                        <a href={`/blog/${post.id}`} className="hover:underline">
                          {post.title}
                        </a>
                      </h2>
                      <p className="text-gray-600 line-clamp-3 mb-3">{post.excerpt}</p>
                    </div>
                    <div className="p-4 pt-0 justify-between flex items-center text-sm text-gray-500">
                      <div className="flex items-center mr-4">
                        <span className="ml-1 text-[15px]">👤 {post.author}</span>
                      </div>
                      <div className="flex items-center mr-4">
                        <span className="ml-1 text-[15px]">📅 {post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="ml-1 text-[15px]">⏰ {post.readTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:scale-105 hover:bg-blue-800 transition-transform duration-500 hover:-translate-y-1 cursor-pointer">Xem thêm bài viết</button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow border-1">
                {/* Tìm kiếm */}
                <div className="p-4">
                  <h3 className="text-xl font-bold">Tìm kiếm</h3>
                </div>
                <div className="p-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm bài viết..."
                      className="w-full rounded-md border px-3 py-2 text-[15px]"
                    />
                    <button className="absolute right-0 top-0 h-full bg-blue-600 text-white px-6 rounded-md text-lg font-semibold cursor-pointer hover:bg-blue-800">⌕ Tìm</button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow border-1">
                <div className="p-4">
                  <h3 className="text-xl font-bold">Danh mục</h3>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {categories_blog.map((category, index) => (
                      <li key={index}>
                        <a
                          href={`/blog/category/${category}`}
                          className="text-[15px] hover:underline hover:text-blue-600"
                        >
                          {category}
                        </a>
                        {index < categories_blog.length - 1 && <hr className="border-gray-200 my-2" />}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow border-1">
                <div className="p-4">
                  <h3 className="text-xl font-bold">Bài viết nổi bật</h3>
                </div>
                <div className="p-4 space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex gap-3">
                      <div className="h-16 w-16 flex-shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="object-cover rounded-md w-full h-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm line-clamp-2">
                          <a href={`/blog/${post.id}`} className="hover:underline">
                            {post.title}
                          </a>
                        </h4>
                        <p className="text-xs text-gray-500">{post.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
