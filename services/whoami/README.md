# Whoami

Whoami is a simple web server that displays information about the request.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Run the application](#run-the-application)
- [Setup the Whoami service](#setup-the-whoami-service)
- [Access the Whoami service](#access-the-whoami-service)
- [Stop the application](#stop-the-application)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Run the application

Run the following command:

```sh
docker compose up -d whoami
```

## Setup the Whoami service

The Whoami service is already configured to work with Traefik. You don't need to do anything special to set it up.

## Access the Whoami service

To access the Whoami service, open your browser and navigate to [https://whoami.home.arpa](https://whoami.home.arpa).

## Stop the application

To stop the running containers, use the following command:

```sh
docker compose down whoami
```
