import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  openDirectory: () => ipcRenderer.invoke("dialog:openDirectory"),
});
