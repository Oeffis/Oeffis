FROM node:18 AS base

# The builder layer will be used to build the application
FROM base AS builder

WORKDIR /app

# The dependencies will be cached unless package.json changes.
COPY package*.json ./
RUN npm ci

COPY . .

# And the release layer will be used to run the application.
# Only required files will be copied from the builder layer to the release layer.
RUN npm run build

FROM nginx:1.25.1 as release

WORKDIR /app

# If additional files are required, they can be copied from the builder layer to the release layer.
COPY --from=builder /app/dist ./www
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./docker/app.config.json ./www/config/config.json

EXPOSE 80
