import React from "react";

const Loader = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform z-50 -translate-x-1/2 -translate-y-1/2">
      <p className="text-3xl font-bold tracking-widest text-black-500 animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loader;
