FROM node:20-alpine

ENV DOMAIN host.docker.internal

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 3000

CMD [ "yarn", "start" ]