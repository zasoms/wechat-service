FROM node:14.18.1
LABEL maintainer="zasoms <623064100@qq.com>"
WORKDIR /home/app
COPY package.json ./
RUN npm config set registry https://registry.npm.taobao.org \
    && npm config set disturl https://npm.taobao.org/dist \
    && npm config set puppeteer_download_host https://npm.taobao.org/mirrors
RUN  npm install \
     && cd ./node_modules/wechat && npm install

FROM node:14.18.1
ENV APT_SOURCE_HOST="mirrors.aliyun.com"
## 清华镜像源（备选）
# ENV APT_SOURCE_HOST=mirrors.tuna.tsinghua.edu.cn
## 中科大源（备选）
# ENV APT_SOURCE_HOST=mirrors.ustc.edu.cn
RUN echo "0. 设置 apt 使用镜像源，然后 update" \
    && sed -i "s@\(deb\|security\).debian.org@${APT_SOURCE_HOST}@g" /etc/apt/sources.list \
    && cat /etc/apt/sources.list \
    && apt-get update --fix-missing \
    # 安装 https 协议需要的依赖
    && apt-get install -y --no-install-recommends \
       ca-certificates apt-transport-https \
    && sed -i "s@http://@https://@g" /etc/apt/sources.list \
    && echo "1. 安装需要的依赖" \
    && apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
    libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
    libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
    ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

RUN export WECHATY_PUPPET=wechaty-puppet-wechat

WORKDIR /home/app

COPY --from=0 /home/app .

COPY . .

# 向外提供3000端口
EXPOSE 3000

CMD [ "node", "app.js" ]