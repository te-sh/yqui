FROM golang:1.14.0-alpine3.11

WORKDIR /app

RUN apk add git \
 && go get github.com/gorilla/websocket

CMD ["go", "run", "main.go"]
