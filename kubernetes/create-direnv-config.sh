#!/bin/bash

minikube docker-env > .envrc
direnv allow .