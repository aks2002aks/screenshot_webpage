import React from "react";
import { RiScreenshot2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between items-center p-4 shadow-md sm:flex-row flex-col">
        <Link to={"/"} className="flex items-center space-x-4 hover:text-gray-800 hover:scale-110 transition duration-300 ease-in-out transform">
          <RiScreenshot2Line className="text-4xl" />
          <h1 className="text-2xl font-bold">ScreenShot</h1>
        </Link>
        <div className="flex space-x-4 sm:mr-4 mr-0">
          <Link
            to="/how-to-use"
            className="text-lg  text-gray-600 hover:text-gray-800 hover:scale-110 transition duration-300 ease-in-out transform"
          >
            How to use
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
