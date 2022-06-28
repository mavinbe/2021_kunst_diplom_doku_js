FROM node:16.10.0

WORKDIR /usr/src/app/my-app

COPY package*.json ./

COPY yarn.lock ./

RUN yarn

EXPOSE 3000

CMD ["yarn", "start"]