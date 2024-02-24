FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package.json .
RUN npm install --production
COPY . .
EXPOSE 3006
ENV PORT = 3006
ENV DB_URL = 'production db url'
# RUN chown -R node /usr/src/app
# USER node
CMD ["npm", "start"]
