FROM node:16-alpine

WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
CMD ["node", "./dist/index.js"]