# FROM arm32v7/python:3.7
FROM python:3.7.2
# FROM resin/rpi-raspbian:latest
# FROM arm32v7/python:3.7

LABEL author="Gurvinder Singh <sinny777@gmail.com>"
LABEL profile="http://www.gurvinder.info"

USER root

# Create a directory where our app will be placed
# RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Updates and adds system required packages
RUN apt-get -y update && apt-get -y upgrade \
        && apt-get install -y python3-pip \
        python3-numpy \
        libblas-dev \
        liblapack-dev \
        python3-dev \
        libatlas-base-dev \
        gfortran \
        python3-setuptools \
        python3-scipy \
        && apt-get -y update \
        && apt-get -y install python3-h5py \
        libsm6 \
        libxext6 \
        libxrender-dev 

RUN pip3 install --upgrade pip setuptools wheel

# RUN python -m pip install --no-cache-dir --ignore-installed -r requirements.txt

# RUN pip3 install NumPy==1.18.0 && \
#     python-dev-tools && \
#     pandas && \
#     -r requirements.txt

COPY setup.sh /usr/src/app

COPY requirements.txt ./
# RUN pip3 install --no-cache-dir --ignore-installed -r requirements.txt

RUN chmod 755 /usr/src/app/setup.sh
RUN /usr/src/app/setup.sh

# ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
# CMD []

COPY . .

CMD [ "python", "./main.py" ]