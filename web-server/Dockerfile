## NEEDS WORK. CREATES ERROR npm ERR! enoent ENOENT: no such file or directory, open '/app/package.json' 
## WHEN sudo docker-compose up is ran
FROM node:latest
WORKDIR /web-server
ENV PORT 3000
COPY package.json /web-server/package.json
RUN npm install
COPY . /web-server
CMD npm start
