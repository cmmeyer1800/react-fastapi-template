FROM node:22-slim

RUN apt-get update
RUN apt-get install -y curl

WORKDIR /app

COPY package.json /app/package.json

RUN npm install react-scripts
RUN npm install
