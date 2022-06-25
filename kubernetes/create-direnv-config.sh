#!/bin/sh

minikube docker-env > .envrc
direnv allow .