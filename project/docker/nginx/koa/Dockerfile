#制定node镜像版本
FROM node:10-apline
#移动当前目录下的文件到镜像的app目录下
ADD . /app/
#进入到app目录
WORKDIR /app
#安装依赖
RUN npm install
#镜像对外暴露的端口
EXPOSE 3000
#镜像里启动脚本
CMD ['node','app.js']
