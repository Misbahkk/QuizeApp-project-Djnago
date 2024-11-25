import React from "react";

const Setting = () => {
  const userName = localStorage.getItem("name") || "User";

  return (
    <div className="w-[20%] h-full absolute bg-slate-00">
      <h2 className="text-4xl text-start pl-5 mt-10">Hi, {userName}</h2>
      <div className="pl-5 mt-5 flex gap-6 flex-col font-thin">
        <div className="text-gray-400 flex gap-3">
          <i class="fa-solid fa-house"></i>
          Dashboard
        </div>
        <div className="text-gray-400 flex gap-5">
          <i class="fa-solid fa-question"></i>
          Quizzes
        </div>
        <div className="text-gray-400 flex gap-3">
          <i class="fa-solid fa-person-chalkboard"></i>
          Presentation
        </div>
        <div className="text-gray-400 flex gap-3">
          <i class="fa-solid fa-chart-line"></i>
          Analytics
        </div>
        <div className="text-gray-400 flex gap-3">
          <i class="fa-solid fa-bell"></i>
          Notification
        </div>
        <div className="text-red-600 flex gap-3">
          <i class="fa-solid fa-gear"></i>
          Setting
        </div>
      </div>
    </div>
  );
};

export default Setting;
