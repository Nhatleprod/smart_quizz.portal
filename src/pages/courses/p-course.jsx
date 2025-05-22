import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Star, Users, Clock, BookOpen, Filter } from "lucide-react";
export default function CoursePage() {
  const courses = [
    {
      id: 1,
      title: "Luyện thi THPT Quốc Gia môn Toán",
      description:
        "Khóa học cung cấp kiến thức và phương pháp giải nhanh các dạng bài tập Toán trong kỳ thi THPT Quốc Gia.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlD2gQTGoAKTyCfydnG9vADmd9AYn0boIbUg&s",
      instructor: "TG.Bùi Anh Tuấn",
      workat: "TRƯỜNG THPT CHUYÊN PHAN BỘI CHÂU",
      rating: 4.8,
      students: 1250,
      duration: "48 giờ",
      lessons: 36,
      price: 1200000,
      salePrice: 899000,
      discount: "-25%",
      tags: ["Toán học", "THPT Quốc Gia", "Hot"],
    },
    {
      id: 2,
      title: "Luyện thi THPT Quốc Gia môn Vật Lý",
      description:
        "Khóa học giúp học sinh nắm vững kiến thức trọng tâm và phương pháp giải các bài tập Vật Lý trong kỳ thi THPT Quốc Gia.",
      image: "https://trangtuyensinh.com.vn/wp-content/uploads/2022/02/nganh-vat-ly-hoc.jpg",
      instructor: "PGS. Trần Thị B",
      workat: "TRƯỜNG THPT CHUYÊN KHOA HỌC TỰ NHIÊN",
      rating: 4.7,
      students: 980,
      duration: "42 giờ",
      lessons: 32,
      price: 1100000,
      salePrice: 799000,
      discount: "-27%",
      tags: ["Vật Lý", "THPT Quốc Gia"],
    },
    {
      id: 3,
      title: "Luyện thi THPT Quốc Gia môn Hóa Học",
      description:
        "Khóa học cung cấp phương pháp học và giải bài tập Hóa học hiệu quả, giúp học sinh đạt điểm cao trong kỳ thi.",
      image: "https://i.ytimg.com/vi/mmQQmHlOtag/maxresdefault.jpg",
      instructor: "TS. Lê Văn C",
      workat: "TRƯỜNG THPT CHUYÊN LÊ QUÝ ĐÔN",
      rating: 4.9,
      students: 1120,
      duration: "45 giờ",
      lessons: 34,
      price: 1150000,
      salePrice: 849000,
      discount: "-26%",
      tags: ["Hóa Học", "THPT Quốc Gia", "Mới"],
    },
    {
      id: 4,
      title: "Luyện thi THPT Quốc Gia môn Tiếng Anh",
      description:
        "Khóa học giúp học sinh nắm vững ngữ pháp, từ vựng và các kỹ năng làm bài thi Tiếng Anh THPT Quốc Gia.",
      image: "https://giaoan123.com/images/tai-lieu/image/2024/05/20240516001450913.jpg",
      instructor: "ThS. Phạm Thị D",
      workat: "TRƯỜNG THPT HANOI - AMSTERDAM",
      rating: 4.6,
      students: 1450,
      duration: "50 giờ",
      lessons: 40,
      price: 1300000,
      salePrice: 999000,
      discount: "-23%",
      tags: ["Tiếng Anh", "THPT Quốc Gia", "Bán chạy"],
    },
    {
      id: 5,
      title: "Luyện thi THPT Quốc Gia môn Sinh Học",
      description:
        "Khóa học cung cấp kiến thức trọng tâm và phương pháp làm bài thi Sinh học hiệu quả.",
      image: "https://cdn.lawnet.vn/uploads/giao-duc/NTNT/sach-giao-khoa-sinh-hoc-12.jpg",
      instructor: "TS. Hoàng Văn E",
      workat: "TRƯỜNG THPT CHUYÊN QUỐC HỌC HUẾ",
      rating: 4.7,
      students: 870,
      duration: "40 giờ",
      lessons: 30,
      price: 1050000,
      salePrice: 749000,
      discount: "-29%",
      tags: ["Sinh Học", "THPT Quốc Gia"],
    },
    {
      id: 6,
      title: "Luyện thi THPT Quốc Gia môn Ngữ Văn",
      description:
        "Khóa học giúp học sinh nắm vững kiến thức văn học và kỹ năng làm bài thi Ngữ văn.",
      image: "https://image.tienphong.vn/600x315/Uploaded/2025/pcgycivo/2024_03_20/bia-shs-ngu-van-12-t1-ban-in-thu-1-1676.jpg",
      instructor: "PGS.TS. Ngô Thị F",
      workat: "TRƯỜNG THPT CHUYÊN LÊ HỒNG PHONG",
      rating: 4.8,
      students: 1050,
      duration: "46 giờ",
      lessons: 35,
      price: 1200000,
      salePrice: 899000,
      discount: "-25%",
      tags: ["Ngữ Văn", "THPT Quốc Gia", "Hot"],
    },
  ];
  const subjects = [
    "Tất cả",
    "Toán học",
    "Vật Lý",
    "Hóa Học",
    "Sinh Học",
    "Ngữ Văn",
    "Tiếng Anh",
    "Lịch Sử",
    "Địa Lý",
  ];
  const levels = ["THPT Quốc Gia", "Lớp 12", "Lớp 11", "Lớp 10", "THCS"];
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 px-4 mt-20">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2 text-center">Khóa học</h1>
          <p className="text-gray-600 text-lg text-center italic">
           🎉 Ưu đãi bùng nổ hè này dành cho toàn bộ các sĩ tử giảm từ 20% - 30% cho toàn bộ các khóa học 🎉
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="border rounded-lg overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Bộ lọc</h2>
                    <Filter className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-4 space-y-6">
                  {/* Search */}
                  <div className="space-y-2">
                    <label htmlFor="search" className="block text-base font-medium">Tìm kiếm</label>
                    <input
                      id="search"
                      type="text"
                      placeholder="Tìm kiếm khóa học..."
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Subject filter */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block font-medium text-base">Môn học</label>
                    <select
                      id="subject"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {subjects.map((subject, index) => (
                        <option
                          key={index}
                          value={
                            subject === "Tất cả" ? "all" : subject.toLowerCase()
                          }
                        >
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Level filter */}
                  <div className="space-y-2">
                    <span className="block text-base font-medium">Cấp độ</span>
                    <div className="space-y-2">
                      {levels.map((level, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={`level-${index}`}
                            className="h-4 w-4 rounded text-blue-600"
                          />
                          <label htmlFor={`level-${index}`} className="text-base font-normal"> {level} </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price filter */}
                  <div className="space-y-2">
                    <span className="block text-base font-medium">Giá</span>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="price-free"
                          className="h-4 w-4 rounded text-blue-600"
                        />
                        <label htmlFor="price-free" className="text-base font-normal"> Miễn phí </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="price-paid"
                          className="h-4 w-4 rounded text-blue-600"
                        />
                        <label htmlFor="price-paid" className="text-base font-normal" > Trả phí </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="price-discount"
                          className="h-4 w-4 rounded text-blue-600"
                        />
                        <label htmlFor="price-discount"className="text-base font-normal" >Đang giảm giá</label>
                      </div>
                    </div>
                  </div>

                  {/* Rating filter */}
                  <div className="space-y-2">
                    <span className="block text-base font-medium">Đánh giá</span>
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2" >
                          <input
                            type="checkbox"
                            id={`rating-${rating}`}
                            className="h-4 w-4 rounded text-blue-600"
                          />
                          <label htmlFor={`rating-${rating}`} className="text-sm font-normal flex items-center" >
                            <span className="flex items-center">
                              {Array(rating)
                                .fill(0)
                                .map((_, i) => (
                                  <Star
                                    key={i}
                                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                  />
                                ))}
                              {Array(5 - rating)
                                .fill(0)
                                .map((_, i) => (
                                  <Star key={i} className="h-4 w-4 text-gray-300" />
                                ))}
                            </span>
                            <span className="ml-1 text-base">& up</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Áp dụng bộ lọc
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Courses grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-gray-600 text-xl font-bold">
                 💯 CÁC KHÓA HỌC NỔI BẬT TẠI E-ALLBEST 💯
                </span>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="whitespace-nowrap text-base"> Sắp xếp theo: </label>
                <select id="sort" className="w-[180px] px-3 py-1.5 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="popular">Phổ biến nhất</option>
                  <option value="newest">Mới nhất</option>
                  <option value="price-low">Giá: Thấp đến cao</option>
                  <option value="price-high">Giá: Cao đến thấp</option>
                  <option value="rating">Đánh giá cao nhất</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="border rounded-lg overflow-hidden flex flex-col h-full shadow-sm" >
                  <div className="relative">
                    <div className="relative h-48 w-full">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {course.discount && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {course.discount}
                      </span>
                    )}
                    {course.tags.includes("Hot") && (
                      <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Hot
                      </span>
                    )}
                    {course.tags.includes("Mới") && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Mới
                      </span>
                    )}
                    {course.tags.includes("Bán chạy") && (
                      <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Bán chạy
                      </span>
                    )}
                  </div>
                  <div className="p-4 pb-0">
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg line-clamp-2">
                        <a href={`/courses/${course.id}`} className="hover:underline"> {course.title} </a>
                      </h3>
                      <p className="text-sm text-gray-600">
                        Giảng viên: {course.instructor}
                      </p>
                      <p className="text-sm text-gray-600">
                        Nơi công tác: {course.workat}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 pt-2 flex-grow">
                    <div className="flex items-center text-sm mb-2">
                      <div className="flex items-center">
                        <span className="font-medium mr-1">
                          {course.rating}
                        </span>
                        <div className="flex">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(course.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                        </div>
                      </div>
                      <div className="flex items-center ml-4">
                        <Users className="h-4 w-4 mr-1 text-gray-500" />
                        <span className="text-gray-500">{course.students}</span>
                      </div>
                    </div>
                    <p className="text-sm line-clamp-2 mb-3">
                      {course.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>{course.lessons} bài học</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 pt-0 border-t mt-auto">
                    <div className="w-full flex justify-between items-center mt-2">
                      <div className="flex items-center">
                        <div className="text-lg font-bold text-blue-600">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(course.salePrice)}
                        </div>
                        {course.salePrice < course.price && (
                          <div className="text-sm line-through text-red-500 ml-2">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(course.price)}
                          </div>
                        )}
                      </div>
                      <button className="px-2 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button className="px-4 py-2 border rounded-md hover:bg-gray-50 mr-1"> ← </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"> 1 </button>
              <button className="px-4 py-2 border rounded-md hover:bg-gray-50 mx-1"> 2 </button>
              <button className="px-4 py-2 border rounded-md hover:bg-gray-50"> 3 </button>
              <button className="px-4 py-2 border rounded-md hover:bg-gray-50 ml-1"> ... </button>
              <button className="px-4 py-2 border rounded-md hover:bg-gray-50 ml-1"> → </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
