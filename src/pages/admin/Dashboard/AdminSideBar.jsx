// AdminSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  Shield,
  X,
  Moon,
  Sun,
} from "lucide-react";

const AdminSideBar = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      path: "/admin-dashboard/overview",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      path: "/admin-dashboard/astrologers-application",
      label: "Applications",
      icon: Users,
    },
    { path: "/admin-dashboard/reports", label: "Reports", icon: FileText },
    { path: "/admin-dashboard/settings", label: "Settings", icon: Settings },
    { path: "/admin-dashboard/roles", label: "Roles", icon: Shield },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-black to-violet-900
          shadow-xl z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-violet-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-violet-700 p-2 rounded-full">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">AdminHub</h2>
                <p className="text-gray-400 text-sm">Admin Dashboard</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-white hover:bg-violet-800 p-1 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "bg-violet-700 text-white font-semibold shadow-md"
                    : "text-gray-300 hover:bg-violet-700 hover:text-white hover:shadow-sm"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-white bg-opacity-10 rounded-lg p-4 border border-violet-700">
            <div className="flex items-center space-x-2 mb-2">
              <Moon className="w-4 h-4 text-gray-300" />
              <Sun className="w-4 h-4 text-gray-300" />
            </div>
            <p className="text-xs text-gray-300 italic">
              "Manage with vision, lead with clarity."
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSideBar;
