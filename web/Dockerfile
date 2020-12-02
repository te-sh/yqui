FROM node:14.15.1-alpine3.12

WORKDIR /app

ADD package.json yarn.lock ./
RUN yarn install \
 && yarn cache clean

CMD ["yarn", "start"]
