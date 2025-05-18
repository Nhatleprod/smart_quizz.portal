import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaSearch } from "react-icons/fa";
const navbarItems =[
  { name: "Trang chủ", path: "/" },
  { name: "Bài viết", path: "/pages/blog" },
  { name: "Khóa học", path: "#" },
  { name: "Liên hệ", path: "/pages/contact" },
]
export default function Navbar() {
  const { isLoggedIn, handleLogout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-4 px-10 border-b border-gray-300 bg-white">
      <div className="flex items-center space-x-2">
        <img
          src="https://img.icons8.com/color/48/000000/graduation-cap.png"
          alt="logo"
          className="w-[40px] h-[40px]"
        />
        <h1 className="text-blue-700 font-bold text-3xl">E-Allbest</h1>
      </div>
      <nav className="flex space-x-10 text-shadow-lg font-medium text-gray-700">
        {navbarItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="relative group inline-block hover:text-blue-700 transition duration-400 font-bold"
          >
            {item.name}
            <span className="absolute left-0 -bottom-2 h-1 w-full bg-blue-700 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
          </Link>  
        ))}
      </nav>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Nhập từ khóa tìm kiếm ....."
          className="border p-2 w-[400px] focus:outline-black rounded-sm"
        />
        <button className="bg-blue-500 text-white rounded-sm py-3 px-5 cursor-pointer hover:bg-blue-700 transition duration-300 hover:scale-105">
          <FaSearch className="text-white"/>
        </button>
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="bg-black cursor-pointer text-white px-4 py-2 rounded ml-2 transition-transform duration-300 hover:translate-y-2 hover:bg-gray-700"
            >
              Đăng Nhập
            </Link>
            <Link
              to="/register"
              className="border-black cursor-pointer px-5 py-2 border rounded ml-2 transition-transform duration-300 hover:translate-y-2 hover:bg-gray-300"
            >
              Đăng Ký
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-1 rounded ml-2"
          >
            Đăng Xuất
          </button>
        )}
      </div>
    </header>
  );
}
