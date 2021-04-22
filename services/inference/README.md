
docker run -d --name mongodb -p 3001:3001 inference

## Steps to publish service on horizon hub

docker buildx ls
docker buildx create --use --name=qemu
<!-- docker buildx create --name remote --append ssh://ubuntu@192.168.1.6 -->
docker buildx inspect --bootstrap

<!-- docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t ${DOCKER_IMAGE_BASE}_$ARCH:$SERVICE_VERSION --push . -->
<!-- docker buildx build --platform linux/amd64,linux/arm64 -t ${DOCKER_IMAGE_BASE}_$ARCH:$SERVICE_VERSION --push . -->


sudo docker buildx build \
  --push -t sinny777/inference:0.0.1 \
  --platform=linux/amd64,linux/arm64 .

docker run --rm -d --name inference -p 3001:3001 \
-e DATA_DIR=/temp \
-e LABELS=Default,Fire \
-e EMAIL_USER=sinny777 \
-e EMAIL_PASSWORD=1SatnamW \
sinny777/inference_arm64:0.0.1

sudo docker run --rm -it --name inference \
-p 3001:3001 --env-file .env \
--mount source=/home/ubuntu/edge/services/inference,destination=/usr/share
sinny777/inference:0.0.1

$ eval $(hzn util configconv -f horizon/hzn.json)
$ export ARCH=$(hzn architecture)
$ hzn exchange service publish -f horizon/service.definition.json


TFJS_NODE_CDN_STORAGE="https://storage.googleapis.com/" npm install @tensorflow/tfjs-node-gpu
https://s3.us.cloud-object-storage.appdomain.cloud/tfjs-cos/libtensorflow-cpu-linux-arm-1.7.4.tar.gz

node-pre-gyp install --build-from-source
