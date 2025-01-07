import React from "react";
import Header from "./components/Header";
import URLInput from "./components/URLInput";
import SaveLocation from "./components/SaveLocation";
import StatusArea from "./components/StatusArea";
import { useDownloadManager } from "./hooks/useDownloadManager";

const App: React.FC = () => {
  const {
    url,
    setUrl,
    savePath,
    handleDirectorySelect,
    handleDownloadClick,
    downloadStatus,
    isDownloading,
    isDownloadReady,
    message,
  } = useDownloadManager();

  return (
    <div className="min-h-screen bg-gradient bg-[size:400%_400%] text-white p-8 animate-gradient flex items-center justify-center">
      <div className="w-[800px] space-y-8">
        <Header />

        <div className="space-y-6 bg-white/10 backdrop-blur-lg p-6 rounded-lg border border-white/20">
          <URLInput
            url={url}
            setUrl={setUrl}
            handleDownloadClick={handleDownloadClick}
            isDownloadReady={isDownloadReady}
            isDownloading={isDownloading}
          />

          <SaveLocation
            savePath={savePath}
            handleDirectorySelect={handleDirectorySelect}
          />
        </div>

        <StatusArea message={message} downloadStatus={downloadStatus} />
      </div>
    </div>
  );
};

export default App;
