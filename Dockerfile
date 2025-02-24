FROM node:20-slim

RUN corepack enable

WORKDIR /app

COPY package.json yarn.lock ./
# COPY apps/frontend/package.json ./apps/frontend/
RUN yarn install

COPY . .

WORKDIR /app/apps/frontend
CMD ["yarn", "dev"] 
