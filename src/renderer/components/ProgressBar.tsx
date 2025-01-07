import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
      style={{ width: `${progress}%` }}
    />
  </div>
);

export default ProgressBar;
