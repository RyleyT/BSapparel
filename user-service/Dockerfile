FROM node:latest
WORKDIR /user-service
ENV PORT 5000
COPY package.json /user-service/package.json
RUN npm install
COPY . /user-service
CMD npm start
