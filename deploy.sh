#!/usr/bin/env bash

cd  /root/service-status

git pull

npm install

npm run build

rm -rf /var/www/states/http/*
cp -r build/* /var/www/states/http

exit 0