FROM node:16-slim

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN apt-get update && \
    apt-get install -y git vim && \
    yarn install && \
    yarn cache clean

COPY . .

CMD yarn run dev
