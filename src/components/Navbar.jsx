import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../App.css";
import logo from "../Images/logo.png";
const Navbar = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgotPassword";
  return (
    <div
      className=" bg-black text-white flex items-center 
    justify-between text-center py-4"
    >
      <div className="text-3xl ml-12">
        <img src={logo} alt="Logo" className="w-[120px]" />
      </div>
      <nav className="flex gap-12 text-lg ml-24 font-medium">
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
      <div className="flex gap-5 mr-10">
        <i class="fa-solid fa-bell"></i>
        <i class="fa-solid fa-user"></i>
      </div>
    </div>
  );
};

export default Navbar;
