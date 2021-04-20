
docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=1SatnamW mongo

## Steps to publish service on horizon hub

docker buildx ls
docker buildx create --use --name=qemu
<!-- docker buildx create --name remote --append ssh://ubuntu@192.168.1.6 -->
docker buildx inspect --bootstrap

<!-- docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t ${DOCKER_IMAGE_BASE}_$ARCH:$SERVICE_VERSION --push . -->
<!-- docker buildx build --platform linux/amd64,linux/arm64 -t ${DOCKER_IMAGE_BASE}_$ARCH:$SERVICE_VERSION --push . -->


docker buildx build \
  --push -t sinny777/detection:0.0.2 \
  --platform linux/amd64,linux/arm64,linux/arm/v6 .

docker buildx build \
  --push -t sinny777/detection:0.0.2 \
  --platform=linux/arm/v6 .

docker run --rm -it --privileged --name detection sinny777/detection:0.0.2

$ eval $(hzn util configconv -f horizon/hzn.json)
$ export ARCH=$(hzn architecture)
$ hzn exchange service publish -f horizon/service.definition.json



sudo apt-get update && sudo apt-get install -y python3-dev libjpeg-dev libatlas-base-dev raspi-gpio libhdf5-dev python3-smbus

## RFERENCES

 - [Ubuntu20.04](https://zengliyang.wordpress.com/2021/01/04/raspberry-pi-4b-ubuntu-20-04-camera/)


