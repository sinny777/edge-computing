
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

sudo docker run -it --name inference \
--privileged \
-p 3001:3001 --env-file .env \
--mount type=bind,source="$(pwd)",target=/ \
sinny777/inference:0.0.1 /bin/bash

docker run -it --name inference \
-p 3001:3001 --env-file .env \
-v /opt/vc/bin:/opt/vc/bin --device /dev/vchiq \
--mount type=bind,source=/home/ubuntu,target=/home/ubuntu \
--privileged \
sinny777/inference:0.0.1


$ eval $(hzn util configconv -f horizon/hzn.json)
$ export ARCH=$(hzn architecture)
$ hzn exchange service publish -f horizon/service.definition.json


TFJS_NODE_CDN_STORAGE="https://storage.googleapis.com/" npm install @tensorflow/tfjs-node-gpu
https://s3.us.cloud-object-storage.appdomain.cloud/tfjs-cos/libtensorflow-cpu-linux-arm-1.7.4.tar.gz

node-pre-gyp install --build-from-source

https://www.tensorflow.org/lite/guide/build_arm


npm install -g @bazel/bazelisk

bazel build --config=opt --config=monolithic //tensorflow/tools/lib_package:libtensorflow

=> https://qengineering.eu/install-ubuntu-18.04-on-raspberry-pi-4.html