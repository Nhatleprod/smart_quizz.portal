import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import LogoApp from "../../assets/logo2.png";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleVerifyEmail = (e) => {
    e.preventDefault();

    // Giả lập kiểm tra email hợp lệ
    if (email.includes("@")) {
      setIsVerified(true);
      setEmailStatus("valid");
    } else {
      alert("Vui lòng nhập email hợp lệ.");
      setEmailStatus("invalid");
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và xác nhận không khớp.");
      return;
    }

    // Xử lý logic đổi mật khẩu ở đây
    alert("Đổi mật khẩu thành công!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-lg max-w-4xl w-full">
        {/* Left Form Section */}
        <div className="flex flex-col justify-center bg-gray-200 p-10 w-1/2 rounded-l-lg">
          <a href="/" className="flex items-center space-x-2 mb-4 cursor-pointer">
            <img
              src="https://img.icons8.com/color/48/000000/graduation-cap.png"
              alt="logo"
              className="w-12 h-12"
            />
            <h1 className="text-gray-600 font-bold text-4xl">E-Allbest</h1>
          </a>

          <h2 className="text-3xl font-bold text-center mb-4 text-gray-600">Forgot Password</h2>

          <form onSubmit={isVerified ? handleChangePassword : handleVerifyEmail} className="space-y-4">
            {/* Email input */}
            <label className="block">
              <span className="font-semibold text-base text-stone-600">Email</span>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isVerified}
                className={`mt-1 block w-full rounded-lg text-base bg-gray-300 p-3 border border-gray-300 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none ${
                  isVerified && "bg-gray-200 cursor-not-allowed"
                }`}
              />
              {emailStatus == "valid" && (
                    <div className="flex items-center gap-2 mt-1 text-green-600 text-sm italic">
                        <FontAwesomeIcon icon={faCircleCheck} className="text-green-600" />
                        Email is valid!
                    </div>
                )}
              {emailStatus === "invalid" && (
                <div className="flex items-center gap-2 mt-1 text-red-600 text-sm italic">
                    <FontAwesomeIcon icon={faCircleExclamation} className="text-red-600" />
                    Email is invalid!
                </div>
                )}
            </label>

            {/* Mật khẩu cũ */}
            {isVerified && (
              <>
                <label className="block">
                  <span className="font-semibold text-base text-stone-600">Old Password</span>
                  <input
                    type="password"
                    placeholder="********"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="mt-1 block w-full rounded-lg text-base bg-gray-300 p-3 border border-gray-300 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none"
                  />
                </label>

                <label className="block">
                  <span className="font-semibold text-base text-stone-600">New Password</span>
                  <input
                    type="password"
                    placeholder="********"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 block w-full rounded-lg text-base bg-gray-300 p-3 border border-gray-300 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none"
                  />
                </label>

                <label className="block">
                  <span className="font-semibold text-base text-stone-600">Confirm New Password</span>
                  <input
                    type="password"
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full rounded-lg text-base bg-gray-300 p-3 border border-gray-300 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none"
                  />
                </label>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-stone-700 transition cursor-pointer"
            >
              {isVerified ? "Confirm Change" : "Verify"}
            </button>
            <label className="text-sm text-gray-500 mt-1">
                <a href="/login" className="text-stone-500 hover:text-blue-600 text-lg"> ↺ Back to Login</a>
            </label>
          </form>
        </div>

        <div className="w-1/2 flex justify-center items-center bg-white rounded-r-lg">
          <img
            src={LogoApp}
            alt="Forgot illustration"
            className="max-w-full max-h-[400px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
