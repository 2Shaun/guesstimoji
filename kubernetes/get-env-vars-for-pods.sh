#!/bin/bash

pods=$(kubectl get pods | awk 'NR>1{ print $1 }')

for pod in $pods
do
  echo "### $pod ENV VARS ###"
  kubectl exec $pod -- printenv
  printf '\n' 
done