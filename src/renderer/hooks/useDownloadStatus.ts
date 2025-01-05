export enum DownloadStatus {
  INITIAL = "INITIAL",
  INVALID_URL = "INVALID_URL",
  URL_ONLY = "URL_ONLY",
  READY = "READY",
}

type StatusMessage = {
  [key in DownloadStatus]: string;
};

const statusMessages: StatusMessage = {
  [DownloadStatus.INITIAL]: "Ready to download. Paste a URL to begin.",
  [DownloadStatus.INVALID_URL]:
    "Please enter a valid YouTube, Instagram, or TikTok URL",
  [DownloadStatus.URL_ONLY]: "Please select a save location to begin",
  [DownloadStatus.READY]: "All set! Click Download to start converting",
};

type UseDownloadStatusProps = {
  url: string;
  savePath: string;
  isValidUrl: boolean;
};

export const useDownloadStatus = ({
  url,
  savePath,
  isValidUrl,
}: UseDownloadStatusProps) => {
  const getCurrentStatus = (): DownloadStatus => {
    switch (true) {
      case Boolean(url && !isValidUrl):
        return DownloadStatus.INVALID_URL;
      case Boolean(url && savePath && isValidUrl):
        return DownloadStatus.READY;
      case Boolean(url && isValidUrl):
        return DownloadStatus.URL_ONLY;
      default:
        return DownloadStatus.INITIAL;
    }
  };

  return {
    status: getCurrentStatus(),
    message: statusMessages[getCurrentStatus()],
    isDownloadReady: Boolean(url && savePath && isValidUrl),
  };
};
