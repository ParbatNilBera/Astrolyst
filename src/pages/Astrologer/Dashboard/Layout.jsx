// Layout.jsx
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu, Star } from "lucide-react";
import Sidebar from "./SideBar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 flex flex-col">
        {/* Mobile Topbar */}
        <div className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={toggleSidebar}
            className="text-black hover:bg-yellow-100 p-2 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <Star className="w-6 h-6 text-yellow-500" />
            <span className="font-bold text-black">Astrolyst</span>
          </div>
          <div className="w-10" /> {/* spacer */}
        </div>

        {/* Page Content */}
        <main className="p-6 flex-grow overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
