# Navio - A Social Travel Platform

An intelligent travel planning platform that creates personalized itineraries with budget tracking, route optimization, and social sharing features.

---

## Tech Stack

| Area      | Technology                               |
|-----------|------------------------------------------|
| **Backend**   | Spring Boot 3 (Java 21), Spring Data JPA |
| **Frontend**  | React (Vite), TypeScript               |
| **Database**  | PostgreSQL                               |
| **Container** | Docker, Docker Compose                   |
| **Orchestration** | Kubernetes                             |
| **CI/CD**     | GitHub Actions                           |

---

## Project Structure

This project is a monorepo containing the backend, frontend, and configuration files.

- **`/backend`**: The Spring Boot application, following Clean Architecture principles.
- **`/frontend`**: The React (Vite) single-page application.
- **`/docker`**: Contains the `Dockerfile` for building both services and the `docker-compose.yml` for local development.
- **`/kubernetes`**: Contains the Kubernetes manifests for deployment (`deployment.yaml`, `namespace.yaml`).
- **`/nginx`**: Nginx configuration for serving the frontend.
- **`/.github`**: Contains the GitHub Actions workflow for CI/CD.

A detailed file structure can be found in `project_structure.txt`.

---

## Getting Started (Local Development)

To run the entire application stack locally, you need Docker and Docker Compose.

1.  **Create Environment File:**
    Copy the example environment file and fill in your details (passwords, tokens, etc.).
    ```bash
    cp .env.example .env
    ```

2.  **Run Docker Compose:**
    From the project root, run the following command. This will build the Docker images for the backend and frontend and start all services (backend, frontend, database).
    ```bash
    docker-compose -f docker/docker-compose.yml up --build
    ```

    - The frontend will be available at `http://localhost:80`.
    - The backend API will be available at `http://localhost:8080`.

---

## Deployment (Kubernetes)

The project is configured for deployment to a Kubernetes cluster.

1.  **Create Namespace:**
    ```bash
    kubectl apply -f kubernetes/namespace.yaml
    ```

2.  **Create ConfigMap:**
    Ensure your `.env` file is up-to-date, then create the ConfigMap in the cluster.
    ```bash
    kubectl create configmap app-config --from-env-file=.env -n navio-dev
    ```

3.  **Apply Deployments:**
    This will create the PostgreSQL, backend, and frontend deployments and services.
    ```bash
    kubectl apply -f kubernetes/deployment.yaml
    ```
    **Note:** Before applying, make sure to replace the placeholder image paths in `deployment.yaml` with your actual image paths from your container registry (e.g., `ghcr.io/your-username/navio-backend:latest`).

---

## CI/CD Pipeline

This project uses **GitHub Actions** for continuous integration and deployment.

- **On push to `main` or `dev` branches:** The workflow defined in `.github/workflows/ci.yml` is triggered.
- **Jobs:**
    1.  `build-backend`: Compiles and tests the Spring Boot application.
    2.  `build-frontend`: Lints and builds the React application.
    3.  `build-docker-images`: Builds the final Docker images for both backend and frontend and pushes them to GitHub Container Registry (`ghcr.io`).