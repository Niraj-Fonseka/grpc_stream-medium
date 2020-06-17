#!/usr/bin/env bash

echo --- Building my-envoy docker image ---
docker build -t my-envoy:1.0 .


echo --- Running my-envoy docker image ---
docker run -p 8080:8080 -p 9901:9901 --network=host my-envoy:1.0

