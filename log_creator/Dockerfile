FROM node:16 as base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# might want to move this to somewhere else
FROM base as prod
CMD ["nodejs", "app/server/server.js"]

FROM base as test
CMD ["./node_modules/mocha/bin/mocha", "./app/test"]