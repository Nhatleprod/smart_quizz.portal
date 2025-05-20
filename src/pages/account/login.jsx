import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import LogoApp from "../../assets/logo2.png";
import { useLoginForm } from "../../hooks/useLoginForm";

export default function LoginPage() {
  const {
    formData,
    errors,
    isLoading,
    successMessage,
    handleChange,
    handleSubmit
  } = useLoginForm();

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-lg max-w-4xl w-full">
        {/* Left Form Section */}
        <div className="flex flex-col justify-center bg-gray-200 p-10 w-1/2 rounded-l-lg">
          <Link to="/" className="flex items-center space-x-2 mb-4 cursor-pointer">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="https://img.icons8.com/color/48/000000/graduation-cap.png"
                alt="logo"
                className="w-12 h-12"
              />
              <h1 className="text-gray-600 font-bold text-4xl">E-ALLBEST</h1>
            </div>
          </Link>
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-600">ĐĂNG NHẬP</h2>

          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded animate-fade-in">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                {successMessage}
              </div>
            </div>
          )}

          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded animate-fade-in">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                {errors.submit}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="font-semibold text-base text-stone-600">Tên đăng nhập</span>
              <input
                type="text"
                name="username"
                placeholder="Nhập tên đăng nhập"
                value={formData.username}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-lg text-base bg-gray-300 p-3 border ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                } focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none`}
              />
              {errors.username && (
                <span className="text-red-500 text-sm mt-1">{errors.username}</span>
              )}
            </label>

            <label className="block">
              <span className="font-semibold text-base text-stone-600">Mật khẩu</span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-lg text-base bg-gray-300 p-3 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none pr-10`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="text-lg"
                  />
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">{errors.password}</span>
              )}
            </label>

            <div className="flex justify-between items-center text-sm text-gray-700">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="rounded h-[15px] w-[15px] border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-base">Ghi nhớ đăng nhập</span>
              </label>
              <Link to="/forgot-password" className="text-base text-blue-700 hover:underline">
                Quên mật khẩu?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-black text-white py-3 rounded-lg text-lg font-semibold 
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-stone-700'} 
                transition cursor-pointer`}
            >
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>

            <button
              type="button"
              className="w-full mt-4 bg-stone-100 relative border border-gray-400 rounded-[30px] py-3 flex items-center justify-center space-x-2 transition hover:bg-stone-200"
            >
              <div className="absolute left-8">
                <FontAwesomeIcon
                  icon={faGoogle}
                  className="text-[#EA4335] text-[35px] hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-[17px]">Đăng nhập với Google</span>
            </button>
            <button
              type="button"
              className="w-full mt-2 border relative bg-stone-100 border-gray-400 rounded-[30px] py-3 flex items-center justify-center space-x-2 hover:bg-stone-200 transition"
            >
              <div className="absolute left-8">
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="text-[#4285F4] text-[35px] hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-[17px]">Đăng nhập với Facebook</span>
            </button>

            <p className="text-center text-gray-600 text-base mt-4">
              Chưa có tài khoản?{" "}
              <Link to="/register" className="text-blue-700 text-base hover:underline">
                Đăng ký miễn phí!
              </Link>
            </p>
          </form>
        </div>

        {/* Right Image Section */}
        <div className="w-1/2 flex justify-center items-center bg-white rounded-r-lg">
          <img
            src={LogoApp}
            alt="Login illustration"
            className="max-w-full max-h-[400px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

// Add this CSS to your global styles or component
const styles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
`;
