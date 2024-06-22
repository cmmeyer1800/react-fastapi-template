
.PHONY: run
run:
	@echo "Running development server..."
	@docker compose --file docker/docker-compose-dev.yml up

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