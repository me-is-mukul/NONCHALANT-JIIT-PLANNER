# ---------- Base image ----------
FROM node:20-alpine

# ---------- Install Python ----------
RUN apk add --no-cache python3 py3-pip

WORKDIR /app

# ---------- Copy everything ----------
COPY . .

# ---------- Backend (Node) ----------
WORKDIR /app/backend
RUN npm install

# ---------- Backend (Python / FastAPI) ----------
RUN pip3 install --no-cache-dir -r requirements.txt

# ---------- Frontend ----------
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# ---------- Nginx ----------
RUN apk add --no-cache nginx
COPY frontend/nginx.conf /etc/nginx/nginx.conf

# ---------- Expose ----------
EXPOSE 80

# ---------- Start everything ----------
CMD sh -c "\
node /app/backend/server.js & \
python3 /app/backend/server.py & \
nginx -g 'daemon off;'"
