#! /bin/sh

mkdir -p edge/build

cd edge/build

sudo rm -rf docker-compose.yml
sudo rm -rf init-mongo.sh

sudo wget https://raw.githubusercontent.com/sinny777/edge-computing/master/scripts/run/docker-compose.yml
sudo wget https://raw.githubusercontent.com/sinny777/edge-computing/master/scripts/run/init-mongo.sh

docker-compose pull
docker-compose up -d

sleep 5 &
