/**
* @File    :   use_proxy.js
* @Time    :   2021/05/06 16:09:57
* @Author  :   HG
* @Desc    :   使用代理

https://github.com/axios/axios/issues/2072
*/

const HttpsProxyAgent = require("https-proxy-agent")
var axios = require('axios');

const { username, password } = require('./config')
let country = 'MY'

let proxy
// proxy = {//ssr
//     host: '127.0.0.1',
//     port: 8118,
// }
proxy = { // oxylabs
    host: 'pr.oxylabs.io',
    port: 7777,
    auth: { username: `customer-${username}-cc-${country}`, password: password }
}

console.log(proxy);
// let ipUrl='https://api.ipify.org?format=json'
// let ipUrl = 'http://httpbin.org/get?answer=42'
// let ipUrl = 'https://ipinfo.io'
let ipUrl = 'https://www.lazada.com.my/catalog/?_keyori=ss&ajax=true&from=input&page=1&q=bag'


proxy = { // oxylabs
    host: 'pr.oxylabs.io',
    port: 7777,
    auth: `customer-${username}-cc-${country}:${password}`
}
const httpsAgent = new HttpsProxyAgent(proxy)

//use axios as you normally would, but specify httpsAgent in the config
axios = axios.create({ httpsAgent });

async function useP() {
    var res = await axios.get(ipUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1' }
    });
    console.log('结果');
    console.log(res.data); // gives my ip and not the proxy's one
    /**
     * {
            ip: '147.158.237.162',
            city: 'Johor Bahru',
            region: 'Johor',
            country: 'MY',
            loc: '1.4655,103.7578',
            org: 'AS4788 TM Net, Internet Service Provider',
            postal: '80500',
            timezone: 'Asia/Kuala_Lumpur',
            readme: 'https://ipinfo.io/missingauth'
        }
     */
}
useP()

