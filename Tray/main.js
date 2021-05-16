/**
 * 系统托盘，任务栏

"main": "Tray/main.js",
 */

// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, Tray } = require('electron')
const path = require('path')
let tray = null



function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),// 但预加载的 js 文件内仍可以使用 Nodejs 的 API
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },

  })

  // 开启开发工具
  mainWindow.webContents.openDevTools()

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  //系统托盘
  tray = new Tray(path.join(__dirname, 'icon.jpeg')) ///path/to/my/icon
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },//TODO  点击回调
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform == 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
