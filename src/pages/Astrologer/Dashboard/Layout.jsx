// Layout.jsx
import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu, Star } from "lucide-react";
import Sidebar from "./SideBar";
import { UserContext } from "../../../Context/UserContext";
import { connectSocket, socket } from "../../../socket/socket";
import toast from "react-hot-toast";

const Layout = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.role === "astrologer") {
      connectSocket(user._id);
      socket.on("incoming_call", (payload) => {
        // show modal/popup with payload.user
        // you can auto-refresh list or show accept popup
        console.log("Incoming call", payload);
        toast.warning("You got a call");
        // optionally add it to calls state:
      });
    }
    return () => {
      socket.off("incoming_call");
    };
  }, [user]);
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
