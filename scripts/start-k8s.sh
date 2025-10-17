#!/bin/bash

# Renkli output için
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║         ☸️  Starting Navio with Kubernetes           ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════╝${NC}"
echo ""

# .env dosyası kontrolü
if [ ! -f docker/.env ]; then
    echo -e "${RED}❌ Error: docker/.env file not found!${NC}"
    echo -e "${YELLOW}💡 Please ensure the .env file exists inside the 'docker' directory.${NC}"
    exit 1
fi

# Kubernetes cluster kontrolü
echo -e "${YELLOW}🔍 Checking Kubernetes cluster...${NC}"
if ! kubectl cluster-info &>/dev/null; then
    echo -e "${RED}❌ Kubernetes cluster is not running!${NC}"
    echo -e "${YELLOW}💡 Please enable Kubernetes in Docker Desktop:${NC}"
    echo "   Settings -> Kubernetes -> Enable Kubernetes"
    exit 1
fi
echo -e "${GREEN}✅ Kubernetes cluster is running${NC}"
echo ""

# Docker Compose kontrolü
echo -e "${YELLOW}🔍 Checking if Docker Compose services are running...${NC}"
if docker ps --format '{{.Names}}' | grep -q "navio-.*-dev"; then
    echo -e "${RED}⚠️  Warning: Docker Compose containers are running!${NC}"
    echo -e "${YELLOW}📍 Port conflicts may occur (80, 8080, 5432)${NC}"
    echo ""
    read -p "Do you want to stop Docker Compose services first? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}🛑 Stopping Docker Compose services...${NC}"
        cd docker && docker-compose --profile dev down && cd ..
        echo -e "${GREEN}✅ Docker Compose stopped${NC}"
        echo ""
    fi
fi

# Yerel imajları oluştur/güncelle
echo -e "${YELLOW}🏗️  Building local images for Kubernetes...${NC}"
echo -e "${BLUE}This might take a moment...${NC}"

# ÖNEMLI: Docker Desktop Kubernetes için image'ları doğru context'e build et
eval $(minikube docker-env 2>/dev/null) || true

docker build --target backend-runtime -t navio-backend:latest -f docker/Dockerfile .
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Backend image build failed!${NC}"
    exit 1
fi

docker build --target frontend-nginx -t navio-frontend:latest -f docker/Dockerfile .
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Frontend image build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Images built successfully${NC}"

# Image'ların varlığını kontrol et
echo -e "${YELLOW}🔍 Verifying images...${NC}"
if ! docker images | grep -q "navio-backend.*latest"; then
    echo -e "${RED}❌ Backend image not found!${NC}"
    exit 1
fi
if ! docker images | grep -q "navio-frontend.*latest"; then
    echo -e "${RED}❌ Frontend image not found!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Images verified${NC}"
echo ""

# Namespace oluştur
echo -e "${YELLOW}📦 Creating namespace...${NC}"
kubectl apply -f kubernetes/namespace.yaml
echo ""

# Mevcut deployment'ları temizle (varsa)
echo -e "${YELLOW}🧹 Cleaning up old deployments...${NC}"
kubectl delete -f kubernetes/deployment.yaml --ignore-not-found=true
sleep 5
echo ""

# ConfigMap oluştur/güncelle
echo -e "${YELLOW}🔧 Creating/updating ConfigMap...${NC}"
kubectl delete configmap app-config -n navio-dev --ignore-not-found=true
kubectl create configmap app-config --from-env-file=docker/.env -n navio-dev

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ ConfigMap created successfully${NC}"
else
    echo -e "${RED}❌ Failed to create ConfigMap!${NC}"
    exit 1
fi
echo ""

# Deployment'ları uygula
echo -e "${YELLOW}🚀 Applying deployments...${NC}"
kubectl apply -f kubernetes/deployment.yaml

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Deployments applied successfully${NC}"
else
    echo -e "${RED}❌ Failed to apply deployments!${NC}"
    exit 1
fi
echo ""

# Pod'ların hazır olmasını bekle
echo -e "${YELLOW}⏳ Waiting for pods to be ready...${NC}"
echo -e "${BLUE}This may take a few minutes...${NC}"
echo ""

# Her pod için ayrı ayrı kontrol et
echo -e "${YELLOW}Waiting for PostgreSQL...${NC}"
if kubectl wait --for=condition=ready pod -l app=postgres -n navio-dev --timeout=120s; then
    echo -e "${GREEN}✅ PostgreSQL is ready${NC}"
else
    echo -e "${RED}❌ PostgreSQL failed to start${NC}"
    kubectl logs -n navio-dev -l app=postgres --tail=50
fi

echo -e "${YELLOW}Waiting for RabbitMQ...${NC}"
if kubectl wait --for=condition=ready pod -l app=rabbitmq -n navio-dev --timeout=120s; then
    echo -e "${GREEN}✅ RabbitMQ is ready${NC}"
