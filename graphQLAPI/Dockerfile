#escape=`
FROM node:alpine
RUN apk add --update --no-cache `
    curl `
    git `
    vim
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
# this allows protection against run commands
USER node
# sets the working director for RUN, CMD, ENTRYPOINT, COPY, and ADD
# this will be a directory ON THE CONTAINER
WORKDIR /home/node/app
ENV PATH /home/node/app/node_modules/.bin:$PATH
# COPY <src> <dest>
# takes from <src> and adds them to the filesystem of the 
# container at the path <dest>
COPY package*.json ./
# <src> = . represents the dir on the host which this Dockerfile is in
# <dest> = . represents the WORKDIR on the container
COPY --chown=node:node . .
# RUN excutes commands in a new layer on top of the current image
# and commits the results
# this committed image will be used for the next step
RUN npm install
EXPOSE 3005
CMD ["node", "server.js"]