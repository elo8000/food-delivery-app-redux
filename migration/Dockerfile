FROM node:20-alpine

ENV DOMAIN host.docker.internal

WORKDIR /app

COPY . .

RUN yarn install

CMD yarn migrate && yarn seed