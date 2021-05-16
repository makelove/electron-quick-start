/**
 * http://axios-js.com/zh-cn/docs/#%E6%A1%88%E4%BE%8B
 */
const axios = require("axios");
let url = 'http://mobile.pinduoduo.com/goods.html?goods_id=230168706041'
// let rs=
axios.get(url, { headers: { 'User-Agent': 'YOUR-SERVICE-NAME' } })
  .then(res => {
    console.log(res.data.slice(0, 50));//html
    console.log('-----------');
    let html = res.data

    // 正则
    var reg = /window.rawData= ?(?<rawData>{.*});/
    let mo = reg.exec(html)
    if (mo == null) {
      console.log('没有找到');
      return
    }
    let rawData = mo.groups.rawData
    if (rawData == null) {
      console.log('被反爬，使用代理重新请求');
      return
    }
    console.log('rawData:', rawData.slice(0, 50));//字符串
    console.log('-----------');
    let js = JSON.parse(rawData)

    console.log(js);

    // return js
  }).catch(function (error) {
    console.log(error);
  });

// console.log(rs);