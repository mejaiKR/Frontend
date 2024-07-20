#!/bin/bash
cd /home/ec2-user/build

# 패키지 설치 및 빌드
npm install
npm run build

# 현재 실행중인 next.js 서버가 있다면  kill 하고 서버 새로 시작
PID=$(ps aux | grep 'next start -p 3000' | grep -v grep | awk '{print $2}')
if [ -n "$PID" ]; then
  kill -9 $PID
fi

nohup npm run start &
