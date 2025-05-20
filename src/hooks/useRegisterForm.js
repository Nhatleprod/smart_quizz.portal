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
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      // Kiểm tra độ dài tối thiểu
      if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      // Kiểm tra ký tự đặc biệt
      else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)';
      }
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
              message: response.message || 'Registration successful! Please login.',
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
            submit: response.message || 'Registration failed. Please try again.'
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
          submit: error.message || 'Registration failed. Please try again.'
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