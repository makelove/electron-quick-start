/**
"main": "dark-mode/main.js",
 */


const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),// 但预加载的 js 文件内仍可以使用 Nodejs 的 API
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // 开启开发工具
  win.webContents.openDevTools()

  // win.loadFile('./dark-mode/index.html')
  win.loadURL('file://' + path.join(__dirname, 'index.html'))

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
