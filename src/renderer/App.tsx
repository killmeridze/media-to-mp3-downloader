import React from "react";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient bg-[size:400%_400%] text-white p-8 animate-gradient">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight relative">
            <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 blur-xl opacity-50"></span>
            <span className="relative text-white">Media to MP3 Converter</span>
          </h1>
          <p className="text-gray-200 mt-2 font-medium">
            Download and convert media from YouTube, Instagram, and TikTok
          </p>
        </header>

        {/* Main Content */}
        <div className="space-y-6 bg-white/10 backdrop-blur-lg p-6 rounded-lg border border-white/20">
          {/* URL Input */}
          <div className="space-y-2">
            <label className="text-sm text-gray-200">Media URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Paste your URL here..."
                className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-2 rounded-lg font-medium transition-all duration-300">
                Download
              </button>
            </div>
          </div>

          {/* Save Location */}
          <div className="space-y-2">
            <label className="text-sm text-gray-200">Save Location</label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                placeholder="Choose save location..."
                className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-2 cursor-not-allowed"
              />
              <button className="bg-black/30 hover:bg-black/40 px-4 py-2 rounded-lg font-medium transition-all duration-300 border border-white/10">
                Browse
              </button>
            </div>
          </div>
        </div>

        {/* Status Area */}
        <div className="bg-black/20 backdrop-blur-lg rounded-lg p-4 border border-white/10">
          <p className="text-gray-200 text-center text-sm">
            Ready to download. Paste a URL to begin.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
