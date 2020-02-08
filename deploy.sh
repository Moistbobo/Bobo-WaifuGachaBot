#!/usr/bin/env bash
user=${BOBO_WAIFUBOT_USER}
host=${BOBO_WAIFUBOT_HOST}
path=${BOBO_WAIFUBOT_PATH}
echo "HOST:" + $user}@${host}
echo "PATH:" + ${path}

ssh-keyscan ${host} >> ~/.ssh/known_hosts
scp -r package.json .env dist/** ${user}@${host}:${path}
ssh ${host} 'cd test; npm i; exit;'
