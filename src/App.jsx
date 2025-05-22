import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/account/login";
import RegisterPage from "./pages/account/register";
import ForgotPassword from "./pages/account/forgotPassword";
import MainLayout from "./layouts/MainLayout";
import { AuthProvider } from "./context/AuthContext";
import BlogPage from "./pages/blog/p-blog";
import HomePage from "./pages/home/p-home";
import DetailExamPage from "./pages/detail_exam/p-detail-exam";
import ExamPage from "./pages/exam/p-exam";
import ContactPage from "./pages/contact/p-contact";
import CoursePage from "./pages/courses/p-course"

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
          <Route path="/blog" element={<BlogPage />} /> 
          <Route path="/contact" element={<ContactPage />}/>
          <Route path="/detail_exam/:id" element={<DetailExamPage />}/>
          <Route path="/exam/:id" element={<ExamPage />}/>
          <Route path="/course" element={<CoursePage/>}/> 
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
