# Check out https://hub.docker.com/_/node to select a new base image
FROM node:12-slim

RUN mkdir -p /edge-gateway
WORKDIR /edge-gateway

# COPY --chown=node package*.json ./services/edge-gateway/*
ADD ./services/edge-gateway /edge-gateway

RUN npm ci

# Bundle app source code
# COPY --chown=node . .

RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
# ENV HOST=0.0.0.0 PORT=3000=
# EXPOSE ${PORT}
CMD [ "node", "." ]
