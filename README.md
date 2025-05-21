
# devx

suite of containers for development and testing

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [Setup](#setup)
  - [Dependencies](#dependencies)
- [Services](#services)
  - [All services](#all-services)
    - [Run the applications](#run-the-applications)
    - [Stop the application](#stop-the-application)
  - [Traefik](#traefik)
    - [Run the application](#run-the-application)
    - [Setup certs](#setup-certs)
    - [Generate Traefik Dashboard Credentials](#generate-traefik-dashboard-credentials)
    - [Access the Traefik dashboard](#access-the-traefik-dashboard)
    - [Stop the application](#stop-the-application-1)
  - [Whoami](#whoami)
    - [Run the application](#run-the-application-1)
    - [Setup the Whoami service](#setup-the-whoami-service)
    - [Access the Whoami service](#access-the-whoami-service)
    - [Stop the application](#stop-the-application-2)
  - [Verdaccio](#verdaccio)
    - [Run the application](#run-the-application-2)
    - [Set the npm registry](#set-the-npm-registry)
    - [How to use the npm package manager](#how-to-use-the-npm-package-manager)
  - [Stop the application](#stop-the-application-3)
- [Reference](#reference)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Setup

Ensure that all the .env files are set up correctly. You can copy the `.env.dist` files to `.env` and modify them as needed.

```bash
cp .env.dist .env
```

### Dependencies

All the dependencies for contributing to this project should be installed via `npm` and `mise`. Please check the `package.json`
and `mise.toml`files for the list of dependencies.

- [prettier](https://prettier.io/)
  - [prettier-plugin-pkg](https://github.com/un-ts/prettier/tree/master/packages/pkg)
  - [prettier-plugin-sh](https://github.com/un-ts/prettier/tree/master/packages/sh)
    - [shellcheck](https://github.com/koalaman/shellcheck)
  - [prettier-plugin-toml](https://github.com/un-ts/prettier/tree/master/packages/toml)
- [jsonlint](https://github.com/prantlf/jsonlint)
- [yaml-lint](https://github.com/rasshofer/yaml-lint)
- [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2)
- [doctoc](https://github.com/thlorenz/doctoc)
- [lockfile-lint](https://github.com/lirantal/lockfile-lint)

## Services

### All services

#### Run the applications

Run the following command:

```sh
docker compose up -d
```

#### Stop the application

To stop the running containers, use the following command:

```sh
docker compose down
```

### Traefik

Traefik is a reverse proxy.

#### Run the application

Run the following command:

```sh
docker compose up -d traefik
```

#### Setup certs

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

- `traefik.imb.local`
- `verdaccio.imb.local`
- `whoami.imb.local`

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
sudo sh -c 'echo "127.0.0.1 whoami.imb.local traefik.imb.local verdaccio.imb.local" >> /etc/hosts'
```

#### Generate Traefik Dashboard Credentials

To generate credentials for the Traefik dashboard, use the following command:

```sh
docker run --rm httpd:2.4-alpine htpasswd -nb admin yourpassword
```

Replace `yourpassword` with the desired password. The output will be a hashed password that you can use in the
`TRAEFIK_DASHBOARD_CREDENTIALS` environment variable in the `.env` file.

#### Access the Traefik dashboard

To access the Traefik dashboard, open your browser and navigate to
[https://traefik.imb.local:8080](https://traefik.imb.local:8080). You should see the Traefik dashboard. The dashboard is
secured with the `traefik` user and `traefik` password. You can change the credentials in the `docker-compose.yml` file
under the `traefik` service. The credentials are stored in the `traefik` file in the `data` directory.

#### Stop the application

To stop the running containers, use the following command:

```sh
docker compose down traefik
```

### Whoami

Whoami is a simple web server that displays information about the request.

#### Run the application

Run the following command:

```sh
docker compose up -d whoami
```

#### Setup the Whoami service

The Whoami service is already configured to work with Traefik. You don't need to do anything special to set it up.

#### Access the Whoami service

To access the Whoami service, open your browser and navigate to [https://whoami.imb.local](https://whoami.imb.local).

#### Stop the application

To stop the running containers, use the following command:

```sh
docker compose down whoami
```

### Verdaccio

Verdaccio is a lightweight private npm registry that can be run locally.

#### Run the application

Run the following command:

```sh
docker compose up -d verdaccio
```

Verdaccio will be accessible at [http://localhost:4873](http://localhost:4873).

#### Set the npm registry

To configure npm to use the Verdaccio registry, run the provided script:

```sh
./scripts/set-npm-registry.sh
```

This script will set the npm registry to the Verdaccio domain specified in the `.env` file. By default, it will use:

```sh
https://verdaccio.imb.local
```

To revert the npm registry to the default (npmjs.org), run:

```sh
npm config delete registry
```

#### How to use the npm package manager

Get into the container:

```bash
docker exec -it verdaccio sh
```

To publish your first package:

1. Create a user:

```sh
$ docker exec -it verdaccio sh # This command will take you into the container
~ $ npm adduser --registry http://localhost:4873/
npm notice Log in on http://localhost:4873/
Username: thoroc
Email: (this IS public) admin@imbc.com

Logged in on http://localhost:4873/.
```

2. Go to the project to publish:

```sh
mkdir nodejs-app
cd my-nodejs-app
echo "console.log('Hello, World!');" > app.js
npm init -y
node app.js

npm login --registry http://localhost:4873/
npm publish --registry http://localhost:4873/ --auth-type=legacy
```

Go to [http://localhost:4873](http://localhost:4873) and refresh to see your package available.

### Stop the application

To stop the running containers, use the following command:

```bash
docker compose down
```

## Reference

- <https://www.putzisan.com/articles/https-setup-with-traefik-docker-compose-for-local-dev#service-error-404-page-not-found>
- <https://www.jimgogarty.com/installing-traefik-on-docker-with-docker-compose/>
- <https://medium.com/@svenvanginkel/setting-up-traefik-v3-in-docker-0c0559a696f1>
- <https://www.spad.uk/posts/practical-configuration-of-traefik-as-a-reverse-proxy-for-docker-updated-for-2023/>
- <https://selfhost.esc.sh/traefik-docker/>
- <https://github.com/MikeTeddyOmondi/traefik-config-docker>
- <https://www.iantiemann.nl/posts/2025/2/traefik/>
