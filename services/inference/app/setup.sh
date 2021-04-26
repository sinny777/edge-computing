#!/bin/sh

arch=`uname -m`
echo $arch

npm install

if [ ${arch} == 'aarch64' ]; then
  # ARM 64-bit stuff here
    echo "ARM Architecture"
    echo '{' >> 'custom-binary.json' && \
    echo '"tf-lib": "https://gurvsin3-visualrecognition.s3.jp-tok.cloud-object-storage.appdomain.cloud/libtensorflow_arm64.tar.gz"'  >> 'custom-binary.json' && \
    echo '}' >> 'custom-binary.json'
    cp custom-binary.json node_modules/@tensorflow/tfjs-node/scripts/
    chmod 755 node_modules/@tensorflow/tfjs-node/scripts/custom-binary.json

elif [ ${arch} == 'x86_64' ]; then
    echo "DARWIN Architecture"
else
  # 32-bit stuff here
  echo "UNKONWN Architecture"
fi

npm rebuild @tensorflow/tfjs-node --build-from-source

# FILE=assets/model/saved_model.pb
# if test -f "$FILE"; then
#     echo "$FILE exists."
# else
#     wget https://gurvsin3-visualrecognition.s3.jp-tok.cloud-object-storage.appdomain.cloud/model_dir.tar.gz \
#     -O assets/model.tar.gz
#     cd assets
#     tar -xf model.tar.gz
#     echo "AI MODEL DOWNLOADED..." 
# fi
