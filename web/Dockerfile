FROM node:14.15.5-alpine3.12

USER node
ENV HOME /home/node

ENV APPDIR $HOME/app
RUN mkdir -p $APPDIR
WORKDIR $APPDIR

ADD package.json yarn.lock ./
RUN yarn install \
 && yarn cache clean

CMD ["yarn", "start"]
