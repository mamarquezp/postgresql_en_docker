import { Injectable } from '@nestjs/common';
import { and, asc, count, eq, gt, ilike } from 'drizzle-orm';
import { db } from '../db';
import { usuarios } from '../db/schema';
import { CrearUsuario, ActualizarUsuario, ListarUsuarios } from '@flowcommerce/contracts';

@Injectable()
export class UsuariosRepository {
  async findPaginated({ limite, cursor, buscar }: ListarUsuarios) {
    const filas = await db
      .select()
      .from(usuarios)
      .where(
        and(
          cursor ? gt(usuarios.id, cursor) : undefined,
          buscar ? ilike(usuarios.nombre, `%${buscar}%`) : undefined,
        ),
      )
      .orderBy(asc(usuarios.id))
      .limit(limite + 1); // uno de más: ¿hay siguiente?

    const hayMas = filas.length > limite;
    const datos = filas.slice(0, limite);
    const [{ total }] = await db.select({ total: count() }).from(usuarios);

    return {
      datos,
      siguiente: hayMas ? datos[datos.length - 1].id : null,
      total,
    };
  }

  async findById(id: string) {
    const [user] = await db.select().from(usuarios).where(eq(usuarios.id, id));
    return user ?? null;
  }

  async findByEmail(email: string) {
    const [user] = await db.select().from(usuarios).where(eq(usuarios.email, email));
    return user ?? null;
  }

  async create(dto: CrearUsuario) {
    const [user] = await db.insert(usuarios).values(dto).returning();
    return user;
  }

  async update(id: string, dto: ActualizarUsuario) {
    const [user] = await db.update(usuarios).set(dto).where(eq(usuarios.id, id)).returning();
    return user;
  }

  async delete(id: string) {
    await db.delete(usuarios).where(eq(usuarios.id, id));
  }
}
