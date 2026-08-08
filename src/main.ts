import { DrizzleUsuarioRepository } from './usuarios/usuario.repository';
import { UsuariosService } from './usuarios/usuarios.service';

async function main() {
  const usuarioRepository = new DrizzleUsuarioRepository();
  const usuariosService = new UsuariosService(usuarioRepository);

  console.log('usuarios que ya estan en la base:');
  console.log(await usuariosService.listarTodos());

  const nuevo = await usuariosService.registrar({
    email: 'sara@correo.com',
    nombre: 'Sara',
  });
  console.log('usuario creado:', nuevo);

  try {
    await usuariosService.registrar({
      email: 'sara@correo.com',
      nombre: 'Sara otra vez',
    });
  } catch (error) {
    console.log('esto tenia que fallar:', (error as Error).message);
  }

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
