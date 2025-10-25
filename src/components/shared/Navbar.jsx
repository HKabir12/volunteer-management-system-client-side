import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import useTheme from "../../hooks/useTheme";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Posts", path: "/all-volunteers" },
    
    ...(user
      ? [
          { name: "Add Post", path: "/add-volunteer" },
          { name: "Manage My Posts", path: "/manage-posts" },
          { name: "About", path: "/about-us" },
        ]
      : [
          { name: "About", path: "/about-us" },
         
        ]),
         { name: "Contact", path: "/contact-us" },
  ];

  return (
    <nav className="bg-linear-to-r from-blue-600 to-indigo-600 sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/cSnFd7MR/logo.jpg"
            alt="Logo"
            className="w-9 h-9 rounded-full border-2 border-white shadow"
          />
          <span className="text-lg font-bold text-white hidden sm:inline">
            Volunteer Hub
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-semibold border-b-2 border-white pb-1"
                    : "text-white/90 hover:text-yellow-300 transition-colors"
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full bg-white shadow hover:scale-105 transition-transform"
          >
            {theme === "dark" ? (
              <Moon className="w-4 h-4 text-gray-800" />
            ) : (
              <Sun className="w-4 h-4 text-yellow-500" />
            )}
          </button>

          {/* User Dropdown */}
          {user ? (
            <div className="relative">
              <img
                src={user.photoURL}
                alt="user"
                className="w-9 h-9 rounded-full border-2 border-white cursor-pointer"
                onClick={() => setMobileOpen((prev) => !prev)}
              />
              {mobileOpen && (
                <ul className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 py-2">
                  <li className="px-4 py-1 font-medium">{user.displayName}</li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-1 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md font-medium transition-colors"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden ml-2 p-2 rounded-md text-white hover:bg-white/20 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <ul className="lg:hidden bg-blue-700 text-white flex flex-col gap-3 px-4 py-3">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold border-l-4 border-yellow-300 pl-2"
                    : "pl-2 hover:text-yellow-300 transition-colors"
                }
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
