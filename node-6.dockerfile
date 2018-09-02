FROM node:6
ADD ./package.json /dpayjs/package.json
WORKDIR /dpayjs
RUN npm install
ADD . /dpayjs
RUN npm test
