# Step 1: Build the React frontend
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy the package.json and package-lock.json for frontend
COPY package*.json ./
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the frontend
RUN npm run build --prefix src

# Step 2: Set up the Express server
FROM node:18

# Set working directory
WORKDIR /app

# Copy the package.json and package-lock.json for backend (same as root)
COPY package*.json ./
RUN npm install

# Copy the entire project again to the working directory
COPY . .

# Copy the built React frontend to the server's public directory
COPY --from=build /app/src/build /app/src/server/public

# Expose the port the app runs on
EXPOSE 5000

# Command to run the server
CMD ["node", "src/server/server.js"]
