import React from "react";
import { NavLink, useLocation , useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../Images/logo.png";
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgotPassword";

    // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("access");


  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

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

        {/* <NavLink
          to="/login"
          className={isAuthPage ? "text-red-600" : "text-white"}
        >
          Login/Sign Up
        </NavLink> */}
        {!isLoggedIn && (
          <NavLink
            to="/login"
            className={isAuthPage ? "text-red-600" : "text-white"}
          >
            Login/Sign Up
          </NavLink>
        )}

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
      {isLoggedIn ? (
          <>
            <i className="fa-solid fa-bell"></i>
            <i className="fa-solid fa-user"></i>
            <button onClick={handleLogout}  className={({ isActive }) =>
            isActive ? "text-red-600" : "text-white"
          }>

              Logout
            </button>
          </>
        ) : null}


      </div>
    </div>
  );
};

export default Navbar;
