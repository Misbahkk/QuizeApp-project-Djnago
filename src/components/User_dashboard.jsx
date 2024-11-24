import React from "react";

const User_dashboard = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex gap-5 ml-8 mt-4">
          <i class="fa-solid fa-user text-red-500 text-2xl"></i>
          <div className="ml-3">
            <h1 className="text-xl">Misbah Yousaf</h1>
            <p className="text-sm text-gray-400">misbah@gmail.com</p>
          </div>
        </div>
        <div>
          <button className="bg-red-500 text-white rounded-sm px-5 py-1 mr-12">
            Edit
          </button>
        </div>
      </div>

      {/* Form div */}
      <div className=" mt-3">
        <form>
          <div className="flex items-center gap-20 ml-5">
            <div>
              <label className="ml-1">Full Name</label>
              <br />
              <input
                type="text"
                placeholder="Your First Name"
                className="bg-red-100 pr-52 py-1 pl-2 mt-2 rounded"
              />
            </div>
            <div>
              <label className="ml-1">Last Name</label>
              <br />
              <input
                type="text"
                placeholder="Your Last Name"
                className="bg-red-100 pr-60 py-1 pl-2 mt-2 rounded"
              />
            </div>
          </div>

          <div className="flex items-center gap-20 ml-5 mt-5">
            <div>
              <label className="ml-1">Gender</label>
              <br />
              <select
                name="gender"
                className="bg-red-100 pr-80 py-1 pl-2 mt-2 rounded"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="ml-1">Country</label>
              <br />
              <select
                name="country"
                className="bg-red-100 pr-80 py-1 pl-2 mt-2 rounded"
              >
                <option value="pakistan">Pakistan</option>
                <option value="india">India</option>
                <option value="bangladesh">Bangladesh</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-20 ml-5 mt-5">
            <div>
              <label className="ml-1">Language</label>
              <br />
              <select
                name="language"
                className="bg-red-100 pr-80 py-1 pl-2 mt-2 rounded"
              >
                <option value="english">English</option>
                <option value="urdu">Urdu</option>
                <option value="sindhi">Sindhi</option>
              </select>
            </div>
            <div>
              <label className="ml-1">Time zone</label>
              <br />
              <select
                name="country"
                className="bg-red-100 pr-80 py-1 pl-2 mt-2 rounded"
              >
                <option value="pakistan">Pakistan</option>
                <option value="india">India</option>
                <option value="bangladesh">Bangladesh</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default User_dashboard;
