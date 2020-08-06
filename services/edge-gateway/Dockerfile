FROM arm64v8/node:12.18.3-buster-slim

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


RUN mkdir -p /edge-gateway
WORKDIR /edge-gateway

# ADD ./services/edge-gateway /edge-gateway
ADD ./ /edge-gateway
RUN ls /edge-gateway

# RUN npm install -g node-gyp
# RUN npm install -g node-pre-gyp
RUN npm ci
# RUN npm install serialport --unsafe-perm --build-from-source
# RUN npm install && bower --allow-root install --fix-missing

# Bundle app source code
# COPY --chown=node . .

RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=9000

RUN JOBS=MAX npm i --unsafe-perm --production
EXPOSE ${PORT}

CMD [ "node", "." ]
