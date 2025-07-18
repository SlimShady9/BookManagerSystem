FROM node:22.17.1-alpine AS builder

WORKDIR /app


COPY package.json ./
COPY package-lock.json ./

RUN npm i

COPY . .


RUN npm run build


FROM nginx:1.25-alpine AS runner


COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html


EXPOSE 3000

# Command to start Nginx in the foreground.
# 'daemon off;' ensures Nginx runs as the main process, which is required for Docker containers.
CMD ["nginx", "-g", "daemon off;"]
