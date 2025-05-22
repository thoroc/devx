# n8n

n8n is a free and open source workflow automation tool. It allows you to connect different services and automate tasks
between them. n8n is a powerful tool for automating tasks and workflows.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Run the application](#run-the-application)
- [Access the n8n UI](#access-the-n8n-ui)
- [Stop the application](#stop-the-application)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Run the application

Run the following command:

```sh
docker compose up -d n8n
```

## Access the n8n UI

To access the n8n UI, open your browser and navigate to [http://n8n.home.arpa](http://n8n.home.arpa).
You should see the n8n UI. The default username is `admin` and the password is `n8n`. You can change the password in the
`docker-compose.yml` file under the `n8n` service. The password is stored in the `n8n` file in the `data` directory.

## Stop the application

To stop the running containers, use the following command:

```sh
docker compose down n8n
```
