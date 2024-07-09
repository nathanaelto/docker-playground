.PHONY: install-front install-back install start up pull

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