# Base image for the backend
FROM eclipse-temurin:21-jdk-alpine AS backend
WORKDIR /app
COPY backend /app
RUN ./gradlew build -x test

# Base image for the frontend
FROM node:24-alpine AS frontend
WORKDIR /app
COPY frontend /app
RUN rm -rf node_modules package-lock.json && npm install && npm rebuild && npm run build

# Base image for the database
FROM postgres:16-bullseye AS database
COPY backend/initdb /docker-entrypoint-initdb.d
CMD ["postgres"]

# Final image combining all services
FROM node:24-alpine
WORKDIR /app

# Copy backend, frontend, and database configurations
COPY --from=backend /app /app/backend
COPY --from=frontend /app /app/frontend
COPY --from=database /docker-entrypoint-initdb.d /app/initdb

# Install Java and bash
RUN apk add --no-cache bash openjdk21-jdk

# Expose ports for backend, frontend, and database
EXPOSE 8080 5173 5432

# Start backend and frontend
CMD ["sh", "-c", "./backend/gradlew -p ./backend bootRun & cd /app/frontend && npm run dev -- --host 0.0.0.0"]
