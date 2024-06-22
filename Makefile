
.PHONY: run
run:
	@echo "Running development server..."
	@docker compose --file docker/docker-compose-dev.yml up

.PHONY: run-db
run-db:
	@echo "Running development server..."
	@docker compose --file docker/docker-compose-dev.yml up db

.PHONY: run-api
run-api:
	@echo "Running development server..."
	@docker compose --file docker/docker-compose-dev.yml up backend

.PHONY: build
build:
	@echo "Building development server..."
	@docker compose --file docker/docker-compose-dev.yml build

.PHONY: down
down:
	@echo "Stopping development server..."
	@docker compose --file docker/docker-compose-dev.yml down

.PHONY: build-prod
build-prod:
	@echo "Building production server..."
	@docker compose --file docker/docker-compose.yml build

.PHONY: run-prod
run-prod:
	@echo "Running production server..."
	@docker compose --file docker/docker-compose.yml up