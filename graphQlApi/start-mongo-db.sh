#!/bin/bash

. ../kubernetes/helmChart/get-network-interfaces.sh

sudo mongod --bind_ip $HOST_MINIKUBE_BRIDGE_IP --dbpath /home/tom/data/db