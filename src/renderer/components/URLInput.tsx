import React from "react";

interface URLInputProps {
  url: string;
  setUrl: (value: string) => void;
  handleDownloadClick: () => void;
  isDownloadReady: boolean;
  isDownloading: boolean;
}

const URLInput: React.FC<URLInputProps> = ({
  url,
  setUrl,
  handleDownloadClick,
  isDownloadReady,
  isDownloading,
}) => (
  <div className="space-y-2">
    <label className="text-sm text-gray-200">Media URL</label>
    <div className="flex gap-2">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste your URL here..."
        className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
      <button
        onClick={handleDownloadClick}
        disabled={!isDownloadReady || isDownloading}
        className={`${
          !isDownloadReady || isDownloading
            ? "opacity-50 cursor-not-allowed"
            : "hover:from-purple-600 hover:to-pink-600"
        } bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-lg font-medium transition-all duration-300`}
      >
        {isDownloading ? "Downloading..." : "Download"}
      </button>
    </div>
  </div>
);

export default URLInput;
