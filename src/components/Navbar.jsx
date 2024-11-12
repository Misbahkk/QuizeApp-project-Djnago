import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgotPassword";
  return (
    <div className="nav-div bg-black text-white flex items-center justify-evenly text-center py-4">
      <div className="text-3xl">Logo</div>
      <nav className="flex gap-12 text-lg ml-20 font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-red-600" : "text-white"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/login"
          className={isAuthPage ? "text-red-600" : "text-white"}
        >
          Login/Sign Up
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-red-600" : "text-white"
          }
        >
          About Us
        </NavLink>
        <NavLink
          to="/help"
          className={({ isActive }) =>
            isActive ? "text-red-600" : "text-white"
          }
        >
          Help
        </NavLink>
      </nav>
      <div className="flex gap-5">
        <i class="fa-solid fa-bell"></i>
        <i class="fa-solid fa-user"></i>
      </div>
    </div>
  );
};

export default Navbar;
