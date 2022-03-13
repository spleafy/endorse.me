FROM node:17-alpine3.14

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

RUN yarn add nodemon

COPY . ./
CMD [ "yarn", "start" ]