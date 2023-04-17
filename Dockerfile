FROM node:18.15.0-alpine3.17 AS base

# install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# build
FROM base AS builder
RUN apk add --no-cache git
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# live
FROM nginx
COPY --from=builder /app/dist/ /usr/share/nginx/html/
