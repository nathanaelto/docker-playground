.PHONY: install-front install-back install start up pull db-update index

install-front:
	@echo "Install front dependencies"
	@docker compose run --rm front npm install

install-back:
	@echo "Install back dependencies"
	@docker compose run --rm back npm install

install: install-front install-back

start:
	@docker compose up -d

up: install start

pull:
	@docker compose pull

db-update:
	@docker compose exec back npx mikro-orm schema:update --run

index:
	@docker compose exec back npm run index