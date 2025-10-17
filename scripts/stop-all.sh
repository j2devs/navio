#!/bin/bash

# Renkli output için
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║           🛑 Stopping All Navio Services             ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════╝${NC}"
echo ""

STOPPED_SOMETHING=false

# Docker Compose'u durdur
echo -e "${YELLOW}🔍 Checking Docker Compose services...${NC}"
if docker ps --format '{{.Names}}' | grep -q "navio-.*-dev"; then
    echo -e "${YELLOW}🛑 Stopping Docker Compose services...${NC}"
    cd docker && docker-compose --profile dev down && cd ..
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Docker Compose services stopped${NC}"
        STOPPED_SOMETHING=true
    else
        echo -e "${RED}❌ Failed to stop Docker Compose services${NC}"
    fi
else
    echo -e "${BLUE}ℹ️  No Docker Compose services running${NC}"
fi
echo ""

# Kubernetes'i durdur
echo -e "${YELLOW}🔍 Checking Kubernetes deployments...${NC}"
if kubectl get namespace navio-dev &>/dev/null; then
    if kubectl get pods -n navio-dev 2>/dev/null | grep -q "navio"; then
        echo -e "${YELLOW}🛑 Stopping Kubernetes deployments...${NC}"
        kubectl delete -f kubernetes/deployment.yaml --ignore-not-found=true
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Kubernetes deployments stopped${NC}"
            STOPPED_SOMETHING=true
        else
            echo -e "${RED}❌ Failed to stop Kubernetes deployments${NC}"
        fi

        # ConfigMap'i de temizle (opsiyonel)
        read -p "Do you want to delete the ConfigMap as well? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            kubectl delete configmap app-config -n navio-dev --ignore-not-found=true
            echo -e "${GREEN}✅ ConfigMap deleted${NC}"
        fi
    else
        echo -e "${BLUE}ℹ️  No Kubernetes pods running in navio-dev namespace${NC}"
    fi
else
    echo -e "${BLUE}ℹ️  Kubernetes namespace navio-dev not found${NC}"
fi
echo ""

# Özet
echo -e "${BLUE}╔══════════════════════════════════════════════════════╗${NC}"
if [ "$STOPPED_SOMETHING" = true ]; then
    echo -e "${GREEN}║           ✅ All services stopped successfully       ║${NC}"
else
    echo -e "${YELLOW}║           ℹ️  No services were running               ║${NC}"
fi
echo -e "${BLUE}╚══════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${BLUE}📊 Current status:${NC}"
echo ""

echo -e "${YELLOW}Docker Containers:${NC}"
docker ps --filter "name=navio" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" 2>/dev/null || echo "No containers running"
echo ""

if kubectl get namespace navio-dev &>/dev/null; then
    echo -e "${YELLOW}Kubernetes Pods:${NC}"
    kubectl get pods -n navio-dev 2>/dev/null || echo "No pods running"
else
    echo -e "${BLUE}Kubernetes namespace not active${NC}"
fi

echo ""
echo -e "${GREEN}✨ Cleanup complete!${NC}"