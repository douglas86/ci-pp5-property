#Dockerfile for React
#Use official Node.js image as the base
FROM node:22.9.0-slim

#Set working directory
WORKDIR /app

#copy and install dependencies
COPY package.json .

RUN npm install

#Copy all project files
Copy . .

#Expose port 3000
EXPOSE 3000

#Start Nginx
CMD ["npm", "start"]
