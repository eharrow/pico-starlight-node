# syntax=docker/dockerfile:1

FROM balenalib/armv7hf-alpine-node:18-3.17 AS build
ENV NODE_ENV=production
WORKDIR /app
COPY . .
RUN npm install --omit=dev && npm run build

# -------------------------------------
FROM build
COPY --from=build . .
CMD ["node", "index.js"]
