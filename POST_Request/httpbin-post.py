# -*- encoding: utf-8 -*-
'''
@File    :   httpbin-post.py
@Time    :   2021/04/16 11:03:37
@Author  :   play4fun
@Desc    :   
发送post请求的接口
https://www.cnblogs.com/huainanhai/p/12014328.html


'''


def main():
    import requests
    url = "https://httpbin.org/post"
    payload = {"username": "666666@qq.com", "password": "666"}
    r = requests.post(url=url, data=payload)
    print(r.text)
    '''
    {
        "args": {}, 
        "data": "", 
        "files": {}, 
        "form": {
            "password": "666", 
            "username": "666666@qq.com"
        }, 
        "headers": {
            "Accept": "*/*", 
            "Accept-Encoding": "gzip, deflate", 
            "Content-Length": "37", 
            "Content-Type": "application/x-www-form-urlencoded", 
            "Host": "httpbin.org", 
            "User-Agent": "python-requests/2.24.0", 
            "X-Amzn-Trace-Id": "Root=1-6078fec1-0d9021694f91d7fa7dea54a1"
        }, 
        "json": null, 
        "origin": "116.24.36.66", 
        "url": "https://httpbin.org/post"
    }
    '''
    pass


if __name__ == "__main__":
    main()
