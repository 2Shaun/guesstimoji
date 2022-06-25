# this image is for the Azure GitOps jobs
FROM registry.gitlab.com/gitlab-org/terraform-images/stable:latest
RUN apk update
RUN apk upgrade
RUN apk add --no-cache python3 py3-pip
RUN apk add --no-cache gcc musl-dev python3-dev libffi-dev openssl-dev cargo make
RUN pip install azure-cli==2.0.79