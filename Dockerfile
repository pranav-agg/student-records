# Stage 1: Build the React application
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve assets with Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Revert to Nginx's default native entrypoint (remove our manual CMD overwrite)
CMD ["nginx", "-g", "daemon off;"]