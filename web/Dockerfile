FROM node:14.4.0-alpine3.12

WORKDIR /app

ADD package.json yarn.lock ./
RUN yarn install

CMD ["yarn", "start"]
