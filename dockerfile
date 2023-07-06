FROM node:18-alpine AS build

# Create app directory
WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

RUN npm run build

USER node

FROM node:18-alpine AS production

RUN apk add chromium

WORKDIR /usr/src/app
RUN chown -R node /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/package.json ./

USER node
EXPOSE 3000

CMD [ "node", "dist/main.js" ]