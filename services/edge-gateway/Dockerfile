# Check out https://hub.docker.com/_/node to select a new base image
FROM node:12-slim

USER root

# Updates and adds system required packages
RUN apt-get update && \
    apt-get -qy install curl ca-certificates nano python make \
    build-essential \
    cmake \
    gcc \
    -y --no-install-recommends --fix-missing apt-utils netcat && rm -rf /var/lib/apt/lists/*


RUN mkdir -p /edge-gateway
WORKDIR /edge-gateway

# COPY --chown=node package*.json ./services/edge-gateway/*
ADD ./services/edge-gateway /edge-gateway

RUN npm install -g node-gyp
RUN npm install -g node-pre-gyp
RUN npm install serialport --unsafe-perm --build-from-source
# RUN npm install && bower --allow-root install --fix-missing
RUN npm ci

# Bundle app source code
# COPY --chown=node . .

RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=9000

RUN JOBS=MAX npm i --unsafe-perm --production
EXPOSE ${PORT}

CMD [ "node", "." ]
