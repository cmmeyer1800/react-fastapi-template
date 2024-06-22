FROM node:22-slim as build

WORKDIR /app

COPY package.json /app/package.json
COPY src /app/src
COPY public /app/public

RUN npm install react-scripts
RUN npm install
RUN npm run build

FROM nginx:1.27.0 as prod

COPY --from=build /app/build /srv/app

COPY ./nginx-conf/default.conf /etc/nginx/conf.d/default.conf
