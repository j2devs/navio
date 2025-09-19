FROM mcr.microsoft.com/dotnet/sdk:9.0 AS backend-build
WORKDIR /app

COPY backend/*.sln .
COPY backend/Core/WebApi.Application/*.csproj ./Core/WebApi.Application/
COPY backend/Core/WebApi.Domain/*.csproj ./Core/WebApi.Domain/
COPY backend/Infrastructure/WebApi.Infrastructure/*.csproj ./Infrastructure/WebApi.Infrastructure/
COPY backend/Infrastructure/WebApi.Persistence/*.csproj ./Infrastructure/WebApi.Persistence/
COPY backend/Presentation/WebApi.Api/*.csproj ./Presentation/WebApi.Api/

RUN dotnet restore

COPY backend/. .
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS backend-runtime
WORKDIR /app
COPY --from=backend-build /app/out .

ENTRYPOINT ["dotnet", "WebApi.Api.dll"]

FROM node:20 AS frontend-build
WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend/. .
RUN npm run build

FROM node:20 AS frontend-runtime
WORKDIR /app

COPY --from=frontend-build /app/dist /app/dist
COPY frontend/package*.json ./

RUN npm install serve

EXPOSE 5173

CMD ["npx", "serve", "-s", "dist", "-l", "5173"]