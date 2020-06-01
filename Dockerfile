FROM ubuntu:latest
WORKDIR ~/guesstimoji2
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
