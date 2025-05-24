import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/account/login";
import RegisterPage from "./pages/account/register";
import ForgotPassword from "./pages/account/forgotPassword";
import MainLayout from "./layouts/MainLayout";
import { AuthProvider } from "./context/AuthContext";
import BlogPage from "./pages/blog/p-blog";
import HomePage from "./pages/home/p-home";
import ContactPage from "./pages/contact/p-contact";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/pages/blog" element={<BlogPage />} />
          <Route path="/pages/contact" element={<ContactPage />}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
