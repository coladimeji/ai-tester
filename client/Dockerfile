# Build stage
FROM node:16 as build

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy source code
COPY . .

# Build app
RUN yarn build

# Production stage
FROM nginx:alpine

# Copy build files
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]