else
    echo -e "${RED}❌ RabbitMQ failed to start${NC}"
    kubectl logs -n navio-dev -l app=rabbitmq --tail=50
fi

echo -e "${YELLOW}Waiting for Backend...${NC}"
if kubectl wait --for=condition=ready pod -l app=backend -n navio-dev --timeout=300s; then
    echo -e "${GREEN}✅ Backend is ready${NC}"
else
    echo -e "${RED}❌ Backend failed to start${NC}"
    echo -e "${YELLOW}📋 Pod status:${NC}"
    kubectl get pods -n navio-dev -l app=navio-backend
    echo -e "${YELLOW}📋 Pod events:${NC}"
    kubectl describe pod -n navio-dev -l app=navio-backend | grep -A 10 "Events:"
    echo -e "${YELLOW}📋 Recent logs:${NC}"
    kubectl logs -n navio-dev -l app=navio-backend --tail=50
fi

echo -e "${YELLOW}Waiting for Frontend...${NC}"
if kubectl wait --for=condition=ready pod -l app=frontend -n navio-dev --timeout=180s; then
    echo -e "${GREEN}✅ Frontend is ready${NC}"
else
    echo -e "${RED}❌ Frontend failed to start${NC}"
    echo -e "${YELLOW}📋 Pod status:${NC}"
    kubectl get pods -n navio-dev -l app=navio-frontend
    echo -e "${YELLOW}📋 Pod events:${NC}"
    kubectl describe pod -n navio-dev -l app=navio-frontend | grep -A 10 "Events:"
    echo -e "${YELLOW}📋 Recent logs:${NC}"
    kubectl logs -n navio-dev -l app=navio-frontend --tail=50
fi

# Tüm pod'ların durumunu kontrol et
ALL_READY=$(kubectl get pods -n navio-dev --no-headers 2>/dev/null | awk '{print $2}' | grep -v "1/1" | wc -l)

if [ "$ALL_READY" -eq 0 ]; then
    echo ""
    echo -e "${GREEN}╔══════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║         ✅ All services are ready!                   ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════╝${NC}"
    echo ""

    # Pod durumlarını göster
    echo -e "${BLUE}📦 Pod Status:${NC}"
    kubectl get pods -n navio-dev
    echo ""

    # Service'leri göster
    echo -e "${BLUE}🌐 Services:${NC}"
    kubectl get services -n navio-dev
    echo ""

    # Frontend URL'ini al
    FRONTEND_URL=$(kubectl get service frontend -n navio-dev -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>/dev/null)
    if [ -z "$FRONTEND_URL" ]; then
        FRONTEND_URL="localhost"
    fi

    echo -e "${BLUE}🌐 Access URLs:${NC}"
    echo -e "  Frontend:        ${GREEN}http://${FRONTEND_URL}${NC}"
    echo -e "  Backend:         ${GREEN}Use port-forward: kubectl port-forward -n navio-dev svc/backend 8080:8080${NC}"
    echo -e "  RabbitMQ Admin:  ${GREEN}Use port-forward: kubectl port-forward -n navio-dev svc/rabbitmq 15672:15672${NC}"
    echo ""

    echo -e "${BLUE}📊 Useful commands:${NC}"
    echo -e "  View logs:           ${YELLOW}kubectl logs -n navio-dev -l app=<app-name> -f${NC}"
    echo -e "  Get pods:            ${YELLOW}kubectl get pods -n navio-dev${NC}"
    echo -e "  Describe pod:        ${YELLOW}kubectl describe pod -n navio-dev <pod-name>${NC}"
    echo -e "  Port forward:        ${YELLOW}kubectl port-forward -n navio-dev svc/<service> <local-port>:<service-port>${NC}"
    echo -e "  Delete deployment:   ${YELLOW}kubectl delete -f kubernetes/deployment.yaml${NC}"
    echo ""

    echo -e "${YELLOW}💡 Tip: Use 'kubectl get pods -n navio-dev -w' to watch pod status${NC}"
else
    echo ""
    echo -e "${RED}❌ Some pods failed to become ready!${NC}"
    echo ""
    echo -e "${YELLOW}📋 Current pod status:${NC}"
    kubectl get pods -n navio-dev
    echo ""
    echo -e "${YELLOW}💡 Troubleshooting commands:${NC}"
    echo -e "  Check pod details:   ${YELLOW}kubectl describe pod -n navio-dev <pod-name>${NC}"
    echo -e "  Check pod logs:      ${YELLOW}kubectl logs -n navio-dev <pod-name>${NC}"
    echo -e "  Check events:        ${YELLOW}kubectl get events -n navio-dev --sort-by='.lastTimestamp'${NC}"
    exit 1
fi