# Use Node.js LTS version
FROM node:16

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy source code
COPY . .

# Expose port
EXPOSE 4000

# Start server
CMD ["yarn", "start"]