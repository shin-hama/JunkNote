FROM node:16-slim

WORKDIR /usr/app

COPY . .

RUN apt-get update && \
    yarn install && \
    yarn run build

CMD yarn run dev
