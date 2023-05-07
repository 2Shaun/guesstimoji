#!/bin/bash

# Get the output of docker inspect for Minikube
output=$(docker inspect minikube --format '{{json .NetworkSettings.Ports}}')

os_type=$(uname)

case $os_type in
  Linux)
    DOCKER_PLATFORM="linux/$(uname -m)"
    ;;
  Darwin)
    DOCKER_PLATFORM="darwin/$(uname -m)"
    ;;
  *)
    echo "Unsupported operating system: $os_type"
    exit 1
    ;;
esac

export UNIQUE_IMAGE_TAG=$(git rev-parse --short HEAD)

export HOST_MINIKUBE_BRIDGE_IP=$(docker network inspect minikube | jq -r '.[] | .IPAM.Config[0].Gateway')
export KUBE_SERVICE_MONGO_DB_API_PORT=27017
export MONGODB_HOST_NAME="$HOST_MINIKUBE_BRIDGE_IP:$KUBE_SERVICE_MONGO_DB_API_PORT"
export HOST_MINIKUBE_BRIDGE_NAME=$(ip addr show | grep -w $HOST_MINIKUBE_BRIDGE_IP | awk '{print $NF}')

# sudo needed
# export KUBE_MINIKUBE_BRIDGE_MAC=$(sudo arping -c 1 -I $HOST_MINIKUBE_BRIDGE_NAME $(minikube ip) | awk '/bytes/ {print $4}')
export KUBE_MINIKUBE_BRIDGE_NAME=$(docker container exec minikube ip link | grep -B1 "link/ether $KUBE_MINIKUBE_BRIDGE_MAC" | head -n 1 | awk '{print $2}' | sed 's/://')

# Define environment variables
export KUBE_SERVICE_SSH_PORT=22

export KUBE_SERVICE_DOCKER_DAEMON_PORT=2376

export KUBE_SERVICE_DOCKER_REGISTRY_PORT=5000
export KUBE_SERVICE_DOCKER_REGISTRY_HOSTPORT="localhost:$KUBE_SERVICE_DOCKER_REGISTRY_PORT"

export KUBE_SERVICE_KUBERNETES_API_PORT=8443

export KUBE_SERVICE_NODEPORT_RANGE_PORT=32443

export KUBE_SERVICE_GLOBAL_TYPE=NodePort
export KUBE_SERVICE_GAME_API_PORT=5001
export KUBE_SERVICE_REACT_APP_PORT=80
export KUBE_SERVICE_GRAPH_QL_API_PORT=3005

# Extract the host port mappings for the services
ssh_host_port=$(echo "$output" | jq ".[\"$KUBE_SERVICE_SSH_PORT/tcp\"][0].HostPort" --raw-output)
docker_daemon_host_port=$(echo "$output" | jq ".[\"$KUBE_SERVICE_DOCKER_DAEMON_PORT/tcp\"][0].HostPort" --raw-output)
docker_registry_host_port=$(echo "$output" | jq ".[\"$KUBE_SERVICE_DOCKER_REGISTRY_PORT/tcp\"][0].HostPort" --raw-output)
kubernetes_api_host_port=$(echo "$output" | jq ".[\"$KUBE_SERVICE_KUBERNETES_API_PORT/tcp\"][0].HostPort" --raw-output)
nodeport_range_host_port=$(echo "$output" | jq ".[\"$KUBE_SERVICE_NODEPORT_RANGE_PORT/tcp\"][0].HostPort" --raw-output)

# Optional: Define environment variables for the HOST network namespace
export HOST_SERVICE_MINIKUBE_IP=$(minikube ip)

export HOST_SERVICE_SSH_PORT=$ssh_host_port

export HOST_SERVICE_DOCKER_DAEMON_PORT=$docker_daemon_host_port

export HOST_SERVICE_DOCKER_REGISTRY_PORT=$docker_registry_host_port
export HOST_SERVICE_DOCKER_REGISTRY_HOSTPORT="localhost:$docker_registry_host_port"

export HOST_SERVICE_KUBERNETES_API_PORT=$kubernetes_api_host_port

export HOST_SERVICE_NODEPORT_RANGE_PORT=$nodeport_range_host_port

export EXTERNAL_SERVICE_INGRESS_DOMAIN_NAME=$(kubectl get ingress | awk 'NR==1 { for (i=1; i<=NF; i++) { if ($i == "HOSTS") col=i } } NR==2{ print $col }')