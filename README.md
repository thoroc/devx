
# devx

suite of containers for development and testing

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [Setup](#setup)
  - [Dependencies](#dependencies)
- [Services](#services)
  - [Available services](#available-services)
    - [Run the applications](#run-the-applications)
    - [Stop the applications](#stop-the-applications)
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
- [dclint](https://github.com/zavoloklom/docker-compose-linter)

## Services

### Available services

 - [coredns](./services/coredns/README.md)
 - [n8n](./services/n8n/README.md)
 - [portainer](./services/portainer/README.md)
 - [traefik](./services/traefik/README.md)
 - [verdaccio](./services/verdaccio/README.md)
 - [watchtower](./services/watchtower/README.md)
 - [whoami](./services/whoami/README.md)

#### Run the applications

Run the following command:

```sh
docker compose up -d
```

To run a specific service, use the following command:

```sh
docker compose up -d <service_name>
```

#### Stop the applications

To stop the running containers, use the following command:

```sh
docker compose down -v --remove-orphans
```

To stop a specific service, use the following command:

```sh
docker compose down -v --remove-orphans <service_name>
```

## Reference

- <https://blog.abowden.net/dns-server-for-homelab>
- <https://blog.idempotent.ca/2018/04/18/run-your-own-home-dns-on-coredns/>
- <https://dev.to/lotyp/simplifying-local-development-with-docker-mkcert-dnsmasq-and-traefik-3k57>
- <https://dev.to/robbmanes/running-coredns-as-a-dns-server-in-a-container-1d0>
- <https://di-marco.net/blog/it/2024-05-09-Intall_and_configure_coredns/>
- <https://dklesev.github.io/devenv/>
- <https://exitcode0.net/posts/homeassistant-tls-with-tailscale-traefik/>
- <https://github.com/MikeTeddyOmondi/traefik-config-docker>
- <https://github.com/scottt732/coredns-traefik>
- <https://medium.com/@bensoer/setup-a-private-homelab-dns-server-using-coredns-and-docker-edcfdded841a>
- <https://medium.com/@svenvanginkel/setting-up-traefik-v3-in-docker-0c0559a696f1>
- <https://medium.com/soulweb-academy/docker-local-dev-stack-with-traefik-https-dnsmasq-locally-trusted-certificate-for-ubuntu-20-04-5f036c9af83d>
- <https://selfhost.esc.sh/traefik-docker/>
- <https://technotim.live/posts/traefik-3-docker-certificates/>
- <https://www.damirscorner.com/blog/posts/20250321-TraefikReverseProxyForDocker.html>
- <https://www.digitalocean.com/community/tutorials/how-to-use-traefik-v2-as-a-reverse-proxy-for-docker-containers-on-ubuntu-20-04>
- <https://www.iantiemann.nl/posts/2025/2/traefik/>
- <https://www.jimgogarty.com/installing-traefik-on-docker-with-docker-compose/>
- <https://www.putzisan.com/articles/https-setup-with-traefik-docker-compose-for-local-dev>
- <https://www.someguyandhismac.com/posts/corends-docker-multihosts/>
- <https://www.spad.uk/posts/practical-configuration-of-traefik-as-a-reverse-proxy-for-docker-updated-for-2023/>
