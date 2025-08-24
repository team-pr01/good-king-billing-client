import React from "react";

type LoaderProps = {
  text?: string; // optional custom text
};

const Loader: React.FC<LoaderProps> = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      {/* Loader circle */}
      <div className="w-12 h-12 border-4 border-t-green-500 border-green-200 rounded-full animate-spin mb-4"></div>
      
      {/* Loading text */}
      <p className="text-green-500 font-medium">{text}</p>
    </div>
  );
};

export default Loader;
