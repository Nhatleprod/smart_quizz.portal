import { useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function useLoginForm() {
  // 1. All hooks must be called at the top level
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // 2. State hooks
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // 3. Memoized functions
  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
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
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSuccessMessage(""); // Clear any existing success message
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await login(formData);
      setSuccessMessage("Login successful! Redirecting...");
      
      // Wait for 1.5 seconds to show the success message before redirecting
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setErrors({
        submit: error.message || "Login failed. Please check your credentials."
      });
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm, login, navigate]);

  return {
    formData,
    errors,
    isLoading,
    successMessage,
    handleChange,
    handleSubmit
  };
}
