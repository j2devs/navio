# 🚀 Navio Deployment Guide

This guide explains how to run the Navio application using either Docker Compose or Kubernetes.

## 📋 Prerequisites

### Required Software
- **Docker Desktop** (with Kubernetes enabled for K8s deployment)
- **Git** (to clone the repository)
- **Bash** (for running scripts)

### Enable Kubernetes in Docker Desktop
1. Open Docker Desktop
2. Go to Settings → Kubernetes
3. Check "Enable Kubernetes"
4. Click "Apply & Restart"

## 🔧 Initial Setup

### 1. Create Environment File

Copy the example environment file and update with your values:

```bash
cp .env.example .env
```

Edit `.env` and set your values:
- `POSTGRES_USER`: Database username
- `POSTGRES_PASSWORD`: Database password
- `POSTGRES_DB`: Database name
- `SPRING_RABBITMQ_USERNAME`: RabbitMQ username (default: guest)
- `SPRING_RABBITMQ_PASSWORD`: RabbitMQ password (default: guest)
- `VITE_MAPBOX_ACCESS_KEY`: Your Mapbox API key

### 2. Make Scripts Executable

```bash
chmod +x scripts/*.sh
```

## 🐳 Docker Compose Deployment

### Start Services

```bash
./scripts/start-docker.sh
```

This will:
- Check for conflicts with Kubernetes
- Start all services (frontend, backend, database)
- Show service status and access URLs

### Access the Application

- **Frontend**: http://localhost
- **Backend**: http://localhost:8080
- **Database**: localhost:5432
- **RabbitMQ AMQP**: localhost:5672
- **RabbitMQ Management UI**: http://localhost:15672 (guest/guest)

### Useful Commands

```bash
# View logs
cd docker && docker-compose --profile dev logs -f

# Stop services
cd docker && docker-compose --profile dev down

# Restart a specific service
cd docker && docker-compose --profile dev restart backend

# View running containers
docker-compose --profile dev ps
```

### Data Persistence

- Database data is stored in the `navio_postgres_data_dev` volume
- RabbitMQ data is stored in the `navio_rabbitmq_data_dev` volume
- Both persist between restarts

## ☸️ Kubernetes Deployment

### Start Services

```bash
./scripts/start-k8s.sh
```

This will:
- Check for conflicts with Docker Compose
- Create namespace and ConfigMap
- Deploy all services
- Wait for pods to be ready
- Show access information

### Access the Application

- **Frontend**: http://localhost (via LoadBalancer)
- **Backend**: Use port-forward:
  ```bash
  kubectl port-forward -n navio-dev svc/navio-backend 8080:8080
  ```
- **RabbitMQ Management UI**: Use port-forward:
  ```bash
  kubectl port-forward -n navio-dev svc/rabbitmq 15672:15672
  ```

### Useful Commands

```bash
# View all pods
kubectl get pods -n navio-dev

# Watch pod status
kubectl get pods -n navio-dev -w

# View logs for a specific pod
kubectl logs -n navio-dev -l app=navio-backend -f

# View all services
kubectl get services -n navio-dev

# Describe a pod (for debugging)
kubectl describe pod -n navio-dev <pod-name>

# Access backend API
kubectl port-forward -n navio-dev svc/navio-backend 8080:8080

# Delete all resources
kubectl delete -f kubernetes/deployment.yaml
```

### Scaling Services

```bash
# Scale backend
kubectl scale deployment navio-backend -n navio-dev --replicas=3

# Scale frontend
kubectl scale deployment navio-frontend -n navio-dev --replicas=2
```

### Data Persistence

- Database data is stored in a PersistentVolumeClaim (2Gi)
- RabbitMQ data is stored in a PersistentVolumeClaim (1Gi)
- Both persist between pod restarts

## 🛑 Stop All Services

To stop both Docker Compose and Kubernetes services:

```bash
./scripts/stop-all.sh
```

This will:
- Stop Docker Compose services if running
- Stop Kubernetes deployments if running
- Optionally delete ConfigMap
- Show final status

## 🔄 Switching Between Environments

### From Docker Compose to Kubernetes

```bash
cd docker && docker-compose --profile dev down
./scripts/start-k8s.sh
```

### From Kubernetes to Docker Compose

```bash
kubectl delete -f kubernetes/deployment.yaml
./scripts/start-docker.sh
```

### Using the stop-all script

```bash
./scripts/stop-all.sh
# Then start the environment you want
./scripts/start-docker.sh  # OR ./scripts/start-k8s.sh
```

## ⚠️ Common Issues

### Port Conflicts

