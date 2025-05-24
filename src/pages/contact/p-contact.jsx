import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto py-12 px-4 mt-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Liên hệ với chúng tôi</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Bạn có câu hỏi hoặc cần hỗ trợ? Đừng ngần ngại liên hệ với chúng tôi. Đội ngũ hỗ trợ của chúng tôi luôn sẵn
            sàng giúp đỡ bạn.
          </p>
        </div>

        {/* Grid chính */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Thông tin liên hệ */}
          <div className="lg:col-span-1 space-y-6 ">
            {/* Card Thông tin liên hệ */}
            <div className="bg-white shadow rounded-lg p-6 border">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Thông tin liên hệ</h2>
                <p className="text-gray-500 text-sm">Liên hệ với chúng tôi qua các phương thức sau</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <FiMapPin className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium">Địa chỉ</h3>
                    <p className="text-sm text-gray-500">123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <FiPhone className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium">Điện thoại</h3>
                    <p className="text-sm text-gray-500">(028) 1234 5678</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <FiMail className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-gray-500">support@examprep.edu.vn</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Giờ làm việc */}
            <div className="bg-white shadow rounded-lg p-6 border">
              <h2 className="text-xl font-semibold mb-4">Giờ làm việc</h2>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Thứ Hai - Thứ Sáu:</span>
                  <span>8:00 - 17:30</span>
                </div>
                <div className="flex justify-between">
                  <span>Thứ Bảy:</span>
                  <span>8:00 - 12:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Chủ Nhật:</span>
                  <span>Đóng cửa</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form liên hệ */}
          <div className="lg:col-span-2 border rounded-lg">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Gửi tin nhắn cho chúng tôi</h2>
                <p className="text-gray-500 text-sm">
                  Điền thông tin của bạn và chúng tôi sẽ liên hệ lại trong thời gian sớm nhất
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Họ và tên
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Nhập họ và tên của bạn..."
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Nhập địa chỉ email của bạn..."
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Số điện thoại
                  </label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="Nhập số điện thoại của bạn"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Tiêu đề
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Nhập tiêu đề tin nhắn"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Nội dung tin nhắn
                  </label>
                  <textarea
                    id="message"
                    placeholder="Nhập nội dung tin nhắn của bạn"
                    rows={5}
                    className="text-base w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition duration-300 hover:-translate-y-1"
                >
                  Gửi tin nhắn
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bản đồ */}
        <div className="mt-12">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden h-[400px]">
              <img
                src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2025/01/cach-xoa-dia-chi-tren-google-map-4.jpg"
                alt="Bản đồ"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="text-center text-white p-6 bg-black/80 rounded-lg">
                  <h3 className="text-xl font-medium mb-2">Bản đồ</h3>
                  <p className="text-stone-300 mb-4">Đây là vị trí của chúng tôi trên bản đồ</p> 
                  <button className="border-2 bg-white text-black px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 hover:scale-105 cursor-pointer">
                    Xem bản đồ đầy đủ
                  </button>
                </div>
            </div>            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
