# Use nginx lightweight image
FROM nginx:alpine

# Copy project files to nginx html folder
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]