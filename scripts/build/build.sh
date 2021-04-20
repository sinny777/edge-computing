#!/bin/sh

echo *INFO* finding and removing any previous instances
DOCKER_IMAGE=sinny777/edge-gateway

id=`docker ps -a|grep -i ${DOCKER_IMAGE}|awk '{print $1}'`
docker stop ${id}
docker rm ${id}
docker rmi ${DOCKER_IMAGE}:latest
echo *INFO* building a new container image
docker build -t ${DOCKER_IMAGE}:latest --file ../../services/edge-gateway/Dockerfile ../../services/edge-gateway --no-cache
# sudo docker push ${DOCKER_IMAGE}:latest