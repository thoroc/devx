
# devx

suite of containers for development and testing

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [Setup](#setup)
- [bring up](#bring-up)
- [bring down](#bring-down)
- [Reference](#reference)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Setup

Ensure that all the .env files are set up correctly. You can copy the `.env.dist` files to `.env` and modify them as needed.

```bash
cp .env.dist .env
```

## bring up

```bash
docker-compose up -d
```

## bring down

```bash
docker compose down -v --remove-orphans
```

## Reference

- <https://www.putzisan.com/articles/https-setup-with-traefik-docker-compose-for-local-dev#service-error-404-page-not-found>
- <https://www.jimgogarty.com/installing-traefik-on-docker-with-docker-compose/>
- <https://medium.com/@svenvanginkel/setting-up-traefik-v3-in-docker-0c0559a696f1>
- <https://www.spad.uk/posts/practical-configuration-of-traefik-as-a-reverse-proxy-for-docker-updated-for-2023/>
- <https://selfhost.esc.sh/traefik-docker/>
- <https://github.com/MikeTeddyOmondi/traefik-config-docker>
- <https://www.iantiemann.nl/posts/2025/2/traefik/>
