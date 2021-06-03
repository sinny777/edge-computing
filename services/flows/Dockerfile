FROM nodered/node-red

# Copy package.json to the WORKDIR so npm builds all
# of your added nodes modules for Node-RED
COPY package.json .
COPY flows.json .
COPY settings.js .
ADD config /data
ADD certs ./certs

RUN npm install --unsafe-perm --no-update-notifier --no-fund --only=production && \
    npm uninstall node-red-node-gpio && \
    cd ./data && \
    npm install && \
    cd ..

# Copy _your_ Node-RED project files into place
# NOTE: This will only work if you DO NOT later mount /data as an external volume.
#       If you need to use an external volume for persistence then
#       copy your settings and flows files to that volume instead.
# COPY settings.js /data/settings.js
# COPY flows_cred.json /data/flows_cred.json
# COPY flows.json /data/flows.json

RUN export OPENSSL_ROOT_DIR=/usr/local/opt/openssl
RUN export LDFLAGS="-L$OPENSSL_ROOT_DIR/lib -L/usr/local/opt/gsas/lib"
RUN export CPPFLAGS="-I$OPENSSL_ROOT_DIR/include"
RUN export OPENSSL_INCLUDE_DIR=$OPENSSL_ROOT_DIR/include

ENTRYPOINT ["npm", "start", "--cache", "/data/.npm", "--", "--userDir", "/data"]