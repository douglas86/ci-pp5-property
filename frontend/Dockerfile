#Dockerfile for React
#Use official Node.js image as the base
FROM node:22.9.0-slim as build

#Set working directory
WORKDIR /app

#copy and install dependencies
COPY package.json .
RUN npm install

#Copy all project files
Copy . .

#Build the app
RUN npm run build

#Use nginx to serve the static files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

#Expose port 80
EXPOSE 80

#Start Nginx
CMD ["nginx", "-g", "daemon off;"]