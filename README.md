# postgresql_en_docker

Tarea de la Semana 4: contratos con Zod, API REST versionada, router de tRPC y documentación con OpenAPI.

## Que hace este proyecto

- Paquete compartido de contratos (`packages/contracts`) con esquemas y tipos inferidos con Zod.
- API REST en NestJS bajo `/api/v1/usuarios` con validación en la frontera mediante `ZodPipe`.
- 5 endpoints REST (listar paginado, crear 201, buscar por id 404, actualizar y borrar 204).
- Router de tRPC con consultas (`listar`, `porId`) y mutación (`crear`).
- Documentación Swagger en `/docs` y exportación automática de `openapi.json`.
- Base de datos Postgres en Docker gestionada con Drizzle ORM.

## Como correrlo

1. Levantar la base de datos:

```bash
docker compose up -d
