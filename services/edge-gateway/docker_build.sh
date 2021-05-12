#!/bin/bash
export APP_VERSION=$(grep -oE "\"version\": \"(\w*.\w*.\w*.\w*.\w*.)" app/package.json | cut -d\" -f4)
export ARCH=arm64

echo "#########################################################################"
echo "Build EdgeGateway Service version: ${APP_VERSION} for ${ARCH}"
echo "#########################################################################"

# sudo docker buildx build \
#   --push -t sinny777/security_arm64:0.0.1 \
#   --platform=linux/arm64 .

sudo docker buildx build --rm  \
    --build-arg BUILD_DATE="$(date +"%Y-%m-%dT%H:%M:%SZ")" \
    --build-arg NODE_VERSION=12.22.1 \
    --build-arg TAG_SUFFIX=${APP_VERSION} \
    --file Dockerfile \
    --tag sinny777/edge-gateway_${ARCH}:${APP_VERSION} \
    --platform=linux/${ARCH} --push .

# sudo docker build --rm  \
#     --build-arg BUILD_DATE="$(date +"%Y-%m-%dT%H:%M:%SZ")" \
#     --build-arg NODE_VERSION=12.22.1 \
#     --build-arg TAG_SUFFIX=${APP_VERSION} \
#     --file Dockerfile.custom \
#     --tag sinny777/edge-gateway_${ARCH}:${APP_VERSION} .