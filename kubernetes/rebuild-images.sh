#!/usr/bin/bash -xv

# run this after environment variables are set since
# docker daemon will be attached to minikube image reg 

. ./define-minikube-docker-dev-env-vars.sh

pushd ..
pushd reactApp
npm run build:minikube:local
export image_name='guesstimoji-react-app'
docker build -t $image_name --build-arg env=local --platform $DOCKER_PLATFORM .
docker tag $image_name "$HOST_SERVICE_DOCKER_REGISTRY_HOSTPORT/$image_name:$UNIQUE_IMAGE_TAG"
docker push "$HOST_SERVICE_DOCKER_REGISTRY_HOSTPORT/$image_name:$UNIQUE_IMAGE_TAG"
popd
pushd graphQlApi
export image_name='guesstimoji-graph-ql-api'
docker build -t $image_name --build-arg env=local --platform $DOCKER_PLATFORM .
docker tag $image_name "$HOST_SERVICE_DOCKER_REGISTRY_HOSTPORT/$image_name:$UNIQUE_IMAGE_TAG"
docker push "$HOST_SERVICE_DOCKER_REGISTRY_HOSTPORT/$image_name:$UNIQUE_IMAGE_TAG"
popd
pushd gameApi
export image_name='guesstimoji-game-api'
docker build -t $image_name --build-arg env=local --platform $DOCKER_PLATFORM .
docker tag $image_name "$HOST_SERVICE_DOCKER_REGISTRY_HOSTPORT/$image_name:$UNIQUE_IMAGE_TAG"
docker push "$HOST_SERVICE_DOCKER_REGISTRY_HOSTPORT/$image_name:$UNIQUE_IMAGE_TAG"
popd
popd