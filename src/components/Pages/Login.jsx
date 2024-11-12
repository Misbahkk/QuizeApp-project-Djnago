import React, { useState } from "react";

const Login = () => {
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });
  const { userName, password } = loginData;
  const onChange = (e) => {
    setLoginData({ ...signUpdata, [e.target.name]: e.target.value });
  };
  const submitData = (e) => {
    e.preventDefault();
    console.log(loginData);
  };
  return (
    <div>
      <div className="w-full h-[88.5vh] bg-black">
        <div className=" flex flex-col w-fit items-center justify-center m-auto px-5 text-white bg-black pt-10">
          <h1 className="text-3xl font-medium ">LOGIN</h1>
          <p className="text-lg font-base font-sans mb-4">
            Welcome back <span className="text-red-500 font-bold">!</span>{" "}
            Please login to access your account.
          </p>
          <form onSubmit={submitData}>
            <div
              style={{ backgroundColor: "#CCBEBE" }}
              className="text-black text-center py-2 rounded-lg mb-3"
            >
              <i className="fa-regular fa-user ml-2"></i>
              <input
                name="userName"
                value={userName}
                onChange={onChange}
                type="text"
                placeholder="Username"
                className=" text-black pr-40 pl-2 py-1 font-sans text-sm focus:outline-none focus:border-none  placeholder:text-black"
                style={{ backgroundColor: "#CCBEBE" }}
              />
            </div>

            <div
              style={{ backgroundColor: "#CCBEBE" }}
              className="text-black text-center py-2 rounded-lg mb-3"
            >
              <i class="fa-solid fa-lock ml-2"></i>
              <input
                name="password"
                value={password}
                onChange={onChange}
                type="password"
                placeholder="Password"
                className=" text-black pr-40 pl-2 py-1  font-sans text-sm focus:outline-none focus:border-none placeholder:text-black"
                style={{ backgroundColor: "#CCBEBE" }}
              />
            </div>

            <button className="flex bg-red-600 text-white px-5 py-2 rounded-lg m-auto">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
