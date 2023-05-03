#!/usr/bin/bash

. ../define-minikube-docker-dev-env-vars.sh

envsubst < values.yaml.tmpl > values.yaml

helm package .
helm list -q | xargs -I {} helm uninstall {}
helm install guesstimoji-0.1.0.tgz --generate-name