FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

# Corrige permissão do tsc (!!!)
RUN chmod +x ./node_modules/.bin/tsc

COPY . .

RUN npm run build

CMD ["npm", "start"]