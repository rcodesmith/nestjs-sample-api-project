# Use Node.js LTS (Long Term Support) version as the base image
FROM node:22-bookworm

# Update package lists and install SQLite
#RUN apt-get update && apt-get install -y sqlite3

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]
