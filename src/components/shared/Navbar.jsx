import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import useTheme from "../../hooks/useTheme";
import { Sun, Moon, Menu } from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logOut().then(() => {
      navigate("/");
    });
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white font-semibold border-b-2 border-white pb-1"
              : "text-white font-medium hover:text-yellow-300 transition-colors"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-volunteers"
          className={({ isActive }) =>
            isActive
              ? "text-white font-semibold border-b-2 border-white pb-1"
              : "text-white font-medium hover:text-yellow-300 transition-colors"
          }
        >
          All Posts
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/add-volunteer"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-white pb-1"
                  : "text-white font-medium hover:text-yellow-300 transition-colors"
              }
            >
              Add Post
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/manage-posts"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-white pb-1"
                  : "text-white font-medium hover:text-yellow-300 transition-colors"
              }
            >
              Manage My Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-white pb-1"
                  : "text-white font-medium hover:text-yellow-300 transition-colors"
              }
            >
              About
            </NavLink>
          </li>
        </>
      )}

      {!user && (
        <li>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold border-b-2 border-white pb-1"
                : "text-white font-medium hover:text-yellow-300 transition-colors"
            }
          >
            About
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="w-6xl mx-auto bg-primary shadow-md sticky top-0 z-50">
      <div className="navbar max-w-6xl mx-auto px-4">
        {/* Left Logo */}
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://i.ibb.co/cSnFd7MR/logo.jpg"
              alt="Logo"
              className="w-10 h-10 rounded-full border-2 border-white shadow"
            />
            <span className="text-xl font-bold text-white hidden sm:inline">
              Volunteer Hub
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex items-center gap-3">
            {navLinks}
          </ul>
        </div>

        {/* Right Side: Theme + User */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white shadow hover:scale-105 transition-transform"
          >
            {theme === "dark" ? (
              <Moon size={18} className="text-gray-800" />
            ) : (
              <Sun size={18} className="text-yellow-500" />
            )}
          </button>

          {/* User Menu */}
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="avatar cursor-pointer">
                <div className="w-10 h-10 rounded-full border-2 border-white">
                  <img src={user.photoURL} alt="user" />
                </div>
              </div>
              <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-base-100 rounded-lg shadow-lg border border-gray-200 w-52">
                <li>
                  <span className="font-medium">{user.displayName}</span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-error btn-sm text-white"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-accent btn-sm">
              Login
            </Link>
          )}

          {/* Mobile Menu */}
          <div className="lg:hidden dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <Menu className="h-6 w-6 text-white" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-base-100 rounded-lg shadow-lg border border-gray-200 w-52"
            >
              {navLinks}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
