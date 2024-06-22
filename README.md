# React - Fastapi - Postgres Full Stack Template

# Overview
This repository is a template for a full stack application using React, Fastapi, and Postgres.
In order to blend the frontend and the backend together, the backend and frontend are served through nginx as a reverse proxy. The frontend is served statically in a production build and traffic is proxies to the backend container for API requests.

# Getting Started
To get started, clone the repository and navigate to the root directory. From there, you should first search the whole repository for all occurences of `TOFILL` and replace them with the appropriate values. Most of these need to be replaced with some variation of your application name, thought there are a few other values that need to be payed closer attention too. Once you have replaced all of the `TOFILL` values, you can build proceed to the development or deployment sections.

## Structure Explained
The following is an outline of the structure of the repository:
```
repo root
|
|- backend
|  |- app (Fastapi application and celery tasks)
|  |- logs (Log directory for the backend)
|  |- tests (Pytest directory for the backend)
|  |- Dockerfile (Dockerfile for the backend)
|
|- docker
|  |- docker-compose.yml (Docker compose for production)
|  |- docker-compose.dev.yml (Docker compose for development)
|
|- frontend
   |- public (Public resources for the frontend)
   |- src (Source code for the frontend)
   |- Dockerfile (Dockerfile for the frontend)
   |- dev.Dockerfile (Dockerfile for frontend development env)
   |- nginx-conf
      |- default.conf (Nginx config for production)
      |- dev.conf (Nginx config for development)
```

# Development
This repository leverages `docker` and `docker-compose` to manage the development environment, as well as `Make` for ease of use. To get started, run the following command:
```bash
make build
```
This will build the development containers for the frontend and backend. Once the containers are built, run the following command to start the development environment:
```bash
make run
```
Through directory mounting and hot reloading, both the frontend and backend will be updated in real-time as changes are made. The frontend will be available at `http://frontend:3000` and the backend will be available at `http://backend:8000`. They will be blended together through the nginx reverse proxy available at `http://localhost:8080`.

# Deployment
Like development, deployment is managed through `docker` and `docker-compose`. To deploy the application, you will need to build the production containers and run the production docker-compose file. To build the production containers, run the following command:
```bash
make build-prod
```
This will build the production containers for the frontend and backend. Once the containers are built, run the following command to start the production environment:
```bash
make run-prod
```
If the given production docker-compose file is too limiting you can simply take the images built and run them in your own environment. The static frontend and nginx image is tagged as `<YOUR_APP_NAME>_router:latest` and the backend image is tagged as `<YOUR_APP_NAME>_backend:latest`.

# License
This repository is licensed `MIT`
