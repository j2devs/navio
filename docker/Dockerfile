# Backend Build Stage
FROM maven:3.9.6-eclipse-temurin-21 AS backend-build
WORKDIR /app
# Copy the backend project files
COPY backend/pom.xml .
COPY backend/mvnw .
COPY backend/mvnw.cmd .
COPY backend/.mvn ./.mvn
COPY backend/src ./src
# Build the application
RUN ./mvnw package -DskipTests

# Backend Runtime Stage
FROM eclipse-temurin:21-jre-jammy AS backend-runtime
WORKDIR /app
# Copy the jar file from the build stage
COPY --from=backend-build /app/target/*.jar app.jar
EXPOSE 8080
# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

# Frontend Build Stage
FROM node:22 AS frontend-build
WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend/. .

ARG VITE_MAPBOX_ACCESS_KEY
ENV VITE_MAPBOX_ACCESS_KEY=$VITE_MAPBOX_ACCESS_KEY

RUN npm run build

# Frontend Runtime Stage (Nginx)
FROM nginx:stable-alpine AS frontend-nginx
COPY --from=frontend-build /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
