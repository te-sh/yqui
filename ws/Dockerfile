FROM golang:1.15.0-alpine3.12

WORKDIR /app

RUN apk update \
 && apk upgrade \
 && apk add git tzdata \
 && cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
 && go get gopkg.in/natefinch/lumberjack.v2 \
 && go get github.com/gorilla/websocket \
 && go get github.com/oxequa/realize \
 && apk del git tzdata \
 && rm -rf /var/cache/apk/*

ENV YQUI_ENV dev

CMD ["realize", "start"]
