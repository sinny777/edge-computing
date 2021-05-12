# Edge Computing

## NOTE: WORK IS IN PROGRESS

This repository is based on generic architecture for Edge Computing, which includes both working on the Edge Devices and also on the Edge Server.

## OPEN HORIZON 

### EDGE MANAMENT HUB

#### Installation

    - https://github.com/open-horizon/devops/blob/master/mgmt-hub/README.md

$ export HZN_LISTEN_IP=0.0.0.0


### EDGE AGENT

#### Installing Agent on Raspberry Pi

    - References: 
        - https://github.com/open-horizon/anax/tree/master/agent-install
        - https://github.com/open-horizon/anax/releases

$ sudo -s
$ nano agent-install.cfg

HZN_EXCHANGE_URL=http://192.168.1.14:3090/v1/
HZN_FSS_CSSURL=http://192.168.1.14:9443/
HZN_ORG_ID=myorg
CERTIFICATE=agent-install.crt
HZN_EXCHANGE_USER_AUTH=admin:HI3GCD0zTvEiWDYNmm4rNE6keNzA7t

    - Check OS / Distribution details

$ cat /etc/os-release
$ uname -a

$ which bash
$ file /bin/bash

    - fetch https://github.com/open-horizon/anax/releases installation files as per the distribution

$ wget https://github.com/open-horizon/anax/releases/download/v2.28.0-338/agent-install.sh 
$ wget https://github.com/open-horizon/anax/releases/download/v2.28.0-338/horizon-agent-linux-deb-arm64.tar.gz
$ tar -xvzf horizon-agent-linux-deb-arm64.tar.gz 

curl -sSL http://192.168.1.14:9443/api/v1/objects/IBM/agent_files/agent-install.crt -u "myorg/admin:HI3GCD0zTvEiWDYNmm4rNE6keNzA7t" --insecure -o "agent-install.crt"

$ export HZN_EXCHANGE_USER_AUTH=admin:HI3GCD0zTvEiWDYNmm4rNE6keNzA7t

$ export HZN_EXCHANGE_NODE_AUTH="Gurvinders-MacBook-Pro:#1WaheguruJi"

$ sudo -s ./agent-install.sh -i . -u $HZN_EXCHANGE_USER_AUTH -p IBM/pattern-ibm.helloworld -w ibm.helloworld -o IBM -z horizon-agent-linux-deb-arm64.tar.gz

- Below command worked :

$ sudo bash ./agent-install.sh -i . -u $HZN_EXCHANGE_USER_AUTH 

### SOME IMPORTANT HZN COMMANDS AND STEPS

    - Steps to follow on Agent after installation

$ source agent-install.cfg
    OR
$ eval export $(cat agent-install.cfg)

export DOCKER_HUB_ID="<dockerhubid>"
echo "P@ssw0rd" | docker login -u $DOCKER_HUB_ID --password-stdin

$ hzn key create "myorg" "sinny777@gmail.com"

    - Check below before proceeding
```

curl -s  http://192.168.1.14:8510/status/workers | jq
curl -s  http://localhost:8081/status/workers | jq

echo "HZN_ORG_ID=$HZN_ORG_ID, HZN_EXCHANGE_USER_AUTH=$HZN_EXCHANGE_USER_AUTH, DOCKER_HUB_ID=$DOCKER_HUB_ID"
which git jq
ls ~/.hzn/keys/service.private.key ~/.hzn/keys/service.public.pem
cat /etc/default/horizon

```

docker buildx create --name remote --use

docker buildx create --name remote --append ssh://ubuntu@192.168.1.6

docker buildx build \
  --push -t sinny777/myhelloworld:0.0.1 \
  --platform=linux/amd64,linux/arm64 .

docker buildx build \
  --push -t sinny777/myhelloworld_arm64:0.0.1 \
  --platform=linux/arm64 .

docker buildx build --platform linux/arm64 -t ${DOCKER_IMAGE_BASE}_$ARCH:$SERVICE_VERSION --push .

docker run --rm sinny777/myhelloworld:1.0.0

    - Publish service

hzn dev service new -s myservice -V 1.0.0 -i $DOCKER_HUB_ID/myservice --noImageGen

eval $(hzn util configconv -f hzn.json)
export ARCH=$(hzn architecture)
    
$hzn exchange service publish -f service.definition.json -P
$hzn exchange service list

$hzn exchange service addpolicy -f service.policy.json ${HZN_ORG_ID}/${SERVICE_NAME}_${SERVICE_VERSION}_${ARCH}
$hzn exchange service listpolicy ${HZN_ORG_ID}/${SERVICE_NAME}_${SERVICE_VERSION}_${ARCH}
$hzn exchange service removepolicy ${HZN_ORG_ID}/${SERVICE_NAME}_${SERVICE_VERSION}_${ARCH}

