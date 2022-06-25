#!/bin/sh

# run this after environment variables are set since
# docker daemon will be attached to minikube image reg 

pushd ~/guesstimoji
pushd reactApp
npm run build:minikube:local
docker build -t guesstimoji-react-app --build-arg env=local --platform=linux/arm64 .
popd
pushd graphQlApi
docker build -t guesstimoji-graph-ql-api --build-arg env=local --platform=linux/arm64 .
popd
pushd gameApi
docker build -t guesstimoji-game-api --build-arg env=local --platform=linux/arm64 .
popd
popd