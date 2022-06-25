#!/bin/sh

kubectl delete --all deploy --namespace=default
kubectl delete --all svc --namespace=default