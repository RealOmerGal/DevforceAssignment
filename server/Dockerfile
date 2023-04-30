FROM node:alpine AS build

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY . .
CMD ["npm","run", "build"]

FROM node:alpine as deploy
WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY --from=build /app/dist /app
COPY  ./ui /ui
CMD ["node","."]
