#!/usr/bin/bash

kubectl get deployments -o wide | awk '{ print $7 }'