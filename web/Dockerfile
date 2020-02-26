FROM node:13.8.0-alpine3.11

WORKDIR /app

ADD package.json yarn.lock ./
RUN yarn install

CMD ["yarn", "start"]
