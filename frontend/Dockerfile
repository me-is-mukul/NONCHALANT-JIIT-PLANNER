FROM node:18-alpine AS build

WORKDIR /app

# Accept build args for API base URLs and export them as env vars for Vite
ARG VITE_NODE_API
ARG VITE_PY_API
ENV VITE_NODE_API=${VITE_NODE_API}
ENV VITE_PY_API=${VITE_PY_API}

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
# Build the production assets (Vite will inline VITE_ vars)
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# override default nginx config with our proxy rules
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
