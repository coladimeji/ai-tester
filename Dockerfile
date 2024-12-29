FROM node:16

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy source code
COPY . .

# Build frontend
RUN cd client && yarn install && yarn build

# Start the server
CMD ["yarn", "start"]