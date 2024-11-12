import React, { useState } from "react";

const SignUp = () => {
  const [signUpdata, setSignUpdata] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const { name, email, password, role } = signUpdata;
  const onChange = (e) => {
    setSignUpdata({ ...signUpdata, [e.target.name]: e.target.value });
  };
  // const submitData = (e) => {
  //   e.preventDefault();
  //   console.log(signUpdata);
  // };




  const submitData = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data_user = {
      name: formData.get('name'), 
      email: formData.get('email'),  // Ensure this matches the backend
      password: formData.get('password'),
      role: formData.get('role'), 
  };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data_user),
      });
      const data = await response.json();
      console.log("Signup Success:", data);
      // Handle response data (e.g., redirect to login, show success message, etc.)
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };


  return (
    <div className="w-full h-[88.5vh] bg-black">
      <div className=" flex flex-col w-fit items-center justify-center m-auto px-5 text-white bg-black pt-10">
        <h1 className="text-3xl font-medium ">SIGN UP</h1>
        <p className="text-lg font-base font-sans mb-4">
          Sign in to your account and get started
        </p>
        <form onSubmit={submitData}>
          <div
            style={{ backgroundColor: "#CCBEBE" }}
            className="text-black text-center py-2 rounded-lg mb-3"
          >
            <i className="fa-regular fa-user ml-2"></i>
            <input
              name="name"
              value={name}
              onChange={onChange}
              type="text"
              placeholder="name"
              className=" text-black pr-40 pl-2 py-1 font-sans text-sm focus:outline-none focus:border-none  placeholder:text-black"
              style={{ backgroundColor: "#CCBEBE" }}
            />
          </div>
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
          <div
            style={{ backgroundColor: "#CCBEBE" }}
            className="text-black text-center py-2 rounded-lg mb-3 relative pr-14"
          >
            <i className=" fa-solid fa-person absolute left-2 top-1/2 transform -translate-y-1/2 text-black text-xl"></i>
            <label htmlFor="role" className="sr-only text-black bg-blue-400">
              Choose your role:
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={onChange}
              style={{ backgroundColor: "#CCBEBE" }}
              className="  text-black pl-7 pr-40 py-1 font-sans text-sm placeholder:text-black w-full appearance-none rounded-lg focus:outline-none focus:border-none"
            >
              <option disabled selected>
                Choose your role
              </option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <button className="flex bg-red-600 text-white px-5 py-2 rounded-lg m-auto">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
