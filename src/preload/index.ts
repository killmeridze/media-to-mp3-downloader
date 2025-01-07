import { DownloadProgress } from "@/types";
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  openDirectory: () => ipcRenderer.invoke("dialog:openDirectory"),
  downloadVideo: (payload: { url: string; savePath: string }) =>
    ipcRenderer.invoke("downloadVideo", payload),
  onDownloadProgress: (callback: (progress: DownloadProgress) => void) => {
    ipcRenderer.on("download:progress", (_event, progress) =>
      callback(progress)
    );
  },
});
