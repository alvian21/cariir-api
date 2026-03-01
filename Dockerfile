# ---- Base Setup ----
FROM node:22-alpine

WORKDIR /usr/src/app

# Only copy package.json (package-lock.json is intentionally omitted here or handled below if preferred)
COPY package*.json ./

# Install PM2 globally and install dependencies
RUN npm install -g pm2 && npm install

# Copy application source
COPY . .

# Expose the correct port
EXPOSE 7310

# Define the command to run the app using PM2
CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]