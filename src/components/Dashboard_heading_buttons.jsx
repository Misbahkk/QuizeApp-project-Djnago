import React from "react";

const Dashboard_heading_buttons = ({ heading, button1, button2, button3 }) => {
  return (
    <div className="relative">
      <h1 className="font-medium text-2xl ml-8 text-gray-300">{heading}</h1>
      <div className="border-b-gray-400 border-b-2 flex gap-3 mt-3">
        <button className="bg-white text-red-500 rounded-sm py-1 px-3 ml-8">
          {button1}
        </button>
        <button className="text-gray-300 py-1 px-3 ml-8">{button2}</button>
        <button className="text-gray-300 py-1 px-3 ml-8">{button3}</button>
      </div>
    </div>
  );
};

export default Dashboard_heading_buttons;

// {({ isActive }) =>
//   isActive
//     ? "bg-white text-red-500 rounded-sm py-1 px-3 ml-8 mt-3 "
//     : "text-white"
// }
