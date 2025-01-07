declare global {
  interface Window {
    api: {
      openDirectory: () => Promise<string[]>;
      downloadVideo: (payload: {
        url: string;
        savePath: string;
      }) => Promise<void>;
      onDownloadProgress: (
        callback: (progress: DownloadProgress) => void
      ) => void;
    };
  }
}

export interface DownloadProgress {
  status: "initializing" | "downloading" | "converting" | "complete" | "error";
  progress: number;
  message?: string;
}

export {};
