# postgresql_en_docker

Tarea de la Semana 3: levantar Postgres en Docker y hacer el esquema con Drizzle.

## Que hace este proyecto

- Levanta una base de datos Postgres 17 con Docker Compose.
- Define el esquema (`usuarios` y `proyectos`) en `src/db/schema.ts`.
- Genera y aplica la migracion con Drizzle Kit.
- Siembra datos de prueba con `src/db/seed.ts`.
- Tiene un repositorio (`UsuarioRepository`) y un servicio (`UsuariosService`) que
  habla con la base a traves del repositorio, no directamente.

## Como correrlo

1. Levantar la base de datos:

```
docker compose up -d
```

2. Instalar dependencias:

```
pnpm install
```

3. Generar y aplicar la migracion:

```
pnpm db:generate
pnpm db:migrate
```

4. Sembrar los datos de prueba:

```
pnpm db:seed
```

5. Correr el ejemplo del servicio con el repositorio:

```
pnpm start
```

Tambien se puede abrir Drizzle Studio con `pnpm db:studio` para ver las tablas.
