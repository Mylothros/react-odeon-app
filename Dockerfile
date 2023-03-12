FROM node:13-alpine

WORKDIR /app

ARG REACT_APP_API_SECRET

ENV REACT_APP_API_SECRET=$REACT_APP_API_SECRET

copy . /app

RUN npm install

RUN npm ci

RUN npm build

EXPOSE 3000

ENTRYPOINT npm run start