import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [forgotPass, setForgotPass] = useState({
    email: "",
  });
  const { email } = forgotPass;

  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const onChange = (e) => {
    setForgotPass({ ...forgotPass, [e.target.name]: e.target.value });
  };




 const submitData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/request-reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("OTP has been sent to your email!");
        setTimeout(() => navigate("/reset-password"), 2000); // Redirect to reset page after 2 seconds
      } else {
        setMessage(data.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("Failed to send OTP. Please try again later.");
    }
  };


  return (
    <div className="w-full h-[88.5vh] bg-black">
      <div className=" flex flex-col w-fit items-center justify-center m-auto px-5 text-white bg-black pt-10">
        <h1 className="text-3xl font-medium mb-3">Forgot Password ? </h1>
        <p className="text-base font-base font-sans mb-6">
          Enter your email and we'll send you an OTP to reset your password
        </p>
        <form onSubmit={submitData}>
          <div
            style={{ backgroundColor: "#CCBEBE" }}
            className="text-black text-center py-2 rounded-lg mb-3"
          >
            <i class="fa-regular fa-envelope ml-2"></i>
            <input
              value={email}
              name="email"
              onChange={onChange}
              type="email"
              placeholder="Email"
              className=" text-black pr-40 pl-2 py-1 font-sans text-sm focus:outline-none focus:border-none placeholder:text-black"
              style={{ backgroundColor: "#CCBEBE" }}
              required
            />
          </div>
          <button className="flex bg-red-600 text-white px-5 py-2 rounded-lg m-auto">
            Submit
          </button>
          {message && <p className="mt-3 text-red-600">{message}</p>}
          <NavLink to="/login">
            <p className=" font-sans text-center mt-5 mb-2 text-red-600 text-base">
              Back To Login
            </p>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
