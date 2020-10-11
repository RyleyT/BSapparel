FROM node:latest
WORKDIR /api-gateway
ENV PORT 4000
COPY package.json /api-gateway/package.json
RUN npm install
COPY . /api-gateway
CMD npm start
