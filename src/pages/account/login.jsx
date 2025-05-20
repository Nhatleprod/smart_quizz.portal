import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoApp from "../../assets/logo2.png";
import { faFacebook, faFacebookF, faGoogle, faGooglePay } from "@fortawesome/free-brands-svg-icons";
export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin();
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-lg max-w-4xl w-full">
        {/* Left Form Section */}
        <div className="flex flex-col justify-center bg-gray-200 p-10 w-1/2 rounded-l-lg">
          <a href="/" className="flex items-center space-x-2 mb-4 cursor-pointer">
            <div className="flex items-center space-x-2 mb-4">
            <img
              src="https://img.icons8.com/color/48/000000/graduation-cap.png"
              alt="logo"
              className="w-12 h-12"
            />
            <h1 className="text-gray-600 font-bold text-4xl">E-ALLBEST</h1>
          </div>
          </a>
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-600">LOGIN</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="font-semibold text-base text-stone-600">Username</span>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full rounded-lg text-base bg-gray-300 p-3 border border-gray-300 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="font-semibold text-base text-stone-600">Password</span>
              <input
                type="password"
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg text-base bg-gray-300 p-3 border border-gray-300 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none"
              />
            </label>

            <div className="flex justify-between items-center text-sm text-gray-700">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="rounded h-[15px] w-[15px] border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-base" >Remember me</span>
              </label>
              <a href="/forgotPassword" className="text-base text-blue-700 hover:underline ">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-stone-700 transition cursor-pointer"
            >
              Sign in
            </button>

            <button
              type="button"
              className="w-full mt-4 bg-stone-100 relative border border-gray-400 rounded-[30px] py-3 flex items-center justify-center space-x-2transition hover:bg-stone-200"
            >
              <div className="absolute left-8">
                <FontAwesomeIcon
                  icon={faGoogle}
                  className="text-[#EA4335] text-[35px]  hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-[17px]">Sign in with Google</span>
            </button>
            <button
              type="button"
              className="w-full mt-2 border relative bg-stone-100  border-gray-400 rounded-[30px] py-3 flex items-center justify-center space-x-2 hover:bg-stone-200 transition"
            >
              <div className="absolute left-8">
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="text-[#4285F4] text-[35px] hover:scale-110 transition-transform duration-300 "
                />
              </div>
              <span className="text-[17px]">Sign in with Facebook</span>
            </button>

            <p className="text-center text-gray-600 text-base mt-4">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-700 text-base hover:underline">
                Sign up to free!
              </a>
            </p>
          </form>
        </div>

        {/* Right Image Section */}
        <div className="w-1/2 flex justify-center items-center bg-white rounded-r-lg">
          <img
            src= {LogoApp}
            alt="Login illustration"
            className="max-w-full max-h-[400px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
