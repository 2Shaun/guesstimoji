#!/bin/sh
kubectl apply -f game-api-service.yaml,graph-ql-api-service.yaml,react-app-service.yaml,game-api-deployment.yaml,graph-ql-api-deployment.yaml,react-app-deployment.yaml