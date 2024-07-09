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

- Pour voir toute la config d'un container :
> `docker inspect [container name]`

- Comment fonctionne les réseaux Docker

```shell
docker network create mini-network 

docker run -it --name c1 ubuntu /bin/bash
docker network connect mini-network c1

docker run -it --network=mini-network --name c2 ubuntu /bin/bash
docker run -it --network=mini-network --name c4 --hostname h4 ubuntu /bin/bash

docker network create -d none safe-network
docker run -it --network=safe-network --name c3 ubuntu /bin/bash
docker network connect safe-network c1
```