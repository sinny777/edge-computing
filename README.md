# Edge Computing

This repository is based on generic architecture for Edge Computing, which includes both working on the Edge Devices and also on the Edge Server.


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


## Docker Important Commands

- Remove Dangling images

```

docker rmi $(docker images --filter "dangling=true" -q --no-trunc)
```


## References

- [IBM Edge Application Manager](https://www.ibm.com/cloud/edge-application-manager)
- [Edge Computing Architecture](https://www.ibm.com/cloud/architecture/architectures/edge-computing)
- [Edge Computing Reference Architecture](https://www.ibm.com/cloud/architecture/architectures/edge-computing/reference-architecture)
- [Red Hat Edge Computing](https://www.redhat.com/en/topics/edge-computing/why-choose-red-hat-edge-computing)
- [IoT Architectures Code Patterns](https://www.ibm.com/cloud/architecture/architectures/iotArchitecture/code-patterns)

