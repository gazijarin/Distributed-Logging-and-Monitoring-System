FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# might want to move this to somewhere else
CMD ["nodejs", "app/server/server.js"]