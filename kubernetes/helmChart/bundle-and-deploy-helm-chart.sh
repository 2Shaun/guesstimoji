#!/usr/bin/bash

. ../define-minikube-docker-dev-env-vars.sh

envsubst < values.yaml.tmpl > values.yaml

helm package .
helm list -q | xargs -I {} helm uninstall {}
helm install guesstimoji-0.1.0.tgz --generate-name

# Check if the entry already exists
entry_exists=$(grep -q "$EXTERNAL_SERVICE_INGRESS_DOMAIN_NAME" /etc/hosts; echo $?)

if [ $entry_exists -eq 0 ]; then
    current_ip=$(grep "$EXTERNAL_SERVICE_INGRESS_DOMAIN_NAME" /etc/hosts | awk '{print $1}')
    
    if [ "$current_ip" != "$HOST_SERVICE_MINIKUBE_IP" ]; then
        echo "Updating IP for $EXTERNAL_SERVICE_INGRESS_DOMAIN_NAME in /etc/hosts"
        sudo sed -i.bak "/$EXTERNAL_SERVICE_INGRESS_DOMAIN_NAME/s/^$current_ip/$HOST_SERVICE_MINIKUBE_IP/" /etc/hosts
    else
        echo "Entry for $EXTERNAL_SERVICE_INGRESS_DOMAIN_NAME is up-to-date in /etc/hosts"
    fi
else
    # Add the entry to /etc/hosts
    echo "Adding entry for $EXTERNAL_SERVICE_INGRESS_DOMAIN_NAME to /etc/hosts"
    echo "$HOST_SERVICE_MINIKUBE_IP $EXTERNAL_SERVICE_INGRESS_DOMAIN_NAME" | sudo tee -a /etc/hosts
fi