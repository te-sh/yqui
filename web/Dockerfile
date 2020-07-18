FROM node:14.5.0-alpine3.12

WORKDIR /app

ADD package.json yarn.lock ./
RUN yarn install \
 && yarn cache clean

CMD ["yarn", "start"]
