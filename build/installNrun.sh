#! /bin/sh

mkdir -p edge/build

cd edge/build

sudo wget https://raw.githubusercontent.com/sinny777/edge-computing/master/build/docker-compose.yml
sudo wget https://raw.githubusercontent.com/sinny777/edge-computing/master/build/init-mongo.sh

docker-compose pull
docker-compose up -d

sleep 5 &
