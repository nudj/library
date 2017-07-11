FROM node:6.10.0-alpine
RUN mkdir -p /usr/src
WORKDIR /usr/src
COPY src /usr/src
RUN npm i
CMD ./node_modules/.bin/standard && ./node_modules/.bin/mocha test/*.js
