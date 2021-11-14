FROM debian:latest
WORKDIR /root
RUN apt-get update && apt-get install -y wget && \
    wget -O - https://downloads.mongodb.com/compass/mongosh-1.1.2-linux-x64.tgz | tar -C /usr/local/bin -xzf -
RUN mv /usr/local/bin/mongosh-1.1.2-linux-x64/bin/* /usr/local/bin
RUN rm -rf /usr/local/bin/mongosh-1.1.2-linux-x64
RUN apt-get install -y npm
RUN npm i dotenv
COPY ./initializeDb.js .
COPY ./boards.json .
COPY ./emojis.json .
RUN echo "MONGODB_HOST_NAME=mongo" >> .env.local
