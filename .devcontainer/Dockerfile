FROM node:16-slim

COPY . .

RUN apt-get update && \
    apt-get install -y git vim && \
    yarn install && \
    yarn cache clean
