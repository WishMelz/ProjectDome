#!/bin/sh
cd /
mkdir app
cd /app
wget http://ossfp.oss-cn-beijing.aliyuncs.com/1620366384005.xz
tar -xvf 1620366384005.xz
mv node-v12.11.1-linux-x64 nodejs
ln -s /app/nodejs/bin/node /usr/local/bin/
ln -s /app/nodejs/bin/npm /usr/local/bin/
npm install pm2 -g
ln -s /app/nodejs/bin/pm2 /usr/local/bin/
