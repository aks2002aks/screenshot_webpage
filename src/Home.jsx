import React, { useState } from "react";
import { toast } from "react-hot-toast";
var validator = require("validator");

const Home = () => {
  const [url, setUrl] = useState("");
  const [screenshotUrl, setScreenshotUrl] = useState("");

  const takeScreenShot = async (e) => {
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }
    if (!validator.isURL(url, { require_protocol: true })) {
      toast.error("Invalid URL");
      return;
    }

    toast.promise(fetchImageUrl(), {
      loading: "Getting Screenshot...",
      success: <b>Image Fetched!</b>,
      error: <b>Could not save.</b>,
    });
  };

  const fetchImageUrl = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/saveImageAndGetImageUrl`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      }
    );
    const data = await response.json();

    if (data.success) {
      console.log(data);
      setScreenshotUrl(data.imageUrl);
    } else {
      return Promise.reject(data.message);
    }
  };

  return (
    <div className="p-2 sm:p-0 h-[90vh] flex flex-col justify-center items-center">
      <div className="">
        <h1 className="text-4xl font-bold text-center mb-4">
          Paste a url to take ScreenShot
        </h1>
        <p className="text-center text-lg">
          Take screenshots of your favorite websites
        </p>
      </div>
      <div className="">
        <div className="flex justify-center items-center mt-8 w-full sm:flex-row flex-col space-y-4 sm:space-y-0">
          <input
            type="text"
            name="url"
            id="url"
            className="   
            border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none w-full sm:w-96"
            placeholder="Enter a URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                takeScreenShot();
              }
            }}
          />
          <button
            className="ml-2 bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded"
            onClick={takeScreenShot}
          >
            Take Screenshot
          </button>
        </div>
      </div>
      {screenshotUrl && (
        <div>
          <p>Website Screenshot:</p>
          <img src={screenshotUrl} alt="Website Screenshot" />
        </div>
      )}
      <div className="">
        <h1 className="text-md font-bold text-center mt-20 mb-4">
          No Url ? Try one of these:
        </h1>
        <div className="flex">
          <ul className="flex justify-center items-center space-x-4 flex-wrap">
            <li>
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setUrl("https://www.google.com")}
              >
                Google
              </span>
            </li>
            <li>
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setUrl("https://www.facebook.com")}
              >
                Facebook
              </span>
            </li>
            <li>
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setUrl("https://www.twitter.com")}
              >
                Twitter
              </span>
            </li>
            <li>
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setUrl("https://www.wikipedia.org/")}
              >
                Wikipedia
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-[12px] flex justify-center items-center mt-6 text-center">
        <span>
          By Uploading a URL you agree to our{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Privacy Policy.
          </span>
        </span>
      </div>
    </div>
  );
};

export default Home;
