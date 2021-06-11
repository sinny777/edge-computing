# Edge Services

- [Edge Gateway Service](https://github.com/edge-services/gateway)
- [Edge Mongodb](https://github.com/edge-services/mongodb)
- [Edge Flows](https://github.com/edge-services/flows)
- [Edge Security](https://github.com/edge-services/security)

## Preparing to create an Edge service

```
export DOCKER_HUB_ID="<dockerhubid>"
echo "<dockerhubpassword>" | docker login -u $DOCKER_HUB_ID --password-stdin

hzn key create "IBM" "gurvsin3@in.ibm.com"

```

### Install a few development tools

    - On Linux

sudo apt install -y git jq make

    - On Mac
    
brew install git jq make

## Export required environment variables

```
cd horizon/agent
source agent-install.cfg
    OR
eval export $(cat agent-install.cfg)

echo "HZN_ORG_ID=$HZN_ORG_ID, HZN_EXCHANGE_USER_AUTH=$HZN_EXCHANGE_USER_AUTH, DOCKER_HUB_ID=$DOCKER_HUB_ID"
which git jq
ls ~/.hzn/keys/service.private.key ~/.hzn/keys/service.public.pem
cat /etc/default/horizon

```

## Create base package structure for a new service

```

hzn dev service new -s myhelloworld -V 0.0.1 -i sinny777/myhelloworld --noImageGen

```


