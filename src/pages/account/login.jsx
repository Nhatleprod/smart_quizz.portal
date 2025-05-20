import React, { useState } from "react";

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
          <h2 className="text-3xl font-bold mb-4">WELCOME BACK</h2>
          <p className="mb-6 text-gray-600">
            Welcome back! Please enter your details.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block">
              <span className="font-semibold text-lg">Username</span>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block">
              <span className="font-semibold text-lg">Password</span>
              <input
                type="password"
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <div className="flex justify-between items-center text-sm text-gray-700">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="rounded"
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-blue-500 hover:underline">
                Forgot password
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-600 transition"
            >
              Sign in
            </button>

            <button
              type="button"
              className="w-full mt-4 border border-gray-400 rounded-lg py-3 flex items-center justify-center space-x-2 hover:bg-gray-100 transition"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                alt="Google"
                className="w-5 h-5"
              />
              <span>Sign in with Google</span>
            </button>

            <p className="text-center text-gray-600 text-sm mt-4">
              Don't have an account?{" "}
              <a href="#" className="text-red-500 hover:underline">
                Sign up to free!
              </a>
            </p>
          </form>
        </div>

        {/* Right Image Section */}
        <div className="w-1/2 flex justify-center items-center bg-white rounded-r-lg">
          <img
            src="/assets/images/login-illustration.png" // Ensure this path points to the correct image
            alt="Login illustration"
            className="max-w-full max-h-[400px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
