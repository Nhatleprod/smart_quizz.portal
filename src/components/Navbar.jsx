import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const navbarItems = [
    { name: "Trang chủ", path: "/" },
    { name: "Bài viết", path: "/pages/blog" },
    { name: "Khóa học", path: "#" },
    { name: "Liên hệ", path: "/pages/contact" },
  ];
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Debug log for auth state
  useEffect(() => {
    console.log('Navbar Auth State:', { user, isAuthenticated });
  }, [user, isAuthenticated]);

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-4 px-10 border-b border-gray-300 bg-white">
      <div className="flex items-center space-x-3">
        <img
          src="https://img.icons8.com/color/48/000000/graduation-cap.png"
          alt="logo"
          className="w-[40px] h-[40px]"
        />
        <h1 className="text-blue-700 font-bold text-3xl">E-ALLBEST</h1>
      </div>
      <nav className="flex space-x-12 text-shadow-lg font-medium text-gray-700 mx-8">
        {navbarItems.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`relative group inline-block transition duration-400 ${
                isActive ? "text-blue-700 font-bold" : "text-gray-700"
              }`}
            >
              {tab.name}
              <span
                className={`absolute left-0 -bottom-2 h-1 w-full bg-blue-700 transition-transform duration-500 origin-left ${
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              ></span>
            </Link>
          );
        })}
      </nav>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Nhập từ khóa tìm kiếm ....."
            className="border p-2 w-[400px] focus:outline-black rounded-sm"
          />
          <button className="bg-blue-500 text-white rounded-sm py-3 px-5 cursor-pointer hover:bg-blue-700 transition duration-300 hover:scale-105">
            <FaSearch className="text-white"/>
          </button>
        </div>

        {!isAuthenticated ? (
          <div className="flex items-center space-x-4 ml-4">
            <Link
              to="/login"
              className="bg-black cursor-pointer text-white px-6 py-2 rounded transition-transform duration-300 hover:translate-y-1 hover:bg-gray-700"
            >
              Đăng Nhập
            </Link>
            <Link
              to="/register"
              className="border-black cursor-pointer px-6 py-2 border rounded transition-transform duration-300 hover:translate-y-1 hover:bg-gray-300"
            >
              Đăng Ký
            </Link>
          </div>
        ) : user ? (
          <div className="relative ml-4">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 bg-gray-100 px-5 py-2.5 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {user.username?.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium text-gray-700">{user.username}</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-lg py-3 z-50 border border-gray-200">
                <div className="px-5 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900 mb-1">{user.username}</p>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  Đăng Xuất
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </header>
  );
}
