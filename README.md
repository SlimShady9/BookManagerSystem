# BookManagerSystem
Book manager system split into two container services.

## Dependencies to deploy

Read dependency required to deploy backend service [here](https://github.com/SlimShady9/BookManagerSystem/tree/main/BookSystem)
No further actions required in frontend service

## Running the application

Added docker-compose.yaml which will help during deployment a build of images
```
docker-compose build --no-cache
docker-compose up
```
As network and volumes are created for application execution, it's required to wipe all dependencies in order to clean up all the application components from disk space and cache
```
docker-compose down -v --remove-orphans
```