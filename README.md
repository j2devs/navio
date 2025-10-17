# Navio - A Social Travel Platform

Navio is an intelligent travel planning platform designed to help users create personalized itineraries with features like budget tracking, route optimization, and social sharing. This platform is perfect for travelers who want to plan their trips efficiently and share their experiences with a community of fellow adventurers.

---

## Features

- **Personalized Itinerary Creation:** Generate custom travel plans based on your interests, budget, and time constraints.
- **Budget Tracking:** Keep track of your expenses to stay within your budget.
- **Route Optimization:** Find the most efficient routes for your travels to save time and money.
- **Social Sharing:** Share your travel plans and experiences with friends and other travelers.
- **Community-Sourced Recommendations:** Discover new destinations and activities through recommendations from the Navio community.

---

## Tech Stack

| Area              | Technology                               |
| ----------------- | ---------------------------------------- |
| **Backend**       | Spring Boot 3 (Java 21), Spring Data JPA |
| **Frontend**      | React (Vite), TypeScript               |
| **Database**      | PostgreSQL                               |
| **Container**     | Docker, Docker Compose                   |
| **Orchestration** | Kubernetes                               |
| **CI/CD**         | GitHub Actions                           |

---

## Project Structure

This project is a monorepo that includes the backend, frontend, and all necessary configuration files.

- **`/backend`**: A Spring Boot application built following Clean Architecture principles.
- **`/frontend`**: A single-page application built with React (Vite).
- **`/docker`**: Contains the `Dockerfile` for building both services and a `docker-compose.yml` for local development.
- **`/kubernetes`**: Includes Kubernetes manifests for deployment (`deployment.yaml`, `namespace.yaml`).
- **`/nginx`**: Nginx configuration for serving the frontend.
- **`/.github`**: Contains the GitHub Actions workflow for CI/CD.
- **`/scripts`**: Includes helper scripts for managing the application (e.g., starting, stopping, deploying).

For a more detailed file structure, please refer to `project_structure.txt`.

---

## Getting Started (Local Development)

To run the entire application stack locally, you need to have Docker and Docker Compose installed.

1.  **Create Environment File:**
    Copy the example environment file and fill in your details (e.g., passwords, tokens).
    ```bash
    cp .env.example .env
    ```

2.  **Run Docker Compose:**
    From the project root, you can use the provided script to start all services. This will build the Docker images for the backend and frontend and start all necessary services (backend, frontend, database).
    ```bash
    ./scripts/start-docker.sh
    ```

    Alternatively, you can run Docker Compose manually:
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
    This command will create the PostgreSQL, backend, and frontend deployments and services.
    ```bash
    kubectl apply -f kubernetes/deployment.yaml
    ```
    **Note:** Before applying, make sure to replace the placeholder image paths in `deployment.yaml` with your actual image paths from your container registry (e.g., `ghcr.io/your-username/navio-backend:latest`).

You can also use the provided script to deploy the application:
```bash
./scripts/start-k8s.sh
```

---

## CI/CD Pipeline

This project uses **GitHub Actions** for continuous integration and deployment.

- **On push to `main` or `dev` branches:** The workflow defined in `.github/workflows/ci.yml` is triggered.
- **Jobs:**
    1.  `build-backend`: Compiles and tests the Spring Boot application.
    2.  `build-frontend`: Lints and builds the React application.
    3.  `build-docker-images`: Builds the final Docker images for both the backend and frontend and pushes them to GitHub Container Registry (`ghcr.io`).

---

## Contributing

We welcome contributions from the community! If you'd like to contribute, please follow these steps:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix.
3.  **Make your changes** and ensure they follow the project's coding style.
4.  **Write tests** for your changes.
5.  **Submit a pull request** with a clear description of your changes.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.
