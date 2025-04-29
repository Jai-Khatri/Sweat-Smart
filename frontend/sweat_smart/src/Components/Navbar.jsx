import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAdminStore from "../stores/useAdminStore";
import useAuthStore from "../stores/useAuthStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user: adminUser, logoutUser: logoutAdmin } = useAdminStore();
  const { user: authUser, logout } = useAuthStore();

  const isAdminLoggedIn = adminUser?.role === "admin";
  const isUserLoggedIn = authUser?.role === "user";

  return (
    <nav className="bg-gradient-to-r from-[#16222a] to-[#3a6073] text-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center py-5 px-8 md:py-6 md:px-10">
        {/* Logo */}
        <div className="text-4xl md:text-4xl lg:text-5xl font-bold">
          <div className="text-white transition duration-300">
            Sweat Smart
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white font-semibold border border-white px-4 py-2 rounded text-base"
        >
          {isOpen ? "Close" : "Menu"}
        </button>

        {/* Navigation Links */}
        <ul
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-[#16222a] md:bg-transparent text-center md:flex md:space-x-6 lg:space-x-8 transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          <li className="py-2 md:py-0">
            <Link
              to="/"
              className="block text-xl md:text-xl lg:text-2xl font-semibold hover:text-[#3a6073] transition duration-300"
            >
              Home
            </Link>
          </li>

          {/* Unauthenticated */}
          {!isAdminLoggedIn && !isUserLoggedIn && (
            <>
              <li className="py-2 md:py-0">
                <Link
                  to="/user-login"
                  className="block text-xl md:text-xl lg:text-2xl font-semibold hover:text-[#3a6073] transition duration-300"
                >
                  User Login
                </Link>
              </li>
              <li className="py-2 md:py-0">
                <Link
                  to="/admin-login"
                  className="block text-xl md:text-xl lg:text-2xl font-semibold hover:text-[#3a6073] transition duration-300"
                >
                  Admin Login
                </Link>
              </li>
            </>
          )}

          {/* Admin Links */}
          {isAdminLoggedIn && (
            <>
              <li className="py-2 md:py-0">
                <Link
                  to="/admin-home"
                  className="block text-xl md:text-xl lg:text-2xl font-semibold hover:text-[#3a6073] transition duration-300"
                >
                  Dashboard
                </Link>
              </li>
              <li className="py-2 md:py-0">
                <Link
                  to="/admin-manage-members"
                  className="block text-xl md:text-xl lg:text-2xl font-semibold hover:text-[#3a6073] transition duration-300"
                >
                  Manage Members
                </Link>
              </li>
              <li className="py-2 md:py-0">
                <Link
                  to="/admin-create-members"
                  className="block text-xl md:text-xl lg:text-2xl font-semibold hover:text-[#3a6073] transition duration-300"
                >
                  Create Member
                </Link>
              </li>
              <li className="py-2 md:py-0">
                <Link
                  to="/admin-manage-packages"
                  className="block text-xl md:text-xl lg:text-2xl font-semibold hover:text-[#3a6073] transition duration-300"
                >
                  Manage Packages
                </Link>
              </li>
              <li className="py-2 md:py-0">
                <button
                  onClick={logoutAdmin}
                  className="sm:self-center block text-xl md:text-xl lg:text-2xl font-semibold hover:text-red-500 transition duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          )}

          {/* User Links */}
          {isUserLoggedIn && (
            <>
              <li className="py-2 md:py-0">
                <Link
                  to="/user-dashboard"
                  className="block text-xl md:text-xl lg:text-2xl font-semibold hover:text-[#3a6073] transition duration-300"
                >
                  Dashboard
                </Link>
              </li>
              <li className="py-2 md:py-0">
                <Link
                  to="/set-password"
                  className="block text-xl md:text-xl lg:text-2xl font-semibold hover:text-[#3a6073] transition duration-300"
                >
                  Set Password
                </Link>
              </li>
              <li className="py-2 md:py-0">
                <button
                  onClick={logout}
                  className="sm:self-center block text-xl md:text-xl lg:text-2xl font-semibold hover:text-red-500 transition duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
