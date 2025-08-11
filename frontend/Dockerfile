### Stage 1: Build
FROM node:20.11.1 AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

### Stage 2: Serve
FROM nginx:1.25-alpine
COPY --from=builder /app/build /usr/share/nginx/html
# Remove default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf
# Copy custom nginx config to handle client-side routing
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]