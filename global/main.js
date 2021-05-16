/**
 * 全局变量
 * electron中如何共享数据--global 
在electron中，可以在主进y程中添加一个全局变量，然后在渲染进程中通过remote模块引入 
global.shareObject = {
   name:'我是那个共享数据'
} 

electron主进程渲染进程，如何利用sharedObject共享数据？
https://newsn.net/say/electron-shared-object.html

"main": "global/main.js",
 */

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

var iphoneX_ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'

global.shareObject = {
  name: '我是那个共享数据'
}

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
  mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'),
    {
      userAgent: iphoneX_ua
    })


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
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform == 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
