FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
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

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

ENTRYPOINT ["dotnet", "WebApi.Api.dll"]