$hzn exchange deployment addpolicy -f deployment.policy.json ${HZN_ORG_ID}/policy-${SERVICE_NAME}_${SERVICE_VERSION}
$hzn exchange deployment listpolicy ${HZN_ORG_ID}/policy-${SERVICE_NAME}_${SERVICE_VERSION}
$hzn exchange deployment removepolicy ${HZN_ORG_ID}/policy-${SERVICE_NAME}_${SERVICE_VERSION}


    - Node Setup
    
export HZN_ORG_ID=myorg
export HZN_EXCHANGE_USER_AUTH=admin:HI3GCD0zTvEiWDYNmm4rNE6keNzA7t

$hzn register --policy node.policy.json

$hzn service log -f ${SERVICE_NAME}

$ hzn version
$ hzn agreement list
$ hzn node list -v
$ hzn exchange user list

hzn --help
hzn node --help
hzn exchange pattern --help


## Edge Gateway

### Installation

- Install Updates

```

sudo apt -y update
sudo apt -y upgrade
```

- Install Docker

```

sudo apt install docker.io
```

- Install Docker Compose

```

sudo apt install docker-compose
```

- If facing issues, try below commands:


```

sudo apt-get install libffi-dev libssl-dev
sudo apt install python3-dev
sudo apt-get install -y python3 python3-pip
```

Once you have Python and Pip installed, just run the following command:

```

sudo pip3 install docker-compose
```

### Change Hostname

```
hostnamectl
sudo hostnamectl set-hostname hbuddy-ubuntu18

#UPDATE ENTRY IN hosts FILE
sudo nano /etc/hosts

ls -l /etc/cloud/cloud.cfg
```

- Update cloud.cfg (if exists)
```

sudo nano /etc/cloud/cloud.cfg
```

 => Search for preserve_hostname and change the value from false to true:

### Enable Bluetooth

On the Pi 4, BT is disabled by default in profit of the serial terminal..


```
sudo nano /boot/firmware/nobtcfg.txt

# This configuration file sets the system up to support the serial console on
# GPIOs 14 & 15. This is the default for Ubuntu on the Pi, but disables the use
# of the Bluetooth module.
#
# If you wish to disable the serial console and use Bluetooth instead, install
# the "pi-bluetooth" package then edit "syscfg.txt" to include "btcfg.txt"
# instead of "nobtcfg.txt"
```

Your syscfg.txt should look like this:

```

# This file is intended to contain system-made configuration changes. User
# configuration changes should be placed in "usercfg.txt". Please refer to the
# README file for a description of the various configuration files on the boot
# partition.

dtparam=i2c_arm=on
dtparam=spi=on

# include nobtcfg.txt
include btcfg.txt
```


```

sudo apt-get install bluetooth bluez bluez-tools rfkill
```

Next, make sure your Bluetooth device is not blocked. You can verify that using the rfkill utility:

```

sudo rfkill list
```

If your Bluetooth Device is blocked for some reason, you can unblock it using the same rfkill command.

```

sudo rfkill unblock bluetooth
```

Finally, make sure the Bluetooth service is active by running the following command.

```

sudo service bluetooth start
```

- Scanning for Bluetooth Devices

Before you start scanning for devices, install the blueman package which helps you pair and manage Bluetooth devices.

```

sudo apt-get install blueman
```

### Running Edge-Gateway

```

sudo wget https://raw.githubusercontent.com/sinny777/edge-computing/master/scripts/run/installNrun.sh
sudo sh installNrun.sh
```

Above commands will create following folder and files structure:

> edge > build > (docker-compose.yml  init-mongo.sh)

## Docker Compose commands

 - You can use following command to run/stop the Gateway and MongoDb containers.  Make sure you run this inside the build folder, which has docker-compose.yml file).

```

docker-complose up -d
docker-compose down

```

## Docker Important Commands

- Check running/stopped containers

```

docker ps -a
```

- Remove Dangling images

```

docker rmi $(docker images --filter "dangling=true" -q --no-trunc)
```

## Calling API Endpoints

```

curl -I -k https://iot.smartthings.com/api/devices

```

## COME IMPORTANT COMMANDS

   $ arp -an


## References

- [IBM Open Horizon Tutorial](https://www.ibm.com/support/knowledgecenter/pl/SSFKVV_4.0/devices/developing/quickstart_example.html)
- [Open Horizon Documentation](https://github.com/open-horizon/anax/tree/master/docs)
- [IBM Edge Application Manager](https://www.ibm.com/cloud/edge-application-manager)
- [Edge Computing Architecture](https://www.ibm.com/cloud/architecture/architectures/edge-computing)
- [Edge Computing Reference Architecture](https://www.ibm.com/cloud/architecture/architectures/edge-computing/reference-architecture)
- [Red Hat Edge Computing](https://www.redhat.com/en/topics/edge-computing/why-choose-red-hat-edge-computing)
- [IoT Architectures Code Patterns](https://www.ibm.com/cloud/architecture/architectures/iotArchitecture/code-patterns)
- [Ubuntu + Tensorflow + RaspberryPi 4](https://qengineering.eu/install-ubuntu-18.04-on-raspberry-pi-4.html)

