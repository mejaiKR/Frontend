#!/bin/bash
cd /home/ec2-user/build

# 패키지 설치 및 빌드
npm install
npm run build

# Start the application using PM2
pm2 start "npm run start" --name mejai
pm2 save
