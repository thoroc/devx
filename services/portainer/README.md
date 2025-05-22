# Portainer

Portainer is a lightweight management UI which allows you to easily manage your Docker containers.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Run the application](#run-the-application)
- [Access the Portainer UI](#access-the-portainer-ui)
- [Stop the application](#stop-the-application)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Run the application

Run the following command:

```sh
docker compose up -d portainer
```

## Access the Portainer UI

To access the Portainer UI, open your browser and navigate to [http://portainer.home.arpa](http://portainer.home.arpa).
You should see the Portainer UI. The default username is `admin` and the password is `portainer`. You can change the
password in the `docker-compose.yml` file under the `portainer` service. The password is stored in the `portainer` file
in the `data` directory.

## Stop the application

To stop the running containers, use the following command:

```sh
docker compose down portainer
```
