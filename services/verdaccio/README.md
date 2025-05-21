# Verdaccio

Verdaccio is a lightweight private npm registry that can be run locally.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Setup](#setup)
- [Run the application](#run-the-application)
- [Set the npm registry](#set-the-npm-registry)
- [How to use the npm package manager](#how-to-use-the-npm-package-manager)
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
docker compose up -d verdaccio
```

Verdaccio will be accessible at [http://verdaccio.home.arpa](http://verdaccio.home.arpa).

## Set the npm registry

To configure npm to use the Verdaccio registry, run the provided script:

```sh
./scripts/set-npm-registry.sh
```

This script will set the npm registry to the Verdaccio domain specified in the `.env` file. By default, it will use:

```sh
https://verdaccio.home.arpa
```

To revert the npm registry to the default (npmjs.org), run:

```sh
npm config delete registry
```

## How to use the npm package manager

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
Email: (this IS public) admin@home.arpa

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

Go to [http://verdaccio.home.arpa](http://verdaccio.home.arpa) and refresh to see your package available.

## Stop the application

To stop the running containers, use the following command:

```bash
docker compose down
```
