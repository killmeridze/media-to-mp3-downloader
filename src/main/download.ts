const { spawn } = require("child_process");
const pathModule = require("path");

const DOWNLOAD_CONFIG = Object.freeze({
  format: "ba",
  options: {
    playlist: false,
    fragments: 4,
    warnings: false,
    network: "ipv4",
    certificates: false,
  },
});

const buildDownloadCommand = (url, savePath) => [
  url,
  "-o",
  pathModule.join(savePath, "%(title)s.%(ext)s"),
  "--format",
  DOWNLOAD_CONFIG.format,
  "--no-playlist",
  "--concurrent-fragments",
  String(DOWNLOAD_CONFIG.options.fragments),
  "--no-warnings",
  "--force-ipv4",
  "--no-check-certificates",
];

const createProgressHandler = (window) => {
  const send = (progress) => {
    window?.webContents.send("download:progress", progress);
  };

  return {
    init: () =>
      send({
        status: "initializing",
        progress: 0,
        message: "Starting download...",
      }),
    update: (percent) =>
      send({
        status: "downloading",
        progress: percent,
        message: `Downloading... ${percent.toFixed(1)}%`,
      }),
    complete: () =>
      send({
        status: "complete",
        progress: 100,
        message: "Download complete!",
      }),
    error: () =>
      send({
        status: "error",
        progress: 0,
        message: "Download failed",
      }),
  };
};

const parseProgress = (output) => {
  if (!output.includes("[download]")) return null;

  const match = output.match(/(\d+\.?\d*)%/);
  return match ? parseFloat(match[1]) : null;
};

module.exports.handleDownloadRequest = async (_event, { url, savePath }) => {
  const window = require("electron").BrowserWindow.getFocusedWindow();
  const progress = createProgressHandler(window);
  progress.init();

  const exePath = pathModule.join(__dirname, "../../resources/bin/yt-dlp.exe");
  const child = spawn(exePath, buildDownloadCommand(url, savePath));

  child.stdout.on("data", (data) => {
    const percent = parseProgress(data.toString());
    if (percent !== null) {
      progress.update(percent);
    }
  });

  return new Promise((resolve, reject) => {
    child.on("close", (code) => {
      if (code === 0) {
        progress.complete();
        resolve();
      } else {
        progress.error();
        reject(new Error(`Process exited with code ${code}`));
      }
    });
  });
};
