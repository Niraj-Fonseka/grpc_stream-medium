FROM golang:1.15.6-buster

WORKDIR /app/
ENV GO111MODULE=auto
RUN apt-get update && apt-get -y --no-install-recommends install libprotobuf-dev=3.6.1.3-2 protobuf-compiler=3.6.1.3-2 && rm -rf /var/lib/apt/lists/*

# Install grpc
RUN go get -u -v github.com/golang/protobuf/proto
RUN go get -u -v github.com/golang/protobuf/protoc-gen-go
RUN go get -u -v google.golang.org/grpc

# Install protoc and zip system library
RUN apt-get update && \
    apt-get install -y --no-install-recommends unzip=6.0-23+deb10u1 && \
    mkdir /opt/protoc && \
    cd /opt/protoc && \
    wget https://github.com/protocolbuffers/protobuf/releases/download/v3.7.0/protoc-3.7.0-linux-x86_64.zip && \
    unzip protoc-3.7.0-linux-x86_64.zip && \
    rm -rf /var/lib/apt/lists/*

ENV PATH=$PATH:$GOPATH/bin:/opt/protoc/bin