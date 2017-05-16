FROM node:4

ADD ./src/. /app

RUN cd /app; \
    npm install

EXPOSE 3000

CMD sleep 2 && node /app/bin/www
