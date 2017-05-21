# ltp_front_end_display_js

ltp前端demo展示


# 使用

#### 1. 文件服务器

本项目需要使用可以进行转发代理的文件服务器。根据工作环境的不同，可以选用诸如 nginx, apache 等等写好的文件服务器作该功能使用。以下按照使用者任何环境都没有安装的情况，推荐使用node的http-server简单解决代理问题。

1. 安装 node.js

参考 http://nodejs.cn/ （推荐源码编译安装）

2. 安装 http-server

`npm install http-server -g`

3. 启动ltp

```

# 在ltp启动位置 ， ltp_data下放置模型文件
./bin/ltp_server --port 12345

```

4. 下载前端展示

```

git clone https://github.com/liu946/ltp_front_end_display_js.git
cd ltp_front_end_display_js

```

5. 启动http-server

`http-server . -P http://localhost:12345`

6. 访问服务

http://localhost:8080/index.html

注意，访问错误的URL会导致 http-server 崩溃，按照5重新启动即可


