
docker run --rm -it -e "NODE_RED_CREDENTIAL_SECRET=1SatnamW" -p 1880:1880 -v `pwd`:/data --name flows sinny777/flows

docker run -it -p 1880:1880 -v node_red_data:/data --name flows testing:node-red-build


