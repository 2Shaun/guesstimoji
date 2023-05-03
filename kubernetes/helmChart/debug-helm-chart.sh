#!/usr/bin/bash

. ../define-minikube-docker-dev-env-vars.sh

echo "unique image tag: $UNIQUE_IMAGE_TAG"

envsubst < values.yaml.tmpl > values.yaml

helm template my-release . --debug