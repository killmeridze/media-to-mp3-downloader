import { useState, useEffect } from "react";
import { DownloadProgress } from "../../types";
import { useUrlValidator } from "./useUrlValidator";
import { useDownloadStatus } from "./useDownloadStatus";

interface DownloadState {
  savePath: string;
  url: string;
  downloadStatus: DownloadProgress | undefined;
  isDownloading: boolean;
}

interface DownloadHandlers {
  handleDirectorySelect: () => Promise<void>;
  handleDownloadClick: () => Promise<void>;
}

export const useDownloadManager = () => {
  const [state, setState] = useState<DownloadState>({
    savePath: "",
    url: "",
    downloadStatus: undefined,
    isDownloading: false,
  });

  const { isValidUrl } = useUrlValidator(state.url);
  const { message, isDownloadReady } = useDownloadStatus({
    url: state.url,
    savePath: state.savePath,
    isValidUrl,
  });

  const handleDirectorySelect: DownloadHandlers["handleDirectorySelect"] =
    async () => {
      const paths = await window.api.openDirectory();
      if (paths?.[0]) {
        setState((prev) => ({ ...prev, savePath: paths[0] }));
      }
    };

  const handleDownloadClick: DownloadHandlers["handleDownloadClick"] =
    async () => {
      if (!isDownloadReady || state.isDownloading) return;

      setState((prev) => ({
        ...prev,
        isDownloading: true,
        downloadStatus: {
          status: "initializing",
          progress: 0,
          message: "Initializing download...",
        },
      }));

      try {
        await window.api.downloadVideo({
          url: state.url,
          savePath: state.savePath,
        });
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Download failed";
        setState((prev) => ({
          ...prev,
          downloadStatus: {
            status: "error",
            progress: 0,
            message: errorMessage,
          },
        }));
      }
    };

  useEffect(() => {
    const handleProgress = (progress: DownloadProgress) => {
      setState((prev) => ({ ...prev, downloadStatus: progress }));
    };

    window.api.onDownloadProgress(handleProgress);
  }, []);

  useEffect(() => {
    if (["complete", "error"].includes(state.downloadStatus?.status ?? "")) {
      setState((prev) => ({ ...prev, isDownloading: false }));
    }
  }, [state.downloadStatus?.status]);

  const setUrl = (url: string) => setState((prev) => ({ ...prev, url }));

  return {
    url: state.url,
    savePath: state.savePath,
    downloadStatus: state.downloadStatus,
    isDownloading: state.isDownloading,
    isDownloadReady,
    message,

    setUrl,
    handleDirectorySelect,
    handleDownloadClick,
  } as const;
};
