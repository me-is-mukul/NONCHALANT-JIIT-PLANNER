FROM node:18-alpine

WORKDIR /app

# install dependencies
COPY package.json package-lock.json* ./
RUN npm install --production || npm install

# copy source
COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]
