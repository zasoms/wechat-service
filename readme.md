### TODOLIST:

- [x] 断开后发送wxpusher
- [x] 把微信登录二维码发到wxpusher
- [x] 断开后重新bot.start
- [ ] 断开后重新连接
- [ ] 日志记录，收集报错后处理异常情况(logger)




<!-- Bot error: Error: Cannot find module 'gerror'  可以试试  cd node_modules/wechaty  && npm install -->

#### step1:
```
docker pull node:14.18.1
```

#### step2:
```
docker run -itd --name wechat-service -p 3002:3000 -v /docker/nodejs/wechat-service:/data/wechat-service node:14.18.1
```

#### step3:
```
npm config set registry https://registry.npm.taobao.org \
    && npm config set disturl https://npm.taobao.org/dist \
    && npm config set puppeteer_download_host https://npm.taobao.org/mirrors
```

#### step4:
```
apt-get update

apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
    libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
    libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
    ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
    
```

#### step5:
```
npm install
```

#### step6:
```
node app.js
```
