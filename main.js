// main.js
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const isOnline = require("is-online");

let mainWindow;
let splashWindow;

function createSplashWindow() {
  splashWindow = new BrowserWindow({
    width: 400,
    height: 400,
    frame: false,
    transparent: true,
    icon: path.join(__dirname, "assets", "Muslamix.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  splashWindow.loadFile("splash.html");
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    show: false,
    icon: path.join(__dirname, "assets", "Muslamix.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.setMenu(null);

  // Check internet connection before loading the main URL
  checkInternetAndLoad();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

async function checkInternetAndLoad() {
  try {
    const online = await isOnline();

    if (online) {
      mainWindow.loadURL("https://open.muslamix.app");

      // Show main window when content is ready
      mainWindow.webContents.on("did-finish-load", () => {
        if (splashWindow) {
          splashWindow.close();
          splashWindow = null;
        }
        mainWindow.show();
      });
    } else {
      mainWindow.loadFile("offline.html");
      if (splashWindow) {
        splashWindow.close();
        splashWindow = null;
      }
      mainWindow.show();
    }
  } catch (error) {
    console.error("Error checking internet connection:", error);
    mainWindow.loadFile("offline.html");
    if (splashWindow) {
      splashWindow.close();
      splashWindow = null;
    }
    mainWindow.show();
  }
}

// Handle retry button click from offline screen
ipcMain.on("retry-connection", () => {
  checkInternetAndLoad();
});

app.whenReady().then(() => {
  createSplashWindow();
  setTimeout(() => {
    createMainWindow();
  }, 2000); // Show splash screen for 2 seconds
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});
