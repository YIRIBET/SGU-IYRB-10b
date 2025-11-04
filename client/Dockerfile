# ETAPA 1: Construcción
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Variables recibidas desde docker-compose
ARG API_HOST
ARG API_PORT
ARG API_BASE

ENV VITE_API_HOST=${API_HOST}
ENV VITE_API_PORT=${API_PORT}
ENV VITE_API_BASE=${API_BASE}

RUN npm run build

# ETAPA 2: Servir con NGINX
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]