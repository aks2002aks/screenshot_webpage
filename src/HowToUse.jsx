import React from "react";

const HowToUse = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal mb-4">
        How To Use the Screenshot App
      </h1>
      <div className="flex flex-col  items-start  justify-center">
        {/* Left Column: Instructions */}
        <div className=" mb-8 ">
          <h2 className="text-xl font-semibold mb-4">Instructions:</h2>
          <ul className="list-disc list-inside">
            <li className="mb-2">
              Enter the URL of the website you want to capture.
            </li>
            <li className="mb-2">Click on the "Capture" button.</li>
            <li className="mb-2">
              Wait for the app to validate the URL and request a screenshot from
              pikwy.com API.
            </li>
            <li className="mb-2">
              Once the screenshot is received, it is stored in Cloudinary for
              easy access and displayed on the page.
            </li>
            <li>Click the "Download" button to save the screenshot.</li>
          </ul>
        </div>
        {/* Right Column: Screenshot Image */}
        <div className="">
          <img
            src={"/screenshot.png"}
            alt="Screenshot Example"
            className="w-full rounded-lg"
          />
          <p className="text-sm text-gray-500 mt-2">
            Example of a captured screenshot
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;
