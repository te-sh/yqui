FROM node:16.4.2-alpine3.14

RUN apk update \
 && apk upgrade \
 && apk add udev ttf-freefont font-noto-cjk unifont chromium dumb-init \
 && rm -rf /var/cache/apk/*

USER node
ENV HOME /home/node
ENV TESTDIR $HOME/test
RUN mkdir -p $TESTDIR

WORKDIR $TESTDIR
ADD --chown=node:node package.json yarn.lock ./

RUN yarn install \
 && yarn cache clean

ADD sleep ./

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
