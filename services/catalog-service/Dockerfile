FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=development
ENV PORT=8081
ENV SERVICE_NAME=catalog-service

COPY . .

CMD ["node", "src/server.js"]
