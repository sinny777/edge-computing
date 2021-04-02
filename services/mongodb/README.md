
docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=1SatnamW mongo

## Steps to publish service on horizon hub

docker buildx ls
docker buildx create --use --name=qemu
<!-- docker buildx create --name remote --append ssh://ubuntu@192.168.1.6 -->
docker buildx inspect --bootstrap

<!-- docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t ${DOCKER_IMAGE_BASE}_$ARCH:$SERVICE_VERSION --push . -->
<!-- docker buildx build --platform linux/amd64,linux/arm64 -t ${DOCKER_IMAGE_BASE}_$ARCH:$SERVICE_VERSION --push . -->


docker buildx build \
  --push -t sinny777/mongo:0.0.1 \
  --platform=linux/amd64,linux/arm64 .

docker buildx build \
  --push -t sinny777/mongo_arm64:0.0.1 \
  --platform=linux/arm64 .

docker run --rm -d --name mongo -p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=1SatnamW \
-e DB_USERNAME=sinny777 \
-e DB_PASSWORD=1SatnamW \
-e DB_NAME="smartthings" \
sinny777/mongo_arm64:0.0.1

$ eval $(hzn util configconv -f horizon/hzn.json)
$ export ARCH=$(hzn architecture)
$ hzn exchange service publish -f horizon/service.definition.json