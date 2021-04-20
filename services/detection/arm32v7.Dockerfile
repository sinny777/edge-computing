FROM balenalib/raspberrypi3:stretch
# The balena base image for building apps on Raspberry Pi 3. 
# Raspbian Stretch required for piwheels support. https://downloads.raspberrypi.org/raspbian/images/raspbian-2019-04-09/

LABEL author="Gurvinder Singh <sinny777@gmail.com>"
LABEL profile="http://www.gurvinder.info"

USER root

RUN echo "BUILD MODULE: Events Detection"

# Enforces cross-compilation through Quemu
RUN [ "cross-build-start" ]

WORKDIR /usr/src/app

# Update package index and install dependencies
RUN install_packages \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    libopenjp2-7-dev \
    zlib1g-dev \
    libatlas-base-dev \
    wget \
    libboost-python1.62.0 \
    curl \
    libcurl4-openssl-dev

# Required for OpenCV
RUN install_packages \
    # Hierarchical Data Format
    libhdf5-dev libhdf5-serial-dev \
    # for image files
    libjpeg-dev libtiff5-dev libjasper-dev libpng-dev \
    # for video files
    libavcodec-dev libavformat-dev libswscale-dev libv4l-dev \
    # for gui
    libqt4-test libqtgui4 libqtwebkit4 libgtk2.0-dev \
    # high def image processing
    libilmbase-dev libopenexr-dev

# Install Python packages
COPY requirements.txt ./
RUN pip3 install --upgrade pip
RUN pip3 install --upgrade setuptools
RUN pip3 install --index-url=https://www.piwheels.org/simple -r requirements.txt

COPY setup.sh /usr/src/app
RUN chmod 755 /usr/src/app/setup.sh
RUN /usr/src/app/setup.sh

# Cleanup
RUN rm -rf /var/lib/apt/lists/* \
    && apt-get -y autoremove

RUN [ "cross-build-end" ]  

ADD /app/ .

ENTRYPOINT [ "python3", "-u", "./main.py" ]