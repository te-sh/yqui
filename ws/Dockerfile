FROM golang:1.16.5-alpine3.13

WORKDIR /app

RUN apk update \
 && apk upgrade \
 && apk add git tzdata \
 && cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
 && rm -rf /var/cache/apk/* \
 && go get -u github.com/cosmtrek/air@v1.15.1

ENV YQUI_ENV dev
