# Gunakan image Node.js sebagai base image
FROM node:16 AS build

# Set working directory di dalam container
WORKDIR /app

# Copy file package.json dan package-lock.json (atau yarn.lock) untuk menginstall dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file source code ke dalam container
COPY . .

# Build aplikasi React untuk production
RUN npm run build

# Gunakan image Nginx untuk men-serve build folder
FROM nginx:alpine

# Copy hasil build dari tahap sebelumnya ke dalam folder yang sesuai di Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 untuk akses ke aplikasi React
EXPOSE 80

# Jalankan Nginx di container
CMD ["nginx", "-g", "daemon off;"]
