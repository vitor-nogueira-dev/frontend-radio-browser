# BUILD
FROM node:20.12 AS build

WORKDIR /app

COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

# PROD
FROM node:20.12-alpine AS production

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/package*.json ./

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
