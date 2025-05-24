import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import LogoApp from "../../assets/logo2.png";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const { forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();
  
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [accountId, setAccountId] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Mật khẩu phải có ít nhất 6 ký tự";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Mật khẩu phải có ít nhất một ký tự đặc biệt";
    }
    return "";
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setVerificationStatus("");
    setIsVerified(false);

    try {
      const response = await forgotPassword(emailOrUsername);
      setIsVerified(true);
      setVerificationStatus("valid");
      setAccountId(response.data.account.id);
    } catch (error) {
      setIsVerified(false);
      setVerificationStatus("invalid");
      setAccountId(null);
      setNewPassword("");
      setConfirmPassword("");
      setPasswordError("");
      alert(error.message || "Không tìm thấy tài khoản");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setPasswordError("");

    // Validate password
    const passwordValidationError = validatePassword(newPassword);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Mật khẩu mới và xác nhận không khớp");
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(accountId, newPassword, confirmPassword);
      alert("Đặt lại mật khẩu thành công!");
      navigate("/login");
    } catch (error) {
      alert(error.message || "Không thể đặt lại mật khẩu");
    } finally {
      setIsLoading(false);
    }
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

          <h2 className="text-3xl font-bold text-center mb-4 text-gray-600">QUÊN MẬT KHẨU</h2>

          <form onSubmit={isVerified ? handleResetPassword : handleVerifyEmail} className="space-y-4">
            {/* Email/Username input */}
            <label className="block">
              <span className="font-semibold text-base text-stone-600">Email hoặc tên đăng nhập</span>
              <input
                type="text"
                placeholder="Nhập email hoặc tên đăng nhập"
                value={emailOrUsername}
                onChange={(e) => {
                  setEmailOrUsername(e.target.value);
                  if (isVerified) {
                    setIsVerified(false);
                    setVerificationStatus("");
                    setAccountId(null);
                    setNewPassword("");
                    setConfirmPassword("");
                    setPasswordError("");
                  }
                }}
                disabled={isVerified}
                className={`mt-1 block w-full rounded-lg text-base bg-gray-300 p-3 border border-gray-300 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none ${
                  isVerified && "bg-gray-200 cursor-not-allowed"
                }`}
              />
              {verificationStatus === "valid" && (
                <div className="flex items-center gap-2 mt-1 text-green-600 text-sm italic">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-green-600" />
                  Tìm thấy tài khoản!
                </div>
              )}
              {verificationStatus === "invalid" && (
                <div className="flex items-center gap-2 mt-1 text-red-600 text-sm italic">
                  <FontAwesomeIcon icon={faCircleExclamation} className="text-red-600" />
                  Không tìm thấy tài khoản!
                </div>
              )}
            </label>

            {/* Password fields - only show when account is found */}
            {isVerified && accountId && (
              <>
                <label className="block">
                  <span className="font-semibold text-base text-stone-600">Mật khẩu mới</span>
                  <input
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setPasswordError(validatePassword(e.target.value));
                    }}
                    className="mt-1 block w-full rounded-lg text-base bg-gray-300 p-3 border border-gray-300 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none"
                  />
                  {passwordError && (
                    <div className="flex items-center gap-2 mt-1 text-red-600 text-sm italic">
                      <FontAwesomeIcon icon={faCircleExclamation} className="text-red-600" />
                      {passwordError}
                    </div>
                  )}
                </label>

                <label className="block">
                  <span className="font-semibold text-base text-stone-600">Xác nhận mật khẩu mới</span>
                  <input
                    type="password"
                    placeholder="Nhập lại mật khẩu mới"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (e.target.value !== newPassword) {
                        setPasswordError("Mật khẩu mới và xác nhận không khớp");
                      } else {
                        setPasswordError("");
                      }
                    }}
                    className="mt-1 block w-full rounded-lg text-base bg-gray-300 p-3 border border-gray-300 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none"
                  />
                </label>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-stone-700 transition ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {isLoading ? "Đang xử lý..." : (isVerified ? "Đặt lại mật khẩu" : "Xác thực")}
            </button>
            <label className="text-sm text-gray-500 mt-1">
              <a href="/login" className="text-stone-500 hover:text-blue-600 text-lg"> ↺ Quay lại đăng nhập</a>
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
