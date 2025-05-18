import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo + Mạng xã hội */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <img
              src="https://img.icons8.com/color/48/000000/graduation-cap.png"
              alt="logo"
              className="w-10 h-10"
            />
            <h1 className="text-blue-700 font-bold text-3xl">E-Allbest</h1>
          </div>
          <div className="flex space-x-4">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} className="text-[#1877F2] text-3xl hover:scale-110 transition-transform duration-300" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} className="text-[#1DA1F2] text-3xl hover:scale-110 transition-transform duration-300" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="text-[#E1306C] text-3xl hover:scale-110 transition-transform duration-300" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} className="text-[#0077B5] text-3xl hover:scale-110 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* Về trang web */}
        <div>
          <h4 className="text-xl font-bold mb-4">Về trang web</h4>
          <ul className="text-gray-700 space-y-2">
            <li><a href='/' className='hover:underline hover:text-blue-600 cursor-pointer'>Trang chủ</a></li>
            <li><a href='#' className='hover:underline hover:text-blue-600 cursor-pointer'>Kho đề thi</a></li>
            <li><a href='#'className='hover:underline hover:text-blue-600 cursor-pointer'>Lịch thi</a></li>
            <li><a href='#' className='hover:underline hover:text-blue-600 cursor-pointer'>Hướng dẫn</a></li>
          </ul>
        </div>

        {/* Thông tin doanh nghiệp */}
        <div>
          <h4 className="text-xl font-bold mb-4 ">Thông tin doanh nghiệp</h4>
          <p className="text-stone-600 mb-2 text-base">🏚️ Công Ty TNHH: E-AllBest Viet Nam</p>
          <p className="text-stone-600 mb-2 text-base">☎ Hotline: 1900 8386</p>
          <div className="flex items-center space-x-2 mb-2 text-base">
            <FaMapMarkerAlt className="text-red-500 text-xl" />
            <span className="text-stone-600 text-base">Đà Nẵng, Việt Nam</span>
          </div>
          <p className="text-stone-600 mb-2 text-base">✉ Email: e-allbest2025@edu.vn</p>
        </div>

        {/* Tai nguyen/chinh sach su dung */}
        <div>
          <h4 className="text-xl font-bold mb-4">Tài nguyên</h4>
          <ul className="text-gray-700 space-y-2">
            <li><a className='hover:underline hover:text-blue-600 cursor-pointer'>Chính sách bảo mật</a></li>
            <li><a className='hover:underline hover:text-blue-600 cursor-pointer'>Điều khoản sử dụng</a></li>
            <li><a className='hover:underline hover:text-blue-600 cursor-pointer'>Liên hệ hỗ trợ</a></li>
            <li><a className='hover:underline hover:text-blue-600 cursor-pointer'>Câu hỏi thường gặp</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
