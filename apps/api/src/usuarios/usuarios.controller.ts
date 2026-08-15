import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  ParseUUIDPipe,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { UsuariosService } from './usuarios.service';
import { ZodPipe } from '../common/zod.pipe';
import { crearUsuario, actualizarUsuario, listarUsuarios } from '@flowcommerce/contracts';
import type { CrearUsuario, ActualizarUsuario, ListarUsuarios } from '@flowcommerce/contracts';

@Controller({ path: 'usuarios', version: '1' })
export class UsuariosController {
  constructor(private readonly svc: UsuariosService) {}

  @Get()
  listar(@Query(new ZodPipe(listarUsuarios)) q: ListarUsuarios) {
    return this.svc.listar(q);
  }

  @Post()
  @HttpCode(201)
  async crear(
    @Body(new ZodPipe(crearUsuario)) dto: CrearUsuario,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.svc.crear(dto);
    res.setHeader('Location', `/api/v1/usuarios/${user.id}`);
    return user;
  }

  @Get(':id')
  buscar(@Param('id', ParseUUIDPipe) id: string) {
    return this.svc.buscar(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodPipe(actualizarUsuario)) dto: ActualizarUsuario,
  ) {
    return this.svc.actualizar(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  borrar(@Param('id', ParseUUIDPipe) id: string) {
    return this.svc.borrar(id);
  }
}
