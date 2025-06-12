import React, { use } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logOut } = use(AuthContext);
  const handleLogOut = () => {
    console.log("user trying to LogOut");
    logOut()
      .then(() => {
        console.log("You Logged Out successfully");
        //alert("You Logged Out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-blue-500 font-bold" : "hover:text-blue-400";

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 max-w-6xl mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-3"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-32 p-2 shadow"
          >
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/task" className={navLinkClass}>
                Add Task
              </NavLink>
            </li>
            <li>
              <NavLink to="/browertask" className={navLinkClass}>
                Browse Tasks
              </NavLink>
            </li>
            <li>
              <NavLink to="/mypostedtasks" className={navLinkClass}>
                My Posted Tasks
              </NavLink>
            </li>

            <li>
              <NavLink to="/profile" className={navLinkClass}>
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/update-task" className={navLinkClass}>
                Update
              </NavLink>
              
            </li>
          </ul>
        </div>

        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="https://i.ibb.co/cSnFd7MR/logo.jpg"
            alt="Volunteer Logo"
            className="w-8 h-8"
          />
          <h1 className="text-xl font-bold hidden sm:block">Volunteer</h1>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/task" className={navLinkClass}>
              Add Task
            </NavLink>
          </li>
          <li>
            <NavLink to="/browertask" className={navLinkClass}>
              Browse Tasks
            </NavLink>
          </li>
          <li>
            <NavLink to="/mypostedtasks" className={navLinkClass}>
              My Posted Tasks
            </NavLink>
          </li>

          <li>
            <NavLink to="/profile" className={navLinkClass}>
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/update-task" className={navLinkClass}>
              Update task
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end space-x-4">
        {user ? (
          <div className="flex items-center space-x-2">
            <div className="relative group">
              <img
                src={user?.photoURL}
                alt="Profile"
                className="w-8 h-8 rounded-full border cursor-pointer"
              />
              <div className="absolute left-1/2 transform -translate-x-1/2 bg-base-200 text-xs rounded px-2 py-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity z-20 min-w-[100px] max-w-[200px] truncate text-center">
                {user?.displayName}
              </div>
            </div>
            <button
              onClick={handleLogOut}
              className="btn btn-sm btn-error text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link className="btn btn-primary btn-sm" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
