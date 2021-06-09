
# edge-gateway service for Edge Computing

## Requirements

- All devices should be able to connect to the Gateway via BLE, LoRA, XBEE or OpenThread
- It should be able to connect to the Internet
- It should know what all devices it can handle
- It should save all data in raw format in local DB (DB on the Edge Device)
- It should have a Rule-engine service running
- Its API should be accessible via internet (might use NgRok)

## On Gateway Startup / Powered On

- Connect with Internet ( If Available)
- Start Gateway App + Backend DB
- Start NgRok Service 
- Fetch/Synchronize latest configurations for Gateway and Devices from the Cloud

## Gateway Docker

- Build docker image for Edge-Gateway

```

docker build -t sinny777/edge-gateway .

docker run --rm -it --name edge-gateway -p 9000:9000 \
    -e DB_CONNECTOR=mongodb \
    -e DB_HOST=localhost \
    -e DB_PORT=27017 \
    -e DB_USERNAME=admin \
    -e DB_PASSWORD=1SatnamW \
    -e DB_NAME=admin \
    -e SIMULATE=false \
    -v /dev/mem:/dev/mem \
    -v /sys/class/gpio:/sys/class/gpio \
    --privileged \
    sinny777/edge-gateway_arm64:1.0.0

sudo docker run --rm -it --name edge-gateway -p 9000:9000 \
    -e SIMULATE=false \
    -v /dev/mem:/dev/mem \
    -v /sys/class/gpio:/sys/class/gpio \
    --privileged \
    sinny777/edge-gateway_arm:1.0.0
    
```

## BLUETOOTH

```

hciconfig

sudo hciattach /dev/ttyAMA0 bcm43xx 921600 -

sudo hciconfig hci0 reset

sudo invoke-rc.d bluetooth restart

/etc/init.d/bluetooth restart


sudo hcitool -i hci0 lescan

```


## Refrences

- [Rule Engine](https://github.com/cachecontrol/json-rules-engine)