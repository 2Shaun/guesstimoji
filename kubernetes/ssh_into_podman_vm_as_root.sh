#!/bin/bash

# matches `ssh://` OR any number of whitespace OR / OR :
# and sets as delimiter
USER_AT_HOSTNAME=$(podman system connection list \
	| awk -F'(ssh:\/\/)|[\r\n\t\f\v ]+|[\/\:]' '/root/ { print $3; }')

PORT=$(podman system connection list \
	| awk -F'(ssh:\/\/)|[\r\n\t\f\v ]+|[\/\:]' '/root/ { print $4; }')

PRIVATE_KEY_PATH=$(podman system connection list \
	| awk '/root/ { print $3; }')

ssh -p $PORT -i $PRIVATE_KEY_PATH $USER_AT_HOSTNAME

