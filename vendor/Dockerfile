FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package.json .
RUN npm install --production
COPY . .
EXPOSE 3002
ENV PORT 3002
ENV DB_URL ='production database url'
# RUN chown -R node /usr/src/app
# USER node
CMD ["npm", "start"]
