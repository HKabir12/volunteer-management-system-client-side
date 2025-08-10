import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-purple-900 to-indigo-950 p-4 font-sans text-white">
      <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-600 animate-pulse">
        404
      </h1>
      <p className="mt-8 mb-10 text-xl md:text-2xl text-gray-300 max-w-md mx-auto leading-relaxed">
        Oops! It looks like you've wandered off the path. The page you're
        looking for was not found.
      </p>
      <a
        href="/" 
        className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold text-lg rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-800 transition duration-300 transform hover:-translate-y-1 hover:scale-105"
      >
        Back to Home
      </a>
    </div>
  );
};

export default NotFound;