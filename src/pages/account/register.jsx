import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import LogoApp from "../../assets/logo2.png";
import { useRegisterForm } from "../../hooks/useRegisterForm";

const RegisterPage = memo(() => {
  const {
    formData,
    errors,
    isLoading,
    successMessage,
    handleChange,
    handleSubmit
  } = useRegisterForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-lg max-w-5xl w-full">
        {/* Left Form Section */}
        <div className="flex flex-col justify-center bg-gray-200 p-10 w-1/2 rounded-l-lg">
          <Link to="/" className="flex items-center mb-4 cursor-pointer">
            <img
              src="https://img.icons8.com/color/48/000000/graduation-cap.png"
              alt="logo"
              className="w-12 h-12 mr-2"
            />
            <h1 className="text-gray-600 font-bold text-4xl">E-ALLBEST</h1>
          </Link>

          <h2 className="text-4xl mt-2 font-bold text-center mb-6 text-gray-600">REGISTER</h2>

          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {successMessage}
            </div>
          )}

          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="font-semibold text-base text-stone-600">Username</span>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-lg text-base bg-gray-300 p-3 border ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                } focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none`}
                required
              />
              {errors.username && (
                <span className="text-red-500 text-sm mt-1">{errors.username}</span>
              )}
            </label>

            <label className="block">
              <span className="font-semibold text-base text-stone-600">Email</span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-lg text-base bg-gray-300 p-3 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none`}
                required
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">{errors.email}</span>
              )}
            </label>

            <label className="block">
              <span className="font-semibold text-base text-stone-600">Password</span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-lg text-base bg-gray-300 p-3 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none pr-10`}
                  required
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
              <p className="text-sm text-gray-500 mt-1">
                Password must be at least 6 characters and contain at least one special character (!@#$%^&*(),.?":{}|&lt;&gt;)
              </p>
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">{errors.password}</span>
              )}
            </label>

            <label className="block">
              <span className="font-semibold text-base text-stone-600">Confirm Password</span>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-lg text-base bg-gray-300 p-3 border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  } focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none pr-10`}
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                    className="text-lg"
                  />
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm mt-1">{errors.confirmPassword}</span>
              )}
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-black mt-2 text-white py-3 rounded-lg text-lg font-semibold 
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-stone-700'} 
                transition cursor-pointer`}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>

            <p className="text-center text-gray-600 text-base mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-700 hover:underline">
                Sign in here!
              </Link>
            </p>
          </form>
        </div>

        {/* Right Image Section */}
        <div className="w-1/2 flex justify-center items-center bg-white rounded-r-lg">
          <img
            src={LogoApp}
            alt="Registration illustration"
            className="max-w-full max-h-[400px] object-contain"
          />
        </div>
      </div>
    </div>
  );
});

RegisterPage.displayName = 'RegisterPage';

export default RegisterPage;
