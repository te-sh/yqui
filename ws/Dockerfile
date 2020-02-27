FROM golang:1.14.0-alpine3.11

WORKDIR /app

RUN apk add git \
 && go get github.com/gorilla/websocket \
 && go get github.com/google/uuid \
 && go get github.com/oxequa/realize

CMD ["realize", "start"]
