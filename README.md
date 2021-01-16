# Inspired by 'Building a realtime dashboard with ReactJS, Go, gRPC, and Envoy' medium post

## Build Docker Images

### Build on Linux host

```sh
$ docker-compose -f docker-compose-linux.yml build
```

### Build on MACOS host

```sh
$ docker-compose -f docker-compose-macos.yml build
```

## Run Docker Containers

### Run on Linux host

```sh
$ docker-compose -f docker-compose-linux.yml up -d
```

### Run on MACOS host

```sh
$ docker-compose -f docker-compose-macos.yml up -d
```