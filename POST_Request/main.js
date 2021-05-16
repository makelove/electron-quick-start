/**
 * 文档 https://stackoverflow.com/questions/48106860/electron-webview-loadurl-post
 * 使用httpbin测试post请求
"main": "POST_Request/main.js",
 */



const  qs  = require('qs')
const { app, BrowserWindow ,session} = require('electron')
const path = require('path')

var huawei_ua='Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; BLA-AL00 Build/HUAWEIBLA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/8.9 Mobile Safari/537.36'
var iphone_ua='Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1';//TODO 

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

    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders['User-Agent'] = huawei_ua
        callback({ cancel: false, requestHeaders: details.requestHeaders });
      });

    // 开启开发工具
    // mainWindow.webContents.openDevTools()

    // do postData
    let pdata={
        'sku_id': '704101426554',
        'group_id': '43271854869',
        'goods_id': '184121859169',
        'goods_number': '1',
        'page_from': '0',
        'refer_page_element': 'open_btn',
        'source_channel': '0',
        'refer_page_name': 'goods_detail',
        'refer_page_id': '10014_1618404230081_yyet00inns',
        'refer_page_sn': '10014',
    }
  

    // and load the index.html of the app.
    //   mainWindow.loadFile('index.html')
    const url = "https://httpbin.org/post";
    // pupwindow.loadURL(url);
    // POST请求

    // mainWindow.loadURL(url, {//do 没有显示post数据
    //     postData: [{
    //         'sku_id': '704101426554',
    //         'group_id': '43271854869',
    //         'goods_id': '184121859169',
    //         'goods_number': '1',
    //         'page_from': '0',
    //         'refer_page_element': 'open_btn',
    //         'source_channel': '0',
    //         'refer_page_name': 'goods_detail',
    //         'refer_page_id': '10014_1618404230081_yyet00inns',
    //         'refer_page_sn': '10014',
    //     }],
    //     extraHeaders: 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', //用 "\n" 分割的额外标题
    // })

    // mainWindow.loadURL(url, {//不行
    //     postData:
    //         [{ type: 'rowData', bytes: Buffer.from('param1=value&param2=value') }],
    //     extraHeaders: 'Content-Type: application/x-www-form-urlencoded',
    // }    )
    mainWindow.loadURL(url, {// OK
        postData: [{
          type: "rawData",
        //   bytes: Buffer.from("foo=bar&hello=world")//可以 是form 表单数据 
        //   bytes: Buffer.from(pdata),//do
        //   bytes: Buffer.from(JSON.stringify(pdata)),//do
          bytes: Buffer.from(qs.stringify(pdata)),//do
        //   bytes: new ArrayBuffer(pdata),//do
        //   bytes: new ArrayBuffer(JSON.stringify(pdata)),//do
          /**结果
           * "form": {
                 "foo": "bar", 
                 "hello": "world"
            }, 
           */
        }],
        extraHeaders: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" //去掉后是 "data": "foo=bar", 
      });



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
