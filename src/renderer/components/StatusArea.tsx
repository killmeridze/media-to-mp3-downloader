import React from "react";
import ProgressBar from "./ProgressBar";
import { DownloadProgress } from "../../types";

interface StatusAreaProps {
  message: string;
  downloadStatus?: DownloadProgress;
}

const StatusArea: React.FC<StatusAreaProps> = ({ message, downloadStatus }) => (
  <div className="bg-black/20 backdrop-blur-lg rounded-lg p-4 border border-white/10 h-[72px] flex flex-col justify-center">
    {downloadStatus && downloadStatus.status !== "complete" ? (
      <>
        <p className="text-gray-200 text-center text-sm mb-2">
          {downloadStatus.message}
        </p>
        <ProgressBar progress={downloadStatus.progress} />
      </>
    ) : (
      <p className="text-gray-200 text-center text-sm">
        {downloadStatus ? downloadStatus.message : message}
      </p>
    )}
  </div>
);

export default StatusArea;
