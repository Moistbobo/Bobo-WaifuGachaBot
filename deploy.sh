#!/usr/bin/env bash
host=${BOBO_WAIFUBOT_HOST}
path=${BOBO_WAIFUBOT_PATH}
echo "HOST:" + ${host}
echo "PATH:" + ${path}

scp -r package.json .env dist/** ${host}:${path}
ssh ${host} 'cd test; npm i; exit;'
