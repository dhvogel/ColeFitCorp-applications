FROM node:5

RUN mkdir /src

RUN npm install nodemon -g

WORKDIR /src

ADD ./src/package.json /src/package.json

RUN npm install

EXPOSE 9000

CMD ls && npm run dev


