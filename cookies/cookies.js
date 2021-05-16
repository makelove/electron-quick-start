// Query and modify a session's cookies.
//
// For more info, see:
// https://electronjs.org/docs/api/cookies
// 成功测试 。先看官方文档，复制下来
// "main": "cookies/cookies.js",

const { app, BrowserWindow, session } = require('electron')

app.whenReady().then(() => {
    const mainWindow = new BrowserWindow({
        height: 600,
        width: 600,
        webPreferences: {
            nodeIntegration: false
        }
    })

    // Once the window has finished loading, let's check out
    // the cookies
    mainWindow.webContents.on('did-finish-load', () => {
        console.log('------did-finish-load')

        // 查询所有 cookies。

        session.defaultSession.cookies.get({})
            .then((cookies) => {
                console.log('---------');
                console.log('查询所有 cookies。');
                console.log(cookies)
            }).catch((error) => {
                console.log(error)
            })


        // 设置一个 cookie，使用设置的名称；
        // 如果存在，则会覆盖原先 cookie.

        const cookie = { url: 'http://www.github.com', name: 'dummy_name', value: 'dummy' }
        session.defaultSession.cookies.set(cookie)
            .then(() => {
                console.log('---------');
                // success
                console.log('设置一个 cookie，使用设置的名称；');
                console.log('cookies.set成功');
            }, (error) => {
                console.error(error)
            })

        // 查询所有与设置的 URL 相关的所有 cookies.

        session.defaultSession.cookies.get({ url: 'http://www.github.com' })
            .then((cookies) => {
                console.log('---------');
                console.log('查询所有与设置的 URL 相关的所有 cookies.');
                console.log(cookies)
            }).catch((error) => {
                console.log(error)
            })




    })

    mainWindow.loadURL('https://cn.bing.com/')
})

app.on('window-all-closed', function () {
    if (process.platform == 'darwin') app.quit()
})