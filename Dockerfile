FROM node:12.18-alpine AS build

WORKDIR /usr/src/app

# Install dependencies
COPY ["firebase_acc.json","package.json", "yarn.lock", "./"]
RUN yarn

# Build the app
COPY . .
RUN yarn build

FROM node:12.18-alpine

ENV NODE_ENV production
WORKDIR /usr/src/app

COPY ["firebase_acc.json","package.json", "yarn.lock", "./"]
RUN yarn

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000
CMD yarn start:prod
