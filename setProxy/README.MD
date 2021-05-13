## 设置代理

-  参考 https://github.com/electron/electron/issues/14441
     - PAC文件
```javascript
mainWindow.webContents.session.setProxy({pacScript:"http://proxy.xyz.com:9001/production.pac"}, 
    function() {
          mainWindow.loadURL(`file://${path.join(__dirname, "/dist/app.html")}`);
});
```