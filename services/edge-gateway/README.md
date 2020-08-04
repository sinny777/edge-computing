# edge-gateway

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

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

docker build -t sinny777/edge-gateway -f ./services/edge-gateway/Dockerfile .
```


## Refrences

- [Rule Engine](https://github.com/cachecontrol/json-rules-engine)