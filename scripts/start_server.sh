#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

cd /home/ec2-user/build

# 패키지 설치 및 빌드
npm install
npm run build

# Start the application using PM2
pm2 start "npm run start" --name mejai
pm2 save
