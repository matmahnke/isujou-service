FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.0-buster AS build
WORKDIR /src
COPY ["iSujou.Api/iSujou.Api.csproj", "iSujou.Api/"]
COPY ["iSujou.Infra/iSujou.Infra.csproj", "iSujou.Infra/"]
COPY ["iSujou.Application/iSujou.Application.csproj", "iSujou.Application/"]
RUN dotnet restore "iSujou.Api/iSujou.Api.csproj"
COPY . .
WORKDIR "/src/iSujou.Api"
RUN dotnet build "iSujou.Api.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "iSujou.Api.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "iSujou.Api.dll"]