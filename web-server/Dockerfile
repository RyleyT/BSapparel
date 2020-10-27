FROM node:latest
WORKDIR /web-server
ENV PORT 3000
COPY package.json /web-server/package.json
RUN npm install
COPY . /web-server
CMD npm start
