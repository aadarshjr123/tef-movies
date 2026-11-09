# Build context: the repository root.
#   docker build -f client/Dockerfile --build-arg VITE_API_URL=https://api.example.com/graphql -t tef-movies-web .

FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY server/package.json server/
COPY client/package.json client/
RUN npm ci --workspace client --include-workspace-root=false
COPY client client
ARG VITE_API_URL=http://localhost:4000/graphql
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build --workspace client

FROM nginx:1.27-alpine
COPY client/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/client/dist /usr/share/nginx/html
EXPOSE 80
