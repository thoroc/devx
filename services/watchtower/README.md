# Watchtower

Watchtower is a tool for automatically updating running Docker containers. It monitors your containers and checks for
updates to the images they are based on. If an update is available, it pulls the new image and restarts the container
with the updated image.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

- [Run the application](#run-the-application)
- [Stop the application](#stop-the-application)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Run the application

Run the following command:

```sh
docker compose up -d watchtower
```

## Stop the application

To stop the running containers, use the following command:

```sh
docker compose down watchtower
```
