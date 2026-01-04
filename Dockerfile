FROM node:20-alpine

# Install python
RUN apk add --no-cache python3 py3-pip nginx

WORKDIR /app
COPY . .

# Backend (Node)
WORKDIR /app/backend
RUN npm install

# Backend (Python)
RUN pip3 install --no-cache-dir -r requirements.txt

# Frontend
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Nginx config
COPY frontend/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD sh -c "\
node /app/backend/server.js & \
python3 /app/backend/server.py & \
nginx -g 'daemon off;'"
