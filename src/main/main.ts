const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

app.disableHardwareAcceleration();

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 540,
    // resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "../../out/preload/index.js"),
      sandbox: true,
    },
  });

  if (!app.isPackaged) {
    mainWindow.loadURL("http://localhost:5173/");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}

let lastSelectedPath = app.getPath("downloads");

ipcMain.handle("dialog:openDirectory", async () => {
  const result = await dialog.showOpenDialog({
    defaultPath: lastSelectedPath,
    properties: ["openDirectory"],
  });

  if (!result.canceled && result.filePaths.length > 0) {
    lastSelectedPath = result.filePaths[0];
  }

  return result.filePaths;
});

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
