// main.js
const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    icon: path.join(__dirname, "assets", "Muslamix.png"),
    webPreferences: {
      nodeIntegration: false,
    },
  });

  win.setMenu(null);

  win.loadURL("https://open.muslamix.app/"); // replace with your site
}

app.whenReady().then(createWindow);
