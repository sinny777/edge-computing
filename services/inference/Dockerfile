# FROM alpine:latest
FROM node:12-buster-slim

LABEL author="Gurvinder Singh <sinny777@gmail.com>"
LABEL profile="http://www.gurvinder.info"

USER root

# Updates and adds system required packages
RUN apt-get update && \
    apt-get -qy install curl ca-certificates nano python make \
    build-essential \
    cmake \
    gcc \
    -y --no-install-recommends --fix-missing apt-utils netcat && rm -rf /var/lib/apt/lists/*


RUN mkdir -p /app
WORKDIR /app

ADD ./app /app

# RUN npm config set registry http://registry.npmjs.org
RUN npm install -g node-gyp
RUN npm install -g node-pre-gyp

RUN npm install @tensorflow/tfjs-node@2.6.0 && \
    cd node_modules/@tensorflow/tfjs-node && \
    echo '{' >> 'custom-binary.json' && \
    echo '"tf-lib": "https://s3.us.cloud-object-storage.appdomain.cloud/tfjs-cos/libtensorflow-cpu-linux-arm-1.15.0.tar.gz"'  >> 'custom-binary.json' && \
    echo '}' >> 'custom-binary.json' && \
    # node-gyp configure --verbose && \
    npm rebuild @tensorflow/tfjs-node --build-from-source && \
    npm install

# RUN JOBS=MAX npm i --unsafe-perm --production
# RUN npm i edge-sx127x --save --unsafe-perm --production
# RUN JOBS=MAX npm ci 
# RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3001

EXPOSE ${PORT}

CMD [ "node", "." ]

