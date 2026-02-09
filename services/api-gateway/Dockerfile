FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=development
ENV PORT=8080
ENV SERVICE_NAME=api-gateway

COPY . .

CMD ["node", "-e", "const http=require('http');const port=Number(process.env.PORT||8080);const name=process.env.SERVICE_NAME||'api-gateway';http.createServer((req,res)=>{res.setHeader('content-type','application/json');res.end(JSON.stringify({service:name,status:'ok'}));}).listen(port,'0.0.0.0');"]