#!/bin/sh

# TODO: Install minikube if not installed
# brew install minikube
minikube addons enable ingress

# TODO: Install helm if not installed
# brew install helm
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install cert-manager jetstack/cert-manager \
    --namespace cert-manager \
    --create-namespace \
    --version v1.8.2 \
    --set installCRDs=true

# verify cert-manager installation
# TODO: Install cmctl if not installed
# OS=$(go env GOOS); ARCH=$(go env GOARCH); curl -sSL -o cmctl.tar.gz https://github.com/cert-manager/cert-manager/releases/download/v1.7.2/cmctl-$OS-$ARCH.tar.gz
# tar xzf cmctl.tar.gz
# sudo mv cmctl /usr/local/bin
cmctl check api

# TODO: verify if ACME challenge in let's encrypt stage works with below host file entry
# TODO: Add `127.0.0.1 guesstimoji.dev` hosts file if not found and dev cluster
# echo 127.0.0.1 guesstimoji.dev >> /etc/hosts

