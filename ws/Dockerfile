FROM golang:1.14.4-alpine3.12

WORKDIR /app

RUN apk add git \
 && go get gopkg.in/natefinch/lumberjack.v2 \
 && go get github.com/gorilla/websocket \
 && go get github.com/oxequa/realize

CMD ["realize", "start"]
