const { app, BrowserWindow, Menu } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const remoteMain = require("@electron/remote/main");
remoteMain.initialize();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      // These are needed in order to be able to
      // use node features like "require" in the renderer code
      // for the  window
      nativeWindowOpen: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // allow the remote module to be used in the window/renderer
  remoteMain.enable(mainWindow.webContents);

  const startURL = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(startURL);

  mainWindow.webContents.openDevTools();

  mainWindow.once("ready-to-show", () => mainWindow.show());
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

const isMac = process.platform === "darwin";
const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? []
    : [
        {
          label: app.name,
          submenu: [
            { label: "Save File" },
            { label: "Load File" },
            { role: "about" },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideOthers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" },
          ],
        },
        {
          label: "View",
          submenu: [
            { role: "reload" },
            { role: "forceReload" },
            { role: "toggleDevTools" },
            { type: "separator" },
            { role: "resetZoom" },
            { role: "zoomIn" },
            { role: "zoomOut" },
            { type: "separator" },
            { role: "togglefullscreen" },
          ],
        },
      ]),
  {
    label: "File",
    submenu: [isMac ? { role: "close" } : { role: "quit" }],
  },
];

function createMenu() {
  JSON.stringify(template, function (key, val) {
    if (key === "label" && !this.submenu && !this.role) {
      this.click = (...args) => menuClickHandler(...args);
    }
    if (key === "accelerator" && val instanceof Array) {
      // if an accelerator/key short cut is coded as an array
      // we change it to a string, according to the rule
      // the first array item => mac specific, second => everywhere else
      this.accelerator = process.platform === "darwin" ? val[0] : val[1];
    }
    return val;
  });

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

let menuEvents = {
  Reload: () => console.log("Reload!"),
  "Learn more": () => console.log("Learn more"),
  "Toggle Developer Tools": (item, focusedWindow) => {
    console.log("Toggle Developer Tools");
    if (focusedWindow) {
      focusedWindow.webContents.toggleDevTools();
    }
  },
};

// Handle clicks in the menu
function menuClickHandler(menuItem) {
  console.log("You have chosen the menu item", menuItem.label);
  // Send the menu choice to the mainWindow renderer process
  mainWindow.webContents.send("menuChoice", menuItem.label);
  // If a method with the name of the label
  //  exists in menuEvents then run that method
  menuEvents[menuItem.label] && menuEvents[menuItem.label](menuItem);
}

app.on("ready", createWindow);
app.on("ready", createMenu);
