FROM node:latest
WORKDIR /log-service
ENV PORT 8000
COPY package.json /log-service/package.json
RUN npm install
COPY . /log-service
CMD npm start
