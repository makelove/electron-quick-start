/**
 * 页面导航
"main": "navigate/main.js",

打印路径 devtool
document.location.href
 */


// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            //   preload: path.join(__dirname, 'preload.js'),// 但预加载的 js 文件内仍可以使用 Nodejs 的 API
            nodeIntegration: true
        },

    })

    // 开启开发工具
    mainWindow.webContents.openDevTools()

    // and load the index.html of the app.
    // mainWindow.loadFile(path.join(__dirname, 'index.html'))//效果一样
    mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'))

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    mainWindow.webContents.on('did-finish-load', async function () {
        //页面加载成功后 
        let href = mainWindow.webContents.getURL()
        // let href = await await page.evaluate(() => { return document.location.href })
        console.log('页面加载成功后 did-finish-load', href);
        console.log('-----------------');
    });
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
