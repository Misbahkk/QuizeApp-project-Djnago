import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [resetData, setResetData] = useState({
    otp_code: "",
    password: "",
    confirm_password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { otp_code, password, confirm_password } = resetData;
  const onChange = (e) => {
    setResetData({ ...resetData, [e.target.name]: e.target.value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/reset-password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp_code, password, confirm_password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // Redirect to login page after 2 seconds
      } else {
        setMessage(data.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("Failed to reset password. Please try again later.");
    }
  };

  return (
    <div className="w-full h-[88.5vh] bg-black">
      <div className="flex flex-col w-fit items-center justify-center m-auto px-5 text-white bg-black pt-10">
        <h1 className="text-3xl font-medium mb-3">Reset Password</h1>
        <p className="text-base font-sans mb-6">
          Enter the OTP sent to your email and set a new password.
        </p>
        <form onSubmit={submitData}>
          <input
            value={otp_code}
            name="otp_code"
            onChange={onChange}
            type="text"
            placeholder="OTP"
            className="block w-full text-black mb-3 py-2 px-3 rounded-lg"
            required
          />
          <input
            value={password}
            name="password"
            onChange={onChange}
            type="password"
            placeholder="New Password"
            className="block w-full text-black mb-3 py-2 px-3 rounded-lg"
            required
          />
          <input
            value={confirm_password}
            name="confirm_password"
            onChange={onChange}
            type="password"
            placeholder="Confirm Password"
            className="block w-full text-black mb-3 py-2 px-3 rounded-lg"
            required
          />
          <button className="flex bg-red-600 text-white px-5 py-2 rounded-lg m-auto">
            Reset Password
          </button>
          {message && <p className="mt-3 text-red-600">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
