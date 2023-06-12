FROM node:18-alpine as base

RUN npm install -g nodemon

WORKDIR /app

COPY . /app

RUN npm install -f

EXPOSE 6006

CMD npm run storybook