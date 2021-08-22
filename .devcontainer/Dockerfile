FROM node:16-slim

COPY package.json yarn.lock ./

RUN apt-get update && \
    apt-get install -y git vim
