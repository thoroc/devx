# CoreDNS

CoreDNS is a flexible, extensible DNS server that can serve as a DNS server for Kubernetes clusters. It is written in Go
and is designed to be easy to use and configure. CoreDNS can be used as a standalone DNS server or as a plugin for other
applications.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Run the application](#run-the-application)
- [Access the CoreDNS UI](#access-the-coredns-ui)
- [Stop the application](#stop-the-application)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Run the application

Run the following command:

```sh
docker compose up -d coredns
```

CoreDNS will be accessible at [http://coredns.home.arpa](http://coredns.home.arpa).

## Access the CoreDNS UI

You can access the CoreDNS UI at [http://coredns.home.arpa:8080](http://coredns.home.arpa:8080).
The default username is `admin` and the password is `coredns`. You can change the password in the
`docker-compose.yml` file under the `coredns` service. The password is stored in the `coredns` file in the `data` directory.

## Stop the application

To stop the running containers, use the following command:

```sh
docker compose down coredns
```
