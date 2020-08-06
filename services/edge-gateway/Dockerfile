FROM arm64v8/node:12.18.3-buster-slim

LABEL author="Gurvinder Singh <sinny777@gmail.com>"
LABEL profile="http://www.gurvinder.info"

USER root

# Updates and adds system required packages
# RUN apt-get update && \
#     apt-get -qy install curl ca-certificates nano python make \
#     build-essential \
#     cmake \
#     gcc \
#     -y --no-install-recommends --fix-missing apt-utils netcat && rm -rf /var/lib/apt/lists/*


RUN mkdir -p /edge-gateway
WORKDIR /edge-gateway

ADD ./ /edge-gateway

# RUN npm config set registry http://registry.npmjs.org
RUN npm install -g node-gyp
RUN npm install -g node-pre-gyp
# RUN npm i -g @loopback/build@6.1.1

# RUN JOBS=MAX npm i --unsafe-perm --production
# RUN npm i edge-sx127x --save --unsafe-perm --production
RUN JOBS=MAX npm i 
RUN npm i edge-sx127x
RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=9000

EXPOSE ${PORT}

CMD [ "node", "." ]
