FROM node:14.17.3-stretch-slim as builder
LABEL stage=builder

WORKDIR /app
COPY . .
RUN rm -rf node_modules
RUN rm -rf dist
RUN npm install
RUN npm run build

# production stage
FROM caddy:alpine
COPY --from=builder /app/dist /usr/share/caddy
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80