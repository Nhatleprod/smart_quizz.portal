import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const { pathname } = useLocation();
  const hideNavbarRoutes = ["/login", "/register"];

  return (
    <div className="min-h-screen bg-white">
      {!hideNavbarRoutes.includes(pathname) && <Navbar />}
      <div className="container mx-auto px-4 py-6">
        <Outlet />
      </div>
    </div>
  );
}
