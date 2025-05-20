import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaSearch } from "react-icons/fa";
import { useState, useCallback, useMemo, useEffect } from "react";
import { toast } from 'react-toastify';
import { getUserFromToken } from '../utils/tokenUtils';

const NAVBAR_ITEMS = [
  { name: "Trang chủ", path: "/" },
  { name: "Bài viết", path: "/blog" },
  { name: "Khóa học", path: "/course" },
  { name: "Liên hệ", path: "/contact" },
];


const UserMenu = ({ user, onLogout, isLoggingOut, onClose }) => {
  const roleLabels = {
    'ADMIN': { label: 'Quản trị viên', color: 'bg-red-100 text-red-800', icon: '👑' },
    'TEACHER': { label: 'Giảng viên', color: 'bg-blue-100 text-blue-800', icon: '👨‍🏫' },
    'STUDENT': { label: 'Học viên', color: 'bg-green-100 text-green-800', icon: '👨‍🎓' },
    'USER': { label: 'Người dùng', color: 'bg-gray-100 text-gray-800', icon: '👤' }
  };

  const userRole = roleLabels[user.role] || roleLabels['USER'];

  const handleLogoutClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Logout button clicked');
    onLogout();
  };

  return (
    <div 
      className="absolute right-0 mt-3 w-72 bg-white rounded-lg shadow-lg py-3 z-50 border border-gray-200"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-5 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg">
              {user.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {user.fullName || user.username}
              </p>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${userRole.color}`}>
                <span className="mr-1">{userRole.icon}</span>
                {userRole.label}
              </span>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 truncate mt-2">{user.email}</p>
        <div className="mt-2 flex items-center text-xs text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Tham gia từ {new Date(user.createdAt).toLocaleDateString('vi-VN')}
        </div>
      </div>
      <div className="py-1">
        <Link
          to="/profile"
          className="flex items-center px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          onClick={onClose}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Thông tin cá nhân
        </Link>
        <Link
          to="/settings"
          className="flex items-center px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          onClick={onClose}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Cài đặt
        </Link>
      </div>
      <div className="border-t border-gray-200">
        <button
          type="button"
          onClick={handleLogoutClick}
          disabled={isLoggingOut}
          className="w-full text-left px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between cursor-pointer"
          style={{ pointerEvents: 'auto' }}
        >
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>{isLoggingOut ? 'Đang đăng xuất...' : 'Đăng Xuất'}</span>
          </div>
          {isLoggingOut && (
            <svg className="animate-spin h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Memoize active path để tránh re-render không cần thiết
  const activePath = useMemo(() => location.pathname, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside both the menu and the trigger button
      const menu = document.querySelector('.user-menu');
      const trigger = document.querySelector('.user-menu-trigger');
      
      if (showUserMenu && menu && trigger && 
          !menu.contains(event.target) && 
          !trigger.contains(event.target)) {
        console.log('Clicking outside menu');
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);


  const handleLogout = useCallback(async () => {
    console.log('handleLogout called');
    try {
      setIsLoggingOut(true);
      await logout();
      setShowUserMenu(false);
      toast.success('Đăng xuất thành công');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Đăng xuất thất bại');
      // Vẫn chuyển về trang login ngay cả khi có lỗi
      navigate('/login');
    } finally {
      setIsLoggingOut(false);
    }
  }, [logout, navigate]);

  // Xử lý search
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info('Tính năng tìm kiếm đang được phát triển');
    }
  }, [searchQuery]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-4 px-10 border-b border-gray-300 bg-white">
      <div className="flex items-center space-x-3">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="https://img.icons8.com/color/48/000000/graduation-cap.png"
            alt="logo"
            className="w-[40px] h-[40px]"
          />
          <h1 className="text-blue-700 font-bold text-3xl">E-ALLBEST</h1>
        </Link>
      </div>

      <nav className="flex space-x-12 text-shadow-lg font-medium text-gray-700 mx-8">
        {NAVBAR_ITEMS.map((item) => {
          const isActive = activePath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative group inline-block transition duration-400 ${
                isActive ? "text-blue-700 font-bold" : "text-gray-700"
              }`}
            >
              {item.name}
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
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nhập từ khóa tìm kiếm ....."
            className="border p-2 w-[400px] focus:outline-black rounded-sm"
          />
          <button 
            type="submit"
            className="bg-blue-500 text-white rounded-sm py-3 px-5 cursor-pointer hover:bg-blue-700 transition duration-300 hover:scale-105"
          >
            <FaSearch className="text-white"/>
          </button>
        </form>

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
              className="user-menu-trigger flex items-center space-x-3 px-5 py-2.5 rounded-lg transition-colors duration-200 bg-gray-100 hover:bg-gray-200"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <span className="font-medium text-gray-700">{user.username}</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showUserMenu && (
              <div className="user-menu">
                <UserMenu
                  user={user}
                  onLogout={handleLogout}
                  isLoggingOut={isLoggingOut}
                  onClose={() => setShowUserMenu(false)}
                />
              </div>
            )}
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Navbar;
