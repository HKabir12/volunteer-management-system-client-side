import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import useTheme from "../../hooks/useTheme";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logOut().then(() => {
      console.log("Logged out");
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
              ? "text-blue-600 font-semibold "
              : "text-gray-700 font-medium"
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
              ? "text-blue-600 font-semibold "
              : "text-gray-700 font-medium"
          }
        >
          All Posts
        </NavLink>
      </li>
      {user && (
        <li tabIndex={0}>
          <details>
            <summary className="text-gray-700 font-medium">My Profile</summary>
            <ul className="p-2 bg-base-100">
              <li>
                <NavLink
                  to="/add-volunteer"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold "
                      : "text-gray-700 font-medium"
                  }
                >
                  Add Volunteer Need Post
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/manage-posts"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold "
                      : "text-gray-700 font-medium"
                  }
                >
                  Manage My Posts
                </NavLink>
              </li>
            </ul>
          </details>
        </li>
      )}
    </>
  );

  return (
    <div className=" max-w-6xl mx-auto bg-base-100 shadow-md mb-5 sticky top-0 z-50">
      <div className="navbar max-w-6xl mx-auto px-4">
        {/* Left Logo */}
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://i.ibb.co/cSnFd7MR/logo.jpg"
              alt="Logo"
              className="w-9 h-9 rounded"
            />
            <span className="text-xl font-bold hidden sm:inline">
              Volunteer Hub
            </span>
          </Link>
        </div>

        {/* Center Nav Items */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex justify-center items-center gap-3">
            {navLinks}
          </ul>
        </div>

        {/* Mobile Dropdown */}
        <div className="lg:hidden">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
        </div>

        {/* Right: Theme Toggle + Login/Profile */}
        <div className="flex items-center gap-4 ml-4">
          {/*  Theme Toggle */}
          <label className="cursor-pointer flex items-center gap-2 px-2">
            <input
              type="checkbox"
              className="toggle theme-controller border border-gray-300"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />
            <span className="text-sm font-medium">
              {theme === "dark" ? "Dark" : "Light"}
            </span>
          </label>

          {/*  User Avatar or Login Button */}
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="avatar cursor-pointer">
                <div className="w-9 h-9 rounded-full border-2">
                  <img src={user.photoURL} alt="user" />
                </div>
              </div>
              <ul className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-center">
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
            <Link to="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
