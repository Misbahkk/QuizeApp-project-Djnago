import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/Pages/SignUp";
import Navbar from "./components/Navbar";
import Home from "./components/Pages/Home";
import About from "./components/Pages/About";
import Help from "./components/Pages/Help";
import Login from "./components/Pages/Login";
import ForgotPassword from "./components/Pages/ForgotPassword";
// import "../App.css";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </>
  );
};

export default App;
