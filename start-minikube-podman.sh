#!/bin/sh

# docker desktop will not automatically map NodePorts
# to minikube container
# this can be checked with `docker port minikube` (make sure docker daemon is not attached to minikube registry)
# note this only allows for 3 NodePorts
# need to run `minikube tunnel` after ingress is created
# minikube start --driver=docker --extra-config=apiserver.service-node-port-range=32760-32762 --ports=32760:32760,32761:32761,32762:32762,80:80
minikube start --driver=podman --container-runtime=crio --network-plugin=cni --rootful
