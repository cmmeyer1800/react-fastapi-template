
.PHONY: run
run:			## Run in development mode.
	@echo "Running development server..."
	@docker compose --file docker/docker-compose-dev.yml up

.PHONY: run-db
run-db:			## Run just the database in development mode.
	@echo "Running development server..."
	@docker compose --file docker/docker-compose-dev.yml up db

.PHONY: run-api
run-api:		## Run just the api in development mode.
	@echo "Running development server..."
	@docker compose --file docker/docker-compose-dev.yml up backend

.PHONY: build
build:			## Build the development server.
	@echo "Building development server..."
	@docker compose --file docker/docker-compose-dev.yml build

.PHONY: down
down:			## Stop all docker containers.
	@echo "Stopping development server..."
	@docker compose --file docker/docker-compose-dev.yml down

.PHONY: build-prod
build-prod:		## Build the production server.
	@echo "Building production server..."
	@docker compose --file docker/docker-compose.yml build

.PHONY: run-prod
run-prod:		## Run in production mode.
	@echo "Running production server..."
	@docker compose --file docker/docker-compose.yml up

help:           	## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'
