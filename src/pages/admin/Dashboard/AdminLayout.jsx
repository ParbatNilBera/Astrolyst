// AdminLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, Shield } from "lucide-react";
import AdminSidebar from "./AdminSideBar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden bg-black shadow-sm p-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={toggleSidebar}
            className="text-white hover:bg-violet-900 p-2 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-violet-500" />
            <span className="font-bold text-white">AdminHub</span>
          </div>
          <div className="w-10" />
        </div>

        {/* Main Content Area */}
        <main className="p-6 flex-grow overflow-y-auto bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
