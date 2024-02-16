import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import HowToUse from "./HowToUse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Screenshot from "./Screenshot";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="">
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/screenshot",
    element: (
      <div className="">
        <Navbar />
        <Screenshot />
      </div>
    ),
  },
  {
    path: "/how-to-use",
    element: (
      <div className="">
        <Navbar />
        <HowToUse />
      </div>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
