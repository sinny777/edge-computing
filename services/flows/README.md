
sudo docker buildx build \
  --push -t sinny777/edge-flows_arm64:1.0.0 \
  --platform=linux/arm64 --file Dockerfile.debian .

sudo docker buildx --rm --no-cache \
    --build-arg ARCH=arm64v8 \
    --build-arg NODE_VERSION=12.22.1 \
    --build-arg NODE_RED_VERSION=${NODE_RED_VERSION} \
    --build-arg OS=buster-slim \
    --build-arg BUILD_DATE="$(date +"%Y-%m-%dT%H:%M:%SZ")" \
    --build-arg TAG_SUFFIX=default \
    --file Dockerfile.debian \
    --push \
    --platform=linux/arm64 \
    --tag sinny777/edge-flows_arm64:1.0.0 .


docker build -t sinny777/edge-flows:1.0.0 .

docker run --rm -it -p 1880:1880 --env-file .env --name flows sinny777/edge-flows_arm64:1.0.0

docker run --rm -it -p 1880:1880 --env-file .env -v `pwd`/data:/data -v `pwd`/certs:/certs  --name flows sinny777/edge-flows_amd64:1.0.0

docker run --rm -p 1880:1880 --env-file .env -v `pwd`/certs:/certs --name flows sinny777/edge-flows_amd64:1.0.0

docker run --rm -it -p 1880:1880 --env-file .env -v `pwd`:/data -v certs:/certs  --name flows sinny777/edge-flows_amd64:1.0.0


