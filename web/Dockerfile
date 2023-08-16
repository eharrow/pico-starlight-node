# syntax=docker/dockerfile:1

FROM balenalib/armv7hf-alpine-node
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
CMD ["node", "server.js"]
