import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { usuarios, type NuevoUsuario, type Usuario } from '../db/schema';

// esta es la interfaz: el servicio solo conoce esto, no sabe que hay Drizzle detras
export interface UsuarioRepository {
  buscarPorEmail(email: string): Promise<Usuario | null>;
  crear(datos: NuevoUsuario): Promise<Usuario>;
  listar(): Promise<Usuario[]>;
}

// esta es la implementacion real, la que habla con postgres
export class DrizzleUsuarioRepository implements UsuarioRepository {
  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const [fila] = await db.select().from(usuarios).where(eq(usuarios.email, email)).limit(1);
    return fila ?? null;
  }

  async crear(datos: NuevoUsuario): Promise<Usuario> {
    const [fila] = await db.insert(usuarios).values(datos).returning();
    return fila;
  }

  async listar(): Promise<Usuario[]> {
    return db.select().from(usuarios);
  }
}
