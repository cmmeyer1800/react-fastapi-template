FROM node:22-slim

RUN apt-get update
RUN apt-get install -y curl

WORKDIR /app

COPY package.json /app/package.json

RUN npm install react-scripts
RUN npm install

# HEALTHCHECK --interval=2s --timeout=30s --start-period=5s --retries=10 CMD curl --fail --silent http://localhost:3000 || exit 1