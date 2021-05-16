// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.


console.log('Rending渲染');


const { clipboard } = window.require('electron')
clipboard.writeText('Example String', 'selection')
console.log(clipboard.readText('selection'))//OK

const remote = require('electron').remote
// 1、获取
let res = remote.getGlobal('shareObject').name
console.log('修改前 ：', res) // 打印‘我是那个共享数据’

// 2、也可以改变这个数据
remote.getGlobal('shareObject').name = '我是重新被定义后的共享数据'

res = remote.getGlobal('shareObject').name
console.log('修改后 ：', res)

const axios = require("axios");
function axioste() {
    let url = 'http://httpbin.org/get'
    axios.get(url, { headers: { 'User-Agent': 'YOUR-SERVICE-NAME' } })//问题 /node_modules/axios/lib/adapters/xhr.js:125 Refused to set unsafe header "User-Agent"
        //问题解决。loadURL 在主进程使用axios就没有这个问题
        .then(res => {
            console.log(res.data);
            // let js=JSON.parse(res)
            // return js
        }).catch(function (error) {
            console.log(error);
        });
}