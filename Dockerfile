FROM node:18.14.1

WORKDIR /app

ARG REACT_APP_API_SECRET

ENV REACT_APP_API_SECRET=$REACT_APP_API_SECRET

copy . /app

RUN npm install

RUN npm run build

EXPOSE 3000

ENTRYPOINT npm run start