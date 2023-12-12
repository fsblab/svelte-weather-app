# —- Build Stage —-
FROM node:14 AS builder

# Specify the working directory
WORKDIR /app

# Copy package.json and package-lock.json for utilising Docker cache
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy local files to the app folder
COPY . ./app

# Build app
RUN npm run build

# —- Production Stage —-
FROM nginx:1.19-alpine AS production

# Copy build folder from build stage to nginx
COPY –from=builder /app /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD [“nginx”, “-g”, “daemon off;”]
