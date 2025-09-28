#!/bin/bash

# ===============================================
# Navio Kubernetes Deployment Script
# ===============================================
# Usage: ./deploy.sh [branch-name]
# Example: ./deploy.sh dev

set -e  # Exit on any error

BRANCH_NAME=${1:-"latest"}
REPO_OWNER=${GITHUB_REPOSITORY_OWNER:-"your-github-username"}

echo "🚀 Deploying Navio to Kubernetes..."
echo "📦 Using images with tag: $BRANCH_NAME"
echo ""

# 1. Create namespace
echo "1️⃣ Creating namespace..."
kubectl apply -f kubernetes/namespace.yaml

# 2. Create ConfigMap from .env
echo "2️⃣ Creating ConfigMap from .env file..."
if [ ! -f ".env" ]; then
    echo "❌ .env file not found! Please create one from .env.example"
    exit 1
fi

kubectl create configmap app-config --from-env-file=.env -n navio-dev --dry-run=client -o yaml | kubectl apply -f -

# 3. Pull latest images (if using GitHub Registry)
if [ "$BRANCH_NAME" != "latest" ] && [ "$REPO_OWNER" != "your-github-username" ]; then
    echo "3️⃣ Pulling latest images..."
    docker pull ghcr.io/$REPO_OWNER/navio-backend:$BRANCH_NAME || echo "⚠️ Could not pull backend image, using local"
    docker pull ghcr.io/$REPO_OWNER/navio-frontend:$BRANCH_NAME || echo "⚠️ Could not pull frontend image, using local"
fi

# 4. Update deployment with correct image tags
echo "4️⃣ Updating deployment configuration..."
if [ "$BRANCH_NAME" != "latest" ] && [ "$REPO_OWNER" != "your-github-username" ]; then
    # Create temporary deployment file with updated images
    cp kubernetes/deployment.yaml temp-deployment.yaml
    sed -i.bak "s|navio-backend:v1.0.0|ghcr.io/$REPO_OWNER/navio-backend:$BRANCH_NAME|g" temp-deployment.yaml
    sed -i.bak "s|navio-frontend:v1.0.0|ghcr.io/$REPO_OWNER/navio-frontend:$BRANCH_NAME|g" temp-deployment.yaml
    DEPLOYMENT_FILE="temp-deployment.yaml"
else
    # Use original deployment file with local images
    DEPLOYMENT_FILE="kubernetes/deployment.yaml"
fi

# 5. Apply deployment
echo "5️⃣ Applying deployment..."
kubectl apply -f $DEPLOYMENT_FILE

# 6. Wait for deployment to complete
echo "6️⃣ Waiting for pods to be ready..."
kubectl wait --for=condition=ready pod -l app=postgres -n navio-dev --timeout=120s
kubectl wait --for=condition=ready pod -l app=navio-backend -n navio-dev --timeout=120s
kubectl wait --for=condition=ready pod -l app=navio-frontend -n navio-dev --timeout=120s

# 7. Show status
echo ""
echo "✅ Deployment complete!"
echo ""
echo "📊 Pod Status:"
kubectl get pods -n navio-dev

echo ""
echo "🌐 Service Status:"
kubectl get svc -n navio-dev

echo ""
echo "🎯 Access your application:"
FRONTEND_PORT=$(kubectl get svc navio-frontend -n navio-dev -o jsonpath='{.spec.ports[0].nodePort}')
if [ ! -z "$FRONTEND_PORT" ]; then
    echo "   Frontend: http://localhost:$FRONTEND_PORT"
else
    echo "   Frontend: Use port-forward -> kubectl port-forward svc/navio-frontend 8080:80 -n navio-dev"
fi

echo ""
echo "🔍 Useful commands:"
echo "   Logs: kubectl logs -f deployment/navio-backend -n navio-dev"
echo "   Shell: kubectl exec -it deployment/navio-backend -n navio-dev -- /bin/bash"
echo "   Delete: kubectl delete namespace navio-dev"

# Cleanup temporary files
if [ -f "temp-deployment.yaml" ]; then
    rm temp-deployment.yaml temp-deployment.yaml.bak 2>/dev/null || true
fi

echo ""
echo "🎉 Happy coding!"