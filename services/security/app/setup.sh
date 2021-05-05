#!/bin/sh

arch=`uname -m`
echo $arch

npm install

if [ ${arch} == 'aarch64' ]; then
    echo "ARM 64 Bit Architecture"
    echo '{' >> 'custom-binary.json' && \
    echo '"tf-lib": "https://gurvsin3-visualrecognition.s3.jp-tok.cloud-object-storage.appdomain.cloud/libtensorflow_arm64.tar.gz"'  >> 'custom-binary.json' && \
    echo '}' >> 'custom-binary.json'
    cp custom-binary.json node_modules/@tensorflow/tfjs-node/scripts/
    chmod 755 node_modules/@tensorflow/tfjs-node/scripts/custom-binary.json

elif [ ${arch} == 'armv7l' ]; then
    echo "ARM 32 Bit Architecture"
    # echo '{' >> 'custom-binary.json' && \
    # echo '"tf-lib": "https://gurvsin3-visualrecognition.s3.jp-tok.cloud-object-storage.appdomain.cloud/libtensorflow_arm32.tar.gz"'  >> 'custom-binary.json' && \
    # echo '}' >> 'custom-binary.json'
    # cp custom-binary.json node_modules/@tensorflow/tfjs-node/scripts/
    # chmod 755 node_modules/@tensorflow/tfjs-node/scripts/custom-binary.json
    npm uninstall --save @tensorflow/tfjs-node
    npm install --save @tensorflow/tfjs-node@2.6.0

    echo 'SUBSYSTEM=="vchiq",MODE="0666"' >> 99-camera.rules
    cp 99-camera.rules /etc/udev/rules.d/

elif [ ${arch} == 'x86_64' ]; then
    echo "DARWIN Architecture"
else
    echo "UNKONWN Architecture"
fi

npm rebuild @tensorflow/tfjs-node --build-from-source

npm run build

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
