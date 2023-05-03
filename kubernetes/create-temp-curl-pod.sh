#!/bin/bash

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 cluster_ip port"
    exit 1
fi

CLUSTER_IP=$1
PORT=$2

kubectl run --rm -i --restart=Never curl-test \
  --image=curlimages/curl:7.78.0 \
  --command -- sh -c "curl http://${CLUSTER_IP}:${PORT}"