FROM node:16-slim

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN apt-get update && \
    yarn install && \
    yarn cache clean

COPY . .

RUN yarn run build

CMD yarn run dev
