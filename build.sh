#!/bin/sh

echo 'git pull...'
git pull

echo 'npm install...'
cd ./src
npm install

echo 'pm2 restart...'
cd ../
pm2 restart ./pm2.json

echo "√√√√ done"

exit 0;
