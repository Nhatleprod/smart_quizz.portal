import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = useCallback(() => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    // Username validation
    if (!formData.username) {
      newErrors.username = 'Tên tài khoản là bắt buộc';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Tên tài khoản phải có ít nhất 3 ký tự';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else {
      // Kiểm tra độ dài tối thiểu
      if (formData.password.length < 6) {
        newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
      }
      // Kiểm tra ký tự đặc biệt
      else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
        newErrors.password = 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt (!@#$%^&*(),.?":{}|<>)';
      }
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSuccessMessage(''); // Reset success message
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await register(formData);
      
      if (response.success) {
        setSuccessMessage('Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.');
        // Đợi 2 giây trước khi chuyển trang để người dùng thấy thông báo
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              message: response.message || 'Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.',
              type: 'success'
            }
          });
        }, 2000);
      } else {
        if (response.errors) {
          const serverErrors = {};
          response.errors.forEach(error => {
            serverErrors[error.path] = error.msg;
          });
          setErrors(serverErrors);
        } else {
          setErrors({
            submit: response.message || 'Đăng ký thất bại. Vui lòng thử lại.'
          });
        }
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        const serverErrors = {};
        error.response.data.errors.forEach(err => {
          serverErrors[err.path] = err.msg;
        });
        setErrors(serverErrors);
      } else {
        setErrors({
          submit: error.message || 'Đăng ký thất bại. Vui lòng thử lại.'
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm, register, navigate]);

  return {
    formData,
    errors,
    isLoading,
    successMessage,
    handleChange,
    handleSubmit
  };
}; 