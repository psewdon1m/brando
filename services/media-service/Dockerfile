FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=development
ENV PORT=8082
ENV SERVICE_NAME=media-service

COPY . .

CMD ["node", "src/server.js"]
