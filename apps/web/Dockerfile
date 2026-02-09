FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=development
ENV PORT=3000
ENV SERVICE_NAME=web

COPY . .

CMD ["sh", "-c", "npm install && npm run dev"]
