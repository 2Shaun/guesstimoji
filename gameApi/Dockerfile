FROM node:16.5.0-alpine
# sets the working director for RUN, CMD, ENTRYPOINT, COPY, and ADD
# this will be a directory ON THE CONTAINER
COPY . . 
# takes from <src> and adds them to the filesystem of the 
# container at the path <dest>
# RUN excutes commands in a new layer on top of the current image
# and commits the results
# this committed image will be used for the next step
RUN npm i
# <src> = . represents the dir on the host which this Dockerfile is in
# <dest> = . represents the WORKDIR on the container
# I don't think I need it if I'm mounting a volume
# COPY . .
ARG env
ENV env=$env
CMD npm run start:minikube:$env
