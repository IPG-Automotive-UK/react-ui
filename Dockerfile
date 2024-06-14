# build on top of base nodejs image
FROM node:20.12.2 as base

# install pnpm
RUN npm install -g pnpm

# copy package.json and pnpm-lock.yaml to the container
WORKDIR /usr/src/react-ui
COPY package.json pnpm-lock.yaml ./

# install react-ui dependencies
RUN pnpm install

# copy all other files to the container (note that ./src files are excluded in .dockerignore as we mount those at runtime with a volume so we can access any updated snapshot artifacts)
WORKDIR /usr/src/react-ui
COPY . .

# run the tests
CMD [ "pnpm", "run", "test" ]

