FROM node:alpine
RUN mkdir /src
WORKDIR /src
RUN npm install nodemon -g
ADD package.json /src
ADD nodemon.json /src
#RUN mv .env.prod .env
EXPOSE 9000