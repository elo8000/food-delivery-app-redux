FROM node:20-alpine

ENV DOMAIN host.docker.internal

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 5137

CMD [ "yarn", "start" ]