# Datasources

This directory contains config for datasources used by this app.

docker run -d --network some-network --name some-mongo \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=1SatnamW \
    mongo


docker run -d --name gateway-mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=1SatnamW mongo


docker build -t sinny777/edge-gateway -f ./services/edge-gateway/Dockerfile .