interface BaseStatus {
  message: string;
}

interface InitialStatus extends BaseStatus {
  type: "initial";
}

interface InvalidUrlStatus extends BaseStatus {
  type: "invalid_url";
}

interface UrlOnlyStatus extends BaseStatus {
  type: "url_only";
}

interface ReadyStatus extends BaseStatus {
  type: "ready";
}

type DownloadStatus =
  | InitialStatus
  | InvalidUrlStatus
  | UrlOnlyStatus
  | ReadyStatus;

const STATUS_CONFIG = {
  initial: "Ready to download. Paste a URL to begin.",
  invalid_url: "Please enter a valid YouTube, Instagram, or TikTok URL",
  url_only: "Please select a save location to begin",
  ready: "All set! Click Download to start converting",
} as const;

interface UseDownloadStatusProps {
  url: string;
  savePath: string;
  isValidUrl: boolean;
}

const determineStatus = ({
  url,
  savePath,
  isValidUrl,
}: UseDownloadStatusProps): DownloadStatus => {
  switch (true) {
    case Boolean(url && !isValidUrl):
      return { type: "invalid_url", message: STATUS_CONFIG.invalid_url };
    case Boolean(url && savePath && isValidUrl):
      return { type: "ready", message: STATUS_CONFIG.ready };
    case Boolean(url && isValidUrl):
      return { type: "url_only", message: STATUS_CONFIG.url_only };
    default:
      return { type: "initial", message: STATUS_CONFIG.initial };
  }
};

export const useDownloadStatus = (props: UseDownloadStatusProps) => {
  const status = determineStatus(props);

  return {
    status,
    message: status.message,
    isDownloadReady: status.type === "ready",
  } as const;
};

export const isReadyStatus = (status: DownloadStatus): status is ReadyStatus =>
  status.type === "ready";
