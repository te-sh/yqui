FROM node:16.4.2-alpine3.14

USER node
ENV HOME /home/node
ENV APPDIR $HOME/app
RUN mkdir -p $APPDIR

WORKDIR $APPDIR
ADD package.json yarn.lock ./

RUN yarn install \
 && yarn cache clean
