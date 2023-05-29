# Use node v18 docker image
FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci

# Build application
RUN npm run build

# Remove dev-dependencies
RUN npm ci --only=production && npm cache clean --force 

# Expose port 3000
EXPOSE 3000

CMD [ "node", "dist/main" ]
