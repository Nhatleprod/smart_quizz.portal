import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, handleLogout } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-300">
      <div className="flex items-center space-x-2">
        <img
          src="https://img.icons8.com/color/48/000000/graduation-cap.png"
          alt="logo"
          className="w-8 h-8"
        />
        <h1 className="text-blue-700 font-bold text-xl">E-Allbest</h1>
      </div>
      <nav className="flex space-x-6 text-sm font-medium text-gray-700">
        <Link to="/" className="text-blue-700 underline font-semibold">
          Trang chủ
        </Link>
        <Link to="#">Bài viết</Link>
        <Link to="#">Khóa học</Link>
        <Link to="#">Liên hệ</Link>
      </nav>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Nhập từ khóa tìm kiếm ....."
          className="border rounded-l px-3 py-1 w-48 focus:outline-none"
        />
        <button className="bg-blue-700 text-white px-3 py-1 rounded-r">
          🔍
        </button>

        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="bg-black text-white px-4 py-1 rounded ml-2"
            >
              Đăng Nhập
            </Link>
            <Link
              to="/register"
              className="border border-black px-4 py-1 rounded ml-2"
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
