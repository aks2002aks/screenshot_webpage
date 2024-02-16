import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { LuRefreshCw } from "react-icons/lu";
import { RiDownloadCloud2Line } from "react-icons/ri";
import Loader from "./Loader";
var validator = require("validator");

const Screenshot = () => {
  const [url, setUrl] = useState("");
  const [screenshotUrl, setScreenshotUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const takeScreenShot = async (e) => {
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }
    if (!validator.isURL(url, { require_protocol: true })) {
      toast.error("Invalid URL");
      return;
    }

    await toast.promise(fetchImageUrl(), {
      loading: "Getting Screenshot...",
      success: <b>Image Fetched!</b>,
      error: <b>Couldn't Fetch.</b>,
    });
    
    setLoading(false);
  };

  const fetchImageUrl = async () => {
    setLoading(true);
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
      setLoading(false);
    } else {
      setLoading(false);
      return Promise.reject(data.message);
    }
  };

  const handleDownload = async () => {
    const response = await fetch(screenshotUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "screenshot.png";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Release the object URL
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <div className="p-2 sm:pt-16 flex flex-col justify-center items-center">
      {loading && <Loader />}

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
        <>
          <div className="mt-6 text-center">
            <img
              src={screenshotUrl}
              alt="Website Screenshot"
              className="w-72"
            />
          </div>
          <div className="mt-6 flex justify-center items-center space-x-4">
            <button
              className="p-2 rounded-full bg-gray-200 w-24 flex justify-center hover:bg-gray-300 hover:text-orange-500 hover:scale-110 transition duration-300 ease-in-out transform"
              onClick={handleDownload}
            >
              <RiDownloadCloud2Line size={24} />
            </button>
            <button
              className="p-2 rounded-full bg-gray-200 w-24 flex justify-center hover:bg-gray-300 hover:text-orange-500 hover:scale-110 transition duration-300 ease-in-out transform"
              onClick={() => {
                setScreenshotUrl("");
                setUrl("");
              }}
            >
              <LuRefreshCw size={24} />
            </button>
          </div>
        </>
      )}
      <div className="">
        <h1 className="text-md font-bold text-center mt-5 mb-4">
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

export default Screenshot;
