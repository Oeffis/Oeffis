FROM node:18 AS base

# The builder layer will be used to build the application
FROM base AS builder

WORKDIR /app

# The dependencies will be cached unless package.json changes.
COPY package*.json ./
RUN npm ci

COPY . .

ENTRYPOINT npm run mocks-server -- --no-plugins.inquirerCli.enabled

EXPOSE 3100
EXPOSE 3110
