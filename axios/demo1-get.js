/**
 * http://axios-js.com/zh-cn/docs/#%E6%A1%88%E4%BE%8B
 */
const axios = require("axios");
let url = 'http://httpbin.org/get'
// let rs=
axios.get(url, { headers: { 'User-Agent': 'YOUR-SERVICE-NAME' } })
  .then(res => {
    console.log(res.data);
    // let js=JSON.parse(res)
    // return js
  }).catch(function (error) {
    console.log(error);
  });


// console.log(rs);