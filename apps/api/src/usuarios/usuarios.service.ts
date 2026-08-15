import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UsuariosRepository } from './usuarios.repository';
import { CrearUsuario, ActualizarUsuario, ListarUsuarios } from '@flowcommerce/contracts';

@Injectable()
export class UsuariosService {
  constructor(private readonly repo: UsuariosRepository) {}

  async listar(params: ListarUsuarios) {
    return this.repo.findPaginated(params);
  }

  async buscar(id: string) {
    const user = await this.repo.findById(id);
    if (!user) throw new NotFoundException(`Usuario ${id} no encontrado`);
    return user;
  }

  async crear(dto: CrearUsuario) {
    const existe = await this.repo.findByEmail(dto.email);
    if (existe) throw new ConflictException('Ese correo ya existe');
    return this.repo.create(dto);
  }

  async actualizar(id: string, dto: ActualizarUsuario) {
    await this.buscar(id);
    return this.repo.update(id, dto);
  }

  async borrar(id: string) {
    await this.buscar(id);
    await this.repo.delete(id);
  }
}
