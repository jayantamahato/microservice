FROM node:18-alpine
WORKDIR /usr/src/app/cart
COPY package*.json ./
RUN npm install
COPY . . 
EXPOSE 3003