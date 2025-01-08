const { spawn } = require("child_process");
const pathModule = require("path");

const DOWNLOAD_CONFIG = Object.freeze({
  formats: {
    default: "ba",
    tiktok: "bv*+ba/b",
  },
  options: {
    playlist: false,
    fragments: 4,
    warnings: false,
    network: "ipv4",
    certificates: false,
  },
});

const buildDownloadCommand = (url, savePath) => {
  const isTikTok = url.includes("tiktok.com");
  const format = isTikTok
    ? DOWNLOAD_CONFIG.formats.tiktok
    : DOWNLOAD_CONFIG.formats.default;

  return [
    url,
    "-o",
    pathModule.join(savePath, "%(title)s.%(ext)s"),
    "--format",
    format,
    "--no-playlist",
    "--concurrent-fragments",
    String(DOWNLOAD_CONFIG.options.fragments),
    "--no-warnings",
    "--force-ipv4",
    "--no-check-certificates",
  ];
};

const createProgressHandler = (window) => {
  const send = (progress) => {
    window?.webContents.send("download:progress", progress);
  };

  return {
    init: () =>
      send({
        status: "initializing",
        progress: 0,
        message: "Initializing download...",
        showProgress: false,
        isError: false,
      }),
    update: (percent) =>
      send({
        status: "downloading",
        progress: percent,
        message: `Downloading... ${percent.toFixed(1)}%`,
        showProgress: true,
        isError: false,
      }),
    complete: () =>
      send({
        status: "complete",
        progress: 100,
        message: "Download complete!",
        showProgress: false,
        isError: false,
      }),
    error: (message = "Download failed") =>
      send({
        status: "error",
        progress: 0,
        message,
        showProgress: false,
        isError: true,
      }),
  };
};

const parseProgress = (output) => {
  if (!output.includes("[download]")) return null;

  const match = output.match(/(\d+\.?\d*)%/);
  return match ? parseFloat(match[1]) : null;
};

const isNoMediaError = (output) => {
  return (
    output.includes("Downloading 0 items") ||
    output.includes("Unable to extract video url") ||
    output.includes("[instagram:user]")
  );
};

const isUnsupportedTikTokError = (output) => {
  return (
    output.includes("Unsupported URL") &&
    output.includes("tiktok.com") &&
    output.includes("/photo/")
  );
};

module.exports.handleDownloadRequest = async (_event, { url, savePath }) => {
  const window = require("electron").BrowserWindow.getFocusedWindow();
  const progress = createProgressHandler(window);
  progress.init();

  let hasError = false;
  let errorOutput = "";

  const exePath = pathModule.join(__dirname, "../../resources/bin/yt-dlp.exe");
  const child = spawn(exePath, buildDownloadCommand(url, savePath));

  return new Promise((resolve, reject) => {
    child.stdout.on("data", (data) => {
      const output = data.toString();
      const percent = parseProgress(output);
      if (percent !== null) {
        progress.update(percent);
      }
      if (isNoMediaError(output)) {
        hasError = true;
        progress.error("This post does not contain downloadable audio content");
        child.kill();
        resolve();
      }
    });

    child.stderr.on("data", (data) => {
      const error = data.toString();
      errorOutput += error;

      if (isNoMediaError(error)) {
        hasError = true;
        progress.error("This post does not contain downloadable audio content");
        child.kill();
        resolve();
      } else if (isUnsupportedTikTokError(error)) {
        hasError = true;
        progress.error("TikTok photo posts are not supported");
        child.kill();
        resolve();
      } else {
        hasError = true;
        progress.error("Failed to process download request");
        reject(new Error("Failed to process download request"));
      }
    });

    child.on("close", (code) => {
      if (code === 0 && !hasError) {
        progress.complete();
        resolve();
      } else if (!hasError) {
        reject(new Error(`Process exited with code ${code}`));
      }
    });
  });
};
