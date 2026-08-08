import { db } from './client';
import { proyectos, usuarios } from './schema';

async function seed() {
  // se borra primero para poder correr el script varias veces
  await db.delete(proyectos);
  await db.delete(usuarios);

  const [ana] = await db
    .insert(usuarios)
    .values({
      email: 'ana@correo.com',
      nombre: 'Ana',
      rol: 'admin',
    })
    .returning();

  const [luis] = await db
    .insert(usuarios)
    .values({
      email: 'luis@correo.com',
      nombre: 'Luis',
      rol: 'lector',
    })
    .returning();

  await db.insert(proyectos).values([
    { nombre: 'Proyecto 1', propietarioId: ana.id },
    { nombre: 'Proyecto 2', propietarioId: ana.id },
    { nombre: 'Proyecto de Luis', propietarioId: luis.id },
  ]);

  console.log('datos de prueba insertados');
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
