FROM golang:1.15.8-alpine3.13

WORKDIR /app

RUN apk update \
 && apk upgrade \
 && apk add git tzdata \
 && cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
 && go get gopkg.in/natefinch/lumberjack.v2 \
 && go get github.com/gorilla/websocket \
 && go get github.com/cosmtrek/air \
 && apk del git tzdata \
 && rm -rf /var/cache/apk/*

ENV YQUI_ENV dev

CMD ["air", "-c", ".air.toml"]
