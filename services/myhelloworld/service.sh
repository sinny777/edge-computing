#!/bin/sh

# Very simple Horizon sample edge service.

while true; do
  echo "$HZN_DEVICE_ID says: Hey there ${HW_WHO}!"
  sleep 3
done
