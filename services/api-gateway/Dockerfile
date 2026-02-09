FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=development
ENV PORT=8080
ENV SERVICE_NAME=api-gateway

COPY . .

CMD ["node", "src/server.js"]
