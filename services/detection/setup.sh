#!/bin/bash

# if [ $# -eq 0 ]; then
#   DATA_DIR="/tmp"
# else
#   DATA_DIR="$1"
# fi

echo "deb https://packages.cloud.google.com/apt coral-edgetpu-stable main" | sudo tee /etc/apt/sources.list.d/coral-edgetpu.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
sudo apt-get update
sudo apt-get install python3-tflite-runtime

# Install required packages
# python3 -m pip install --extra-index-url=https://www.piwheels.org/simple --no-cache-dir --ignore-installed -r requirements.txt
# pip3 install --index-url=https://www.piwheels.org/simple --no-cache-dir --ignore-installed -r requirements.txt

# pip3 install --extra-index-url=https://www.piwheels.org/simple --no-cache-dir --ignore-installed -r requirements.txt

# pip3 install Pillow --upgrade

# print('\n\nIN SETUP Script >>>>>>>>>>>>> \n\n')
