FROM node:16.16.0 as base

WORKDIR /app

COPY . /app

RUN npm install -f

EXPOSE 6006

CMD npm run storybook