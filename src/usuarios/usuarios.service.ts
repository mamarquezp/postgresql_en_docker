import type { NuevoUsuario } from '../db/schema';
import type { UsuarioRepository } from './usuario.repository';

export class UsuariosService {
  // el servicio recibe el repositorio, no lo crea el mismo
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async registrar(datos: NuevoUsuario) {
    const existente = await this.usuarioRepository.buscarPorEmail(datos.email);
    if (existente) {
      throw new Error('ya existe un usuario con ese correo');
    }
    return this.usuarioRepository.crear(datos);
  }

  async buscarPorEmail(email: string) {
    return this.usuarioRepository.buscarPorEmail(email);
  }

  async listarTodos() {
    return this.usuarioRepository.listar();
  }
}
