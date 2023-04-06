FROM node:alpine

WORKDIR /usr/app

COPY package.json yarn.lock ./
COPY . .
COPY ./.env.homolog ./.env

RUN yarn install --quiet --no-optional --no-found --loglevel=error

RUN yarn build 

EXPOSE 3000
CMD ["yarn", "start:prod"]