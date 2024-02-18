import React, { useState, useEffect } from "react";
import Loader from "./Loader";

const AllImages = () => {
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/getAllImages`
      );
      const data = await response.json();
      setAllImages(data.images);
      setLoading(false);
    };
    fetchImages();
  }, []);

  return (
    <div className="conatiner flex flex-wrap justify-center items-center">
      {loading && <Loader />}
      {allImages &&
        allImages.map((image, index) => (
          <div
            className="card m-3 "
            style={{
              width: "25rem",
              border: "none",
              cursor: "pointer",
            }}
            key={index}
          >
            <img
              src={image}
              alt="my-not-viewalble"
              className="border-2 border-gray-200 shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            />
          </div>
        ))}
    </div>
  );
};

export default AllImages;
