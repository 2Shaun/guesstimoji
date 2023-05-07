#!/usr/bin/bash

. ./define-minikube-docker-dev-env-vars.sh

image_repos=$(curl -X GET http://$HOST_SERVICE_DOCKER_REGISTRY_HOSTPORT/v2/_catalog -s | jq -r '.repositories[]')

for image_repo in $image_repos
do
  curl -X GET http://$HOST_SERVICE_DOCKER_REGISTRY_HOSTPORT/v2/$image_repo/tags/list
done