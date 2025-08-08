// Sidebar.jsx
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  User,
  Calendar,
  BookOpen,
  Users,
  Star,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { UserContext } from "../../../Context/UserContext";

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { path: "/profile", label: "Profile", icon: User },
    {
      path: "/manage-availability",
      label: "Manage Availability",
      icon: Calendar,
    },
    { path: "/bookings", label: "Bookings", icon: BookOpen },
    { path: "/community-astrologer", label: "Community", icon: Users },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-yellow-100 to-yellow-200
          shadow-xl z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-yellow-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-300 p-2 rounded-full">
                <Star className="w-6 h-6 text-black" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-black">AstroHub</h2>
                <p className="text-gray-700 text-sm">Astrologer Dashboard</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-black hover:bg-yellow-300 p-1 rounded"
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
                    ? "bg-yellow-300 text-black font-semibold shadow-md"
                    : "text-gray-800 hover:bg-yellow-300 hover:text-black hover:shadow-sm"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
