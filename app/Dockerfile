FROM node:latest
RUN mkdir /src
WORKDIR /src
RUN npm install nodemon -g
ADD package.json /src
ADD nodemon.json /src
EXPOSE 9000