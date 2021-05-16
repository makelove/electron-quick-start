/**
 * http://axios-js.com/zh-cn/docs/#%E6%A1%88%E4%BE%8B
 */
const axios = require("axios");
let url = 'http://httpbin.org/post'

axios.post(url, {
  firstName: 'Fred',
  lastName: 'Flintstone',
}, { headers: { 'User-Agent': 'YOUR-SERVICE-NAME' } })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });