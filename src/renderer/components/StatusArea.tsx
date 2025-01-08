import React from "react";
import ProgressBar from "./ProgressBar";
import { DownloadProgress } from "../../types";

interface StatusAreaProps {
  message: string;
  downloadStatus?: DownloadProgress;
}

const StatusArea: React.FC<StatusAreaProps> = ({ message, downloadStatus }) => (
  <div className="bg-black/20 backdrop-blur-lg rounded-lg p-4 border border-white/10 h-[72px] flex flex-col justify-center">
    {downloadStatus ? (
      <>
        <p
          className={`text-center text-sm ${
            downloadStatus.isError
              ? "text-red-400 font-medium"
              : "text-gray-200"
          } ${!downloadStatus.showProgress ? "mb-0" : "mb-2"}`}
        >
          {downloadStatus.message}
        </p>
        {downloadStatus.showProgress && (
          <ProgressBar progress={downloadStatus.progress} />
        )}
      </>
    ) : (
      <p className="text-gray-200 text-center text-sm">{message}</p>
    )}
  </div>
);

export default StatusArea;
