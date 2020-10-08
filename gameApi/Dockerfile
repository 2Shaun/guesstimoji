FROM node:current-alpine
# sets the working director for RUN, CMD, ENTRYPOINT, COPY, and ADD
# this will be a directory ON THE CONTAINER
RUN mkdir -p /guesstimoji/server
WORKDIR /guesstimoji/server
# COPY <src> <dest>
# takes from <src> and adds them to the filesystem of the 
# container at the path <dest>
COPY package*.json /guesstimoji/server/
# RUN excutes commands in a new layer on top of the current image
# and commits the results
# this committed image will be used for the next step
RUN npm install
# <src> = . represents the dir on the host which this Dockerfile is in
# <dest> = . represents the WORKDIR on the container
# I don't think I need it if I'm mounting a volume
# COPY . .
CMD ["npm", "run", "dev"]
