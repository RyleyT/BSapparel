## NEEDS WORK. CREATES ERROR npm ERR! enoent ENOENT: no such file or directory, open '/app/package.json' 
## WHEN sudo docker-compose up is ran
FROM node:12
WORKDIR /app/web-server
RUN npm install
CMD npm start