**Problem**: Services fail to start due to port conflicts

**Ports used**:
- 80 (Frontend)
- 8080 (Backend)
- 5432 (PostgreSQL)
- 5672 (RabbitMQ AMQP)
- 15672 (RabbitMQ Management)

**Solution**: Make sure only one environment is running at a time
```bash
./scripts/stop-all.sh
```

### Kubernetes Pods Not Starting

**Problem**: Pods stuck in `Pending` or `CrashLoopBackOff`

**Solution**: Check pod logs
```bash
kubectl describe pod -n navio-dev <pod-name>
kubectl logs -n navio-dev <pod-name>
```

### ConfigMap Issues

**Problem**: Backend can't connect to database

**Solution**: Recreate ConfigMap
```bash
kubectl delete configmap app-config -n navio-dev
kubectl create configmap app-config --from-env-file=.env -n navio-dev
kubectl rollout restart deployment -n navio-dev
```

### Database Connection Failed

**Problem**: Backend can't connect to PostgreSQL

**Solution**:
- Check if database pod is running
- Verify environment variables in `.env`
- For Docker Compose: `docker-compose --profile dev logs db`
- For Kubernetes: `kubectl logs -n navio-dev -l app=postgres`

### RabbitMQ Connection Failed

**Problem**: Backend can't connect to RabbitMQ

**Solution**:
- Check if RabbitMQ pod is running
- Verify credentials in `.env`
- For Docker Compose: `docker-compose --profile dev logs rabbitmq`
- For Kubernetes: `kubectl logs -n navio-dev -l app=rabbitmq`
- Access management UI to verify: http://localhost:15672

### Images Not Found (Kubernetes)

**Problem**: Kubernetes can't pull images from GHCR

**Solution**: Build and push images first, or change `imagePullPolicy` to `Never` for local images
```yaml
imagePullPolicy: Never  # Use local images only
```

## 📊 Monitoring

### Docker Compose

```bash
# View resource usage
docker stats

# View all logs
cd docker && docker-compose --profile dev logs -f

# View specific service logs
cd docker && docker-compose --profile dev logs -f backend
```

### Kubernetes

```bash
# View resource usage
kubectl top pods -n navio-dev

# View all events
kubectl get events -n navio-dev --sort-by='.lastTimestamp'

# View deployment status
kubectl rollout status deployment/navio-backend -n navio-dev
```

## 🔐 Security Notes

### Production Considerations

1. **Never commit `.env` file** - It's in `.gitignore`
2. **Use Secrets for sensitive data** in Kubernetes:
   ```bash
   kubectl create secret generic app-secrets \
     --from-literal=postgres-password=your-password \
     -n navio-dev
   ```
3. **Change default passwords** in production
4. **Use proper SSL/TLS** certificates for HTTPS
5. **Limit resource access** with proper RBAC in Kubernetes

## 🎯 Best Practices

### Development Workflow

1. **Use Docker Compose** for daily development
    - Faster startup/shutdown
    - Easier to view logs
    - Simple to restart individual services

2. **Use Kubernetes** for:
    - Testing production-like environment
    - Testing scaling behavior
    - Testing health checks and probes
    - Pre-deployment validation

### CI/CD Integration

The GitHub Actions workflow automatically:
- Builds frontend and backend
- Runs tests and linting
- Creates Docker images
- Pushes to GitHub Container Registry

Images are tagged with:
- Branch name (e.g., `main`, `dev`, `fix`)
- Commit SHA
- `latest` tag

## 📁 Project Structure

```
.
├── backend/              # Spring Boot backend
├── frontend/             # React frontend
├── docker/
│   ├── Dockerfile        # Multi-stage Dockerfile
│   └── docker-compose.yml # With RabbitMQ support
├── kubernetes/
│   ├── namespace.yaml
│   └── deployment.yaml   # All K8s resources (DB, RabbitMQ, Backend, Frontend)
├── scripts/
│   ├── start-docker.sh   # Start with Docker Compose
│   ├── start-k8s.sh      # Start with Kubernetes
│   └── stop-all.sh       # Stop everything
├── .env.example          # Environment template
└── .env                  # Your environment (gitignored)
```

## 🆘 Getting Help

If you encounter issues:

1. Check the logs (see commands above)
2. Verify `.env` file has correct values
3. Ensure Docker Desktop is running
4. For Kubernetes, ensure it's enabled in Docker Desktop
5. Try `./scripts/stop-all.sh` and start fresh

## 📝 Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Desktop Kubernetes](https://docs.docker.com/desktop/kubernetes/)

---

**Happy Deploying! 🚀**