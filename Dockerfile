# Use the latest LTS version of Node.js as the base image
FROM node:lts-alpine

# Set the working directory to /opt/app
WORKDIR /opt/app/server

# Copy the project files into the container
COPY --chown=node:node . .

# Install npm packages
RUN npm install && \
    npm install -g npm@latest && \
    npx browserslist@latest --update-db && \
    npm audit fix --force

# Build the project
RUN npm run build

# Prune unnecessary dependencies
RUN npm prune --production

# Set the production environment variable
ENV NODE_ENV production

# Expose the port your app runs on
EXPOSE 8000

# Run the app using node user
USER node

# Start the application
CMD ["node", "./dist/bundle.js"]
