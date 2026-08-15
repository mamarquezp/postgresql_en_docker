import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import * as trpcExpress from '@trpc/server/adapters/express';
import { AppModule } from './app.module';
import { UsuariosService } from './usuarios/usuarios.service';
import { crearAppRouter } from './trpc/usuarios.router';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const usuariosService = app.get(UsuariosService);
  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({ router: crearAppRouter(usuariosService) }),
  );

  const config = new DocumentBuilder()
    .setTitle('API de Usuarios')
    .setDescription('Endpoints del módulo validados con Zod')
    .setVersion('1.0')
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, doc);

  // Exportar openapi.json para Postman/Bruno y CI
  writeFileSync('openapi.json', JSON.stringify(doc, null, 2));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
