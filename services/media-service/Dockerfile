FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=development
ENV PORT=8082
ENV SERVICE_NAME=media-service

COPY . .

CMD ["node", "-e", "const http=require('http');const port=Number(process.env.PORT||8082);const name=process.env.SERVICE_NAME||'media-service';http.createServer((req,res)=>{res.setHeader('content-type','application/json');res.end(JSON.stringify({service:name,status:'ok'}));}).listen(port,'0.0.0.0');"]