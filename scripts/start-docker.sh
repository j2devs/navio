#!/bin/bash

# Renkli output için
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║       🐳 Starting Navio with Docker Compose          ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════╝${NC}"
echo ""

# .env dosyası kontrolü
if [ ! -f docker/.env ]; then
    echo -e "${RED}❌ Error: docker/.env file not found!${NC}"
    echo -e "${YELLOW}💡 Please make sure the .env file is inside the 'docker' directory.${NC}"
    exit 1
fi

# Kubernetes'in çalışıp çalışmadığını kontrol et
echo -e "${YELLOW}🔍 Checking if Kubernetes is running...${NC}"
if kubectl get nodes &>/dev/null; then
    kubectl get pods -n navio-dev &>/dev/null
    if [ $? -eq 0 ]; then
        echo -e "${RED}⚠️  Warning: Kubernetes navio-dev namespace is active!${NC}"
        echo -e "${YELLOW}📍 Port conflicts may occur (80, 8080, 5432)${NC}"
        echo ""
        read -p "Do you want to stop Kubernetes deployments first? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo -e "${YELLOW}🛑 Stopping Kubernetes deployments...${NC}"
            kubectl delete -f kubernetes/deployment.yaml --ignore-not-found=true
            echo -e "${GREEN}✅ Kubernetes stopped${NC}"
            echo ""
        fi
    fi
fi

# Docker Compose'u başlat
echo -e "${GREEN}🚀 Starting services with Docker Compose...${NC}"
echo ""

# docker-compose.yml ve .env dosyasının yolunu belirterek çalıştır
docker-compose -f docker/docker-compose.yml --env-file docker/.env --profile dev up --build -d

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}╔══════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║              ✅ Services started successfully!        ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${BLUE}📦 Running containers:${NC}"
    docker-compose -f docker/docker-compose.yml --profile dev ps
    echo ""
    echo -e "${BLUE}🌐 Access URLs:${NC}"
    echo -e "  Frontend:        ${GREEN}http://localhost${NC}"
    echo -e "  Backend:         ${GREEN}http://localhost:8080${NC}"
    echo -e "  Database:        ${GREEN}localhost:5432${NC}"
    echo -e "  RabbitMQ AMQP:   ${GREEN}localhost:5672${NC}"
    echo -e "  RabbitMQ Admin:  ${GREEN}http://localhost:15672${NC} (user: guest, pass: guest)"
    echo ""
    echo -e "${BLUE}📊 Useful commands:${NC}"
    echo -e "  View logs:        ${YELLOW}docker-compose -f docker/docker-compose.yml --profile dev logs -f${NC}"
    echo -e "  Stop services:    ${YELLOW}docker-compose -f docker/docker-compose.yml --profile dev down${NC}"
    echo -e "  Restart service:  ${YELLOW}docker-compose -f docker/docker-compose.yml --profile dev restart <service>${NC}"
    echo ""
    echo -e "${YELLOW}💡 Tip: Use 'docker-compose --profile dev logs -f' to follow logs${NC}"
else
    echo ""
    echo -e "${RED}❌ Failed to start services!${NC}"
    echo -e "${YELLOW}Please check the error messages above.${NC}"
    exit 1
fi