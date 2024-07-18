# Used an official Node runtime as a parent image
FROM node:18.18.0-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the entire project directory to the working directory
COPY . .

ENV REACT_APP_BASE_URL='https://brewscout-rest.onrender.com/api/v1/'
ENV REACT_APP_ACCESS_TOKEN='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.22wh4VApyL16h91_FJ2u0qvSrICt-dYr0Mch1mMtNPo'



ENV GENERATE_SOURCEMAP=false;

# Build the React app
RUN npm install cross-env
RUN npm run build

# Install serve globally to serve the application
RUN npm install -g serve

# Set the command to run when the container starts
CMD ["serve", "-s", "build", "-l", "3000"]

# Expose port 3000 to the outside world
EXPOSE 3000
