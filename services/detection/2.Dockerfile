# FROM arm32v7/python:3.7
# FROM python:3.7.2
# FROM resin/rpi-raspbian:latest
# FROM arm32v7/python:3.7
# FROM arm32v6/alpine:latest
FROM arm32v6/python:3.7-alpine3.12
# FROM arm32v6/node:12.18.3-buster-slim

# FROM alpine
# FROM python:3.7

LABEL author="Gurvinder Singh <sinny777@gmail.com>"
LABEL profile="http://www.gurvinder.info"

USER root

# Create a directory where our app will be placed
# RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN apk --update add gcc build-base freetype-dev libpng-dev openblas-dev 
    # apt-transport-https ca-certificates

# RUN apt-get update && \
#     apt-get -qy install curl ca-certificates nano python make \
#     apt-transport-https ca-certificates \
#     build-essential \
#     cmake \
#     gcc \
#     -y --no-install-recommends --fix-missing apt-utils netcat && rm -rf /var/lib/apt/lists/*


# Updates and adds system required packages
# RUN apt -y update && apt -y upgrade \
#         && apt install -y \
#         # python3-pip python3-dev \
#         apt-transport-https ca-certificates  
#         # python3-picamera
#         # python3-dev libjpeg-dev libatlas-base-dev \
#         # raspi-gpio libhdf5-dev python3-smbus \
#         # libatlas3-base 
#         # libgfortran5 


COPY requirements.txt ./
# RUN python3 -m pip install --upgrade pip setuptools wheel
# RUN python3 -m pip install --extra-index-url=https://www.piwheels.org/simple --no-cache-dir --ignore-installed -r requirements.txt
RUN pip install --no-cache-dir --ignore-installed --extra-index-url=https://www.piwheels.org/simple -r requirements.txt

# RUN python -m pip install --no-cache-dir --ignore-installed -r requirements.txt

# RUN pip3 install NumPy==1.18.0 && \
#     python-dev-tools && \
#     pandas && \
#     -r requirements.txt

COPY setup.sh /usr/src/app

RUN chmod 755 /usr/src/app/setup.sh
RUN /usr/src/app/setup.sh

RUN echo "deb https://packages.cloud.google.com/apt coral-edgetpu-stable main" | sudo tee /etc/apt/sources.list.d/coral-edgetpu.list
RUN curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
RUN sudo apk --update
RUN sudo apk add python3-tflite-runtime

# ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
# CMD []

COPY . .

CMD [ "python", "main.py" ]