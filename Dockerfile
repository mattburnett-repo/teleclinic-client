# FROM node:20-slim
# 
# RUN corepack enable
# 
# WORKDIR /app
# 
# COPY package.json yarn.lock ./
# # COPY apps/frontend/package.json ./apps/frontend/
# RUN yarn install
# 
# COPY . .
# 
# WORKDIR /app/apps/frontend
# CMD ["yarn", "dev"] 

FROM node:20-slim

# Enable corepack
RUN corepack enable

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock from the frontend directory
COPY apps/frontend/package.json apps/frontend/yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY apps/frontend .

# Specify the command to run the application
CMD ["yarn", "dev"]