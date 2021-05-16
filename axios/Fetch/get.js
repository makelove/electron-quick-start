/**
* @File    :   get.js
* @Time    :   2021/05/14 11:44:42
* @Author  :   HG
* @Desc    :
https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
*/
const fetch = require("node-fetch");

fetch('http://httpbin.org/get')
    .then(function (response) {
        // return response.json();
        return response.text();
    })
    .then(function (myJson) {
        console.log(myJson);
    });