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

FROM base AS release

WORKDIR /app

# If additional files are required, they can be copied from the builder layer to the release layer.
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD [ "node", "dist/main" ]
