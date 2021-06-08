
docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=1SatnamW mongo

## Steps to publish service on horizon hub

docker buildx ls
docker buildx create --use --name=qemu
<!-- docker buildx create --name remote --append ssh://ubuntu@192.168.1.6 -->
docker buildx inspect --bootstrap

<!-- docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t ${DOCKER_IMAGE_BASE}_$ARCH:$SERVICE_VERSION --push . -->
<!-- docker buildx build --platform linux/amd64,linux/arm64 -t ${DOCKER_IMAGE_BASE}_$ARCH:$SERVICE_VERSION --push . -->


docker buildx build \
  --push -t sinny777/mongo:1.0.0 \
  --platform=linux/amd64,linux/arm64 .

docker buildx build \
  --push -t sinny777/mongo_arm64:0.0.1 \
  --platform=linux/arm64 .

docker buildx build --rm --no-cache \
    --build-arg BUILD_DATE="$(date +"%Y-%m-%dT%H:%M:%SZ")" \
    --build-arg TAG_SUFFIX=default \
    --file Dockerfile \
    --platform=linux/amd64,linux/arm64 \
    --push -t sinny777/mongo:1.0.0 .

docker run --rm -it -d --name mongo \
-p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=P@ssw0rd \
-e DB_USERNAME=sinny777 \
-e DB_PASSWORD=1SatnamW \
-e DB_NAME=smartthings \
-e MONGO_DATA_DIR=/data/db \
-v /Users/gurvindersingh/Documents/Development/data/edge_data/mongodb:/data/db \
sinny777/mongo:1.0.0

$ eval $(hzn util configconv -f horizon/hzn.json)
$ export ARCH=$(hzn architecture)
$ hzn exchange service publish -f horizon/service.definition.json