import React from "react";
import logo from "../../Images/logo.png";
import Services from "../Services";
const Home = () => {
  return (
    <>
      <div className="flex">
        <div className="w-1/2  pt-20 bg-black text-white">
          <h2 className="text-6xl text-start ml-8">
            Welcome to <img src={logo} alt="Logo" className="w-60 mt-2" />
          </h2>
          <p className="w-[75%] ml-8 mt-10 text-base pb-24">
            Welcome to DangalUp – your all-in-one platform for interactive
            learning and presentation creation. With DangalUp, you can create
            quizzes, design presentations, and generate content with the help of
            AI. Engage your audience with live polls, surveys, and discussions,
            and gain insights with powerful analytics. Whether you're an
            educator, presenter, or learner, DangalUp makes it easy to connect,
            collaborate, and succeed.
          </p>
        </div>
        <div className="w-1/2 bg-black text-white"></div>
      </div>
      <Services />
    </>
  );
};

export default Home;
