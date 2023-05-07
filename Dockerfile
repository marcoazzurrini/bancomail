# Use the official Node.js base image
FROM node:18

# Set the working directory
WORKDIR /usr/src

# Install pnpm
RUN npm install -g pnpm

# Copy package.json, package-lock.json, and pnpm-lock.yaml
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the application code
COPY . .

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["pnpm", "start"]

