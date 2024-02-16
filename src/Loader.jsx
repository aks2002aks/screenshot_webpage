import React from "react";

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog">
      <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center space-x-4"></div>
    </div>
  );
}

export default Loader;
