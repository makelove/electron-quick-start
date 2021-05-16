/**
* @File    :   proxy.js
* @Time    :   2021/05/14 11:45:36
* @Author  :   HG
* @Desc    :
Node-Fetch设置http/https代理发送请求示例
https://www.jianshu.com/p/63d70a93a401
*/

const fetch = require("node-fetch");
const HttpsProxyAgent = require('https-proxy-agent');
let username = 'xxx'// oxylabs
let password = 'xxx' //TODO 
let country = 'MY'
proxy = { // oxylabs
    host: 'pr.oxylabs.io',
    port: 7777,
    auth: `customer-${username}-cc-${country}:${password}`
}
const httpsAgent = new HttpsProxyAgent(proxy)
let url = "http://ip-api.com/json/"

// let url="http://pv.sohu.com/cityjson";
// let url="http://ip-api.com/json";
// let url = "http://whois.pconline.com.cn/ipJson.jsp";

// let ip = '代理服务的IP';
// let port = '代理服务的端口';
// const httpsAgent =new HttpProxyAgent("http://" + ip + ":" + port)

fetch(url, {
    method: 'GET',
    // body: null,    
    redirect: 'follow', // set to `manual` to extract redirect headers, `error` to reject redirect 
    timeout: 10000,      //ms 
    agent: httpsAgent
}).then(function (res) {
    console.log("Response Headers ============ ");
    res.headers.forEach(function (v, i, a) {
        console.log(i + " : " + v);
    });
    return res.text();
}).then(function (res) {
    console.log("Response Body ============ ");
    console.log(res);
});