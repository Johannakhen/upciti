FROM node:13.12.0-alpine

ARG NODE_ENV=development

ENV NODE_PATH=/srv/app/node_modules
WORKDIR /srv/app
COPY package.json ./

RUN npm i --silent
RUN npm i axios
RUN npm i node-sass
RUN npm install react-scripts@3.4.1 -g --silent

COPY . /srv/app

EXPOSE 3000

CMD ["npm", "run", "start"]
