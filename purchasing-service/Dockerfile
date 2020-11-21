FROM node:latest
WORKDIR /purchasing-service
ENV PORT 7000
COPY package.json /purchasing-service/package.json
RUN npm install
COPY . /purchasing-service
CMD npm start
