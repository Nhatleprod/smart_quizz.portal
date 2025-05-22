import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaSearch, FaBook, FaGraduationCap } from "react-icons/fa";
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { toast } from 'react-toastify';
import { getUserFromToken } from '../utils/tokenUtils';
import axios from 'axios';

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

const SearchDropdown = ({ searchResults, isLoading, onClose, onSelectExam }) => {
  const getLevelColor = (level) => {
    switch (level) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelText = (level) => {
    switch (level) {
      case 'easy':
        return 'Dễ';
      case 'medium':
        return 'Trung bình';
      case 'hard':
        return 'Khó';
      default:
        return 'Không xác định';
    }
  };

  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-gray-600">Đang tìm kiếm...</span>
        </div>
      </div>
    );
  }

  if (searchResults.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
        <div className="flex items-center justify-center text-gray-500">
          <FaSearch className="mr-2" />
          <span>Không tìm thấy kết quả nào</span>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      <div className="p-2">
        <div className="text-xs text-gray-500 mb-2 px-2">
          Tìm thấy {searchResults.length} kết quả
        </div>
        {searchResults.map((exam) => (
          <div
            key={exam.id}
            onClick={() => onSelectExam(exam)}
            className="p-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors duration-200 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 flex-1">
                {exam.title}
              </h4>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getLevelColor(exam.level)}`}>
                {getLevelText(exam.level)}
              </span>
            </div>
            
            <p className="text-gray-600 text-xs mb-2 line-clamp-2">
              {exam.description}
            </p>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-3">
                <span className="flex items-center">
                  <FaBook className="mr-1" />
                  {exam.category}
                </span>
                <span className="flex items-center">
                  <FaGraduationCap className="mr-1" />
                  {exam.questionCount} câu hỏi
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                {exam.avgRating > 0 && (
                  <span className="flex items-center">
                    <svg className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {exam.avgRating.toFixed(1)}
                  </span>
                )}
                <span>{exam.attemptCount} lượt thi</span>
              </div>
            </div>
          </div>
        ))}
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
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const searchTimeoutRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Memoize active path để tránh re-render không cần thiết
  const activePath = useMemo(() => location.pathname, [location.pathname]);

  // API URL từ env
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

  // Debounced search function
  const performSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await axios.get(`${API_URL}/exams`, {
        params: { title: query.trim(),
          description: query.trim(),
          category: query.trim()
         }
      });
      setSearchResults(response.data || []);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Lỗi khi tìm kiếm');
      setSearchResults([]);
      setShowSearchResults(false);
    } finally {
      setIsSearching(false);
    }
  }, [API_URL]);

  // Handle search input change with debounce
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for debounce (500ms delay)
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(value);
    }, 500);
  }, [performSearch]);

  // Handle clicking outside search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }

      // Handle user menu outside click
      const menu = document.querySelector('.user-menu');
      const trigger = document.querySelector('.user-menu-trigger');
      
      if (showUserMenu && menu && trigger && 
          !menu.contains(event.target) && 
          !trigger.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

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
      navigate('/login');
    } finally {
      setIsLoggingOut(false);
    }
  }, [logout, navigate]);

  // Handle search form submit
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // You can navigate to a search results page here if needed
      // navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      performSearch(searchQuery);
    }
  }, [searchQuery, performSearch]);

  // Handle selecting an exam from search results
  const handleSelectExam = useCallback((exam) => {
    setShowSearchResults(false);
    setSearchQuery('');
    // Navigate to the exam detail page
    navigate(`/detail_exam/${exam.id}`);
  }, [navigate]);

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
        <div ref={searchContainerRef} className="relative">
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery.trim() && searchResults.length > 0 && setShowSearchResults(true)}
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

          {showSearchResults && (
            <SearchDropdown
              searchResults={searchResults}
              isLoading={isSearching}
              onClose={() => setShowSearchResults(false)}
              onSelectExam={handleSelectExam}
            />
          )}
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