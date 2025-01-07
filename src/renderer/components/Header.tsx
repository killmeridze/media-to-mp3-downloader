import React from "react";

const Header: React.FC = () => (
  <header className="text-center">
    <h1 className="text-4xl font-bold tracking-tight relative">
      <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 blur-xl opacity-50"></span>
      <span className="relative text-white">Media to MP3 Converter</span>
    </h1>
    <p className="text-gray-200 mt-2 font-medium">
      Download and convert media from YouTube, Instagram, and TikTok
    </p>
  </header>
);

export default Header;
