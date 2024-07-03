# Docker 

- A quoi ça sert ?
- Comment ça fonctionne globalement
- Comment lancer un container (commandes)
  - `run`
    - `run -d` -> `run --detach`
    - `run --name [nom de container que veut lui donner]`
  - `exec`
  - `stop`
  - `rm`
  - `ps`/ `ps -a`

- Comment construire une image
  - la base d'un image `FROM node:18-alpine`
  - `WORKDIR` / `COPY` / `RUN` 
  - `CMD` / `ENTRYPOINT`
  - `build`
    - `docker build . -t playground-api`
    - `-f` / `--file`
    - `docker build . -f ./Dockerfile-dev -t playground-dev`
> docker run -d --name api -p 4000:3000 playground-api

- Comment fonctionne les volumes 
  - `-v` / `--volume`
  - `docker run -d --name api-dev -p 3000:3000 -v ./:/app playground-dev`