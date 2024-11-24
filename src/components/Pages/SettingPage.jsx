import React from "react";
import Setting from "../Setting";
import Dashboard_heading_buttons from "../Dashboard_heading_buttons";
import User_dashboard from "../User_dashboard";

const SettingPage = () => {
  return (
    <div className="flex h-screen bg-black">
      <div className="w-[17%] h-full bg-white">
        <Setting />
      </div>
      <div className="w-[85%] flex flex-col ">
        <div className="h-[18%] bg-black text-white ">
          <Dashboard_heading_buttons
            heading={"My Settings"}
            button1={"Profile Settings"}
            button2={"Account Settings"}
            button3={"Prefrences"}
          />
        </div>
        <div className="h-[70%] bg-white rounded-lg ">
          <User_dashboard />
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
