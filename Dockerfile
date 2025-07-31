# Use official Node.js image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the full app source
COPY . .

# Expose port
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
