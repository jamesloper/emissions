#!/bin/bash

cd $APP
export BIND_IP=127.0.0.1
export HTTP_FORWARDED_COUNT=1
export METEOR_SETTINGS=$(cat settings.json | jq -M -c -r .)
source env.sh

echo "Unzipping"
tar -xf "$PROJECT.tar.gz"

echo "Installing npm packages"
cd bundle/programs/server
npm install --production

echo "Restarting app"
pm2 stop $APP -s
pm2 flush $APP -s
pm2 start ../../main.js --name $APP --update-env -s
pm2 logs $APP -s