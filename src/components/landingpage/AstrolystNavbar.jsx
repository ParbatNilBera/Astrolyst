import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";
export default function AstrolystNavbar() {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { updateUser } = useContext(UserContext);

  const navItems = [
    {
      id: 2,
      name: "Talk To Astrologer",
      link: "/talk-to-astrologer",
    },
    {
      id: 3,
      name: "Book Astrologer",
      link: "/astrologers",
    },
    {
      id: 4,
      name: "Community",
      link: "/community",
    },
  ];

  const handleLogout = () => {
    // Remove token and user info from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // If you're using useState or Context to track user:
    updateUser(null); // Only if you have a setUser function in your component/context
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-yellow-50 to-white backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="max-w-[1660px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink
              to="/"
              className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-300 tracking-tight"
            >
              Astrolyst
              <span className="text-yellow-500 ml-1 animate-pulse">✦</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.link}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
              </NavLink>
            ))}

            {/* Login/Register Button */}
            {user ? (
              <div className="flex items-center space-x-4 bg-yellow-100/20 px-4 py-2 rounded-md border border-yellow-100 shadow-sm">
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    clearUser();
                    handleLogout();
                  }}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-md text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-900"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login / Register
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 p-2 rounded-md transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.link}
                  className="text-gray-700 hover:text-gray-900 hover:bg-yellow-50 block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
              <div className="pt-2">
                {user ? (
                  <div className="p-3 bg-yellow-50 rounded-md border border-yellow-200">
                    <div className="mb-2">
                      <p className="text-sm font-semibold text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    <button
                      className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
                      onClick={() => {
                        clearUser();
                        setIsMobileMenuOpen(false);
                        handleLogout();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white px-4 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate("/login");
                    }}
                  >
                    Login / Register
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
