
# sudo docker buildx build -t sinny777/edge-hub:1.0.0 --platform=linux/amd64 .
# docker run -it --name edge-hub sinny777/edge-hub:1.0.0 /bin/bash

FROM ubuntu:18.04

LABEL author="Gurvinder Singh <sinny777@gmail.com>"
LABEL profile="http://www.gurvinder.info"

USER root

RUN apt update && \
    apt -qy install curl ca-certificates apt-transport-https nano python make \
    build-essential cmake gcc g++ unzip pkg-config wget sudo gnupg lsb-release  software-properties-common \
    -y --no-install-recommends --fix-missing apt-utils && rm -rf /var/lib/apt/lists/*

# WORKDIR /usr/src/app

RUN curl -sSL https://raw.githubusercontent.com/open-horizon/devops/master/mgmt-hub/deploy-mgmt-hub.sh | bash

# RUN chmod 755 /usr/src/app/startup.sh
# RUN sudo usermod -a -G video developer

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3090

EXPOSE ${PORT}

# ENTRYPOINT ["/app/startup.sh"]
CMD []






