FROM node:16 as base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

FROM base as prodS
CMD ["sh","-c","npm run start"]