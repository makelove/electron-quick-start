
http://axios-js.com/zh-cn/docs/#%E6%A1%88%E4%BE%8B

npm install axios --save


或者直接引入
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

修改User-Agent
https://github.com/axios/axios/issues/2560

nodejs 使用axios模块发起http请求，并进行拦截各种请求数据
https://blog.csdn.net/haeasringnar/article/details/84486867

axios请求设置header信息方法
https://blog.csdn.net/w001yy/article/details/87895928

```
return axios.get(url, {
  params: data,
  headers: {'yl-authorization': this.token}//设置header信息
}).then((res) => {
  this.plList = res.data;
  if (this.plList.length < this.size) {
     this.jiazai = '没有更多数据啦~~~'
  }else {
     this.jiazai = '点击加载更多'
  }
```

- 使用代理
  - https://stackoverflow.com/questions/55981040/how-to-use-axios-with-a-proxy-server-to-make-an-https-call
```
    const HttpsProxyAgent = require("https-proxy-agent"),
      axios = require("axios");

const httpsAgent = new HttpsProxyAgent({host: "proxyhost", port: "proxyport", auth: "username:password"})

//use axios as you normally would, but specify httpsAgent in the config
axios = axios.create({httpsAgent});
```