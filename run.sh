#!/bin/bash

# Install dependencies
npm install

# Build the app
npm run build

# Install pm2 process manager
npm install -g pm2

# Start the app with pm2
pm2 start app.js