#!/bin/bash

# macOS Monterey v12.4
podman machine init --cpus 4 --memory 4096  --disk-size 50 --image-path next --rootful
podman machine start
