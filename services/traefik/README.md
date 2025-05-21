# Traefik

Traefik is a reverse proxy.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Setup](#setup)
- [Run the application](#run-the-application)
- [Setup certs](#setup-certs)
- [Generate Traefik Dashboard Credentials](#generate-traefik-dashboard-credentials)
- [Access the Traefik dashboard](#access-the-traefik-dashboard)
- [Stop the application](#stop-the-application)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Setup

Ensure that all the .env files are set up correctly. You can copy the `.env.dist` files to `.env` and modify them as needed.

```bash
cp .env.dist .env
```

## Run the application

Run the following command:

```sh
docker compose up -d traefik
```

## Setup certs

0. Ensure that `openssl` is installed on your machine (otherwise you'll need to install it):

```sh
which openssl
```

1. Generate self-signed certificates for local development:

Run the provided script to generate the certificates:

```sh
./scripts/generate-certs.sh
```

This will generate the certificates in the `data/certs` directory. The script will create a Root CA and certificates for
the following domains:

- `n8n.home.arpa`
- `portainer.home.arpa`
- `traefik.home.arpa`
- `verdaccio.home.arpa`
- `whoami.home.arpa`

2. Trust the Root CA certificate:

- **For macOS**: Run the following command to trust the Root CA:

  ```sh
  sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain data/certs/ca.crt
  ```

- **For Linux**: Add the `data/certs/ca.crt` file to your system's CA store. The exact steps depend on your
  distribution.

- **For Windows**: Import the `data/certs/ca.crt` file into the Trusted Root Certification Authorities store.

3. Update your `/etc/hosts` file to map the domains to `127.0.0.1`:

```sh
sudo sh -c 'echo "127.0.0.1 whoami.home.arpa traefik.home.arpa verdaccio.home.arpa n8n.home.arpa portainer.home.arpa" >> /etc/hosts'
```

## Generate Traefik Dashboard Credentials

To generate credentials for the Traefik dashboard, use the following command:

```sh
docker run --rm httpd:2.4-alpine htpasswd -nb admin yourpassword
```

Replace `yourpassword` with the desired password. The output will be a hashed password that you can use in the
`TRAEFIK_DASHBOARD_CREDENTIALS` environment variable in the `.env` file.

## Access the Traefik dashboard

To access the Traefik dashboard, open your browser and navigate to
[https://traefik.home.arpa:8080](https://traefik.home.arpa:8080). You should see the Traefik dashboard. The dashboard is
secured with the `traefik` user and `traefik` password. You can change the credentials in the `docker-compose.yml` file
under the `traefik` service. The credentials are stored in the `traefik` file in the `data` directory.

## Stop the application

To stop the running containers, use the following command:

```sh
docker compose down traefik
```
