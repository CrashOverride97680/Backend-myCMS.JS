FROM node:stretch-slim
RUN mkdir /src
WORKDIR /src
RUN npm install nodemon -g
ADD package.json /src
ADD nodemon.json /src
#RUN mv .env.dev .env
EXPOSE 9000