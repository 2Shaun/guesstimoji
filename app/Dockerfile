FROM node:alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm install
RUN install react-scripts -g

COPY . ./

CMD ["npm", "start"]