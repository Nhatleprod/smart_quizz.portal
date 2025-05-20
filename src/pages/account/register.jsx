import React, { useState } from "react";
import LogoApp from "../../assets/logo2.png";

export default function LoginPage({ onLogin }) {
    const [email, setemail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [CFpassword, setCFpassword] = useState("");
    
  
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
      <div className="flex bg-white shadow-lg rounded-lg max-w-5xl w-full">
        {/* Left Form Section */}
        <div className="flex flex-col justify-center bg-gray-200 p-10 w-1/2 rounded-l-lg">
          <a href="/" className="flex items-center mb-4 cursor-pointer">
            <img
              src="https://img.icons8.com/color/48/000000/graduation-cap.png"
              alt="logo"
              className="w-12 h-12 mr-2"
            />
            <h1 className="text-gray-600 font-bold text-4xl">E-ALLBEST</h1>
          </a>

          <h2 className="text-4xl mt-2 font-bold text-center mb-6 text-gray-600">REGISTER</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
                <span className="font-semibold text-base text-stone-600">Email</span>
                <input
                  type="email"
                  name="Email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="mt-1 block w-full rounded-lg text-base bg-gray-300 p-3 border border-gray-300 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none"
                  required
                > 
                </input>
             </label>
             <label className="block">
                <span className="font-semibold text-base text-stone-600">Username</span>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full rounded-lg text-base bg-gray-300 p-3 border border-gray-300 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none"
                  required
                > 
                </input>
             </label>
             <label className="block">
                <span className="font-semibold text-base text-stone-600">Password</span>
                <input
                  type="password"
                  name="username"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-lg text-base bg-gray-300 p-3 border border-gray-300 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none"
                  required
                > 
                </input>
             </label>
             <label className="block">
                <span className="font-semibold text-base text-stone-600">Confirm Password</span>
                <input
                  type="password"
                  name="username"
                  placeholder="Enter your confirm password"
                  value={CFpassword}
                  onChange={(e) => setCFpassword(e.target.value)}
                  className="mt-1 block w-full rounded-lg text-base bg-gray-300 p-3 border border-gray-300 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none"
                  required
                > 
                </input>
             </label>
            <button
              type="submit"
              className="w-full bg-black mt-2 text-white py-3 rounded-lg text-lg font-semibold hover:bg-stone-700 transition cursor-pointer"
            >
              Sign in
            </button>

            <p className="text-center text-gray-600 text-base mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-blue-700 hover:underline">
                Sign in here!
              </a>
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
