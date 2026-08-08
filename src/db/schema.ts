import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const rolEnum = pgEnum('rol', ['admin', 'editor', 'lector']);

export const usuarios = pgTable('usuarios', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  nombre: text('nombre').notNull(),
  rol: rolEnum('rol').notNull().default('lector'),
  creadoEn: timestamp('creado_en', { withTimezone: true }).notNull().defaultNow(),
});

export const proyectos = pgTable('proyectos', {
  id: uuid('id').primaryKey().defaultRandom(),
  nombre: text('nombre').notNull(),
  propietarioId: uuid('propietario_id')
    .notNull()
    .references(() => usuarios.id, { onDelete: 'cascade' }),
  creadoEn: timestamp('creado_en', { withTimezone: true }).notNull().defaultNow(),
});

export type Usuario = typeof usuarios.$inferSelect;
export type NuevoUsuario = typeof usuarios.$inferInsert;
export type Proyecto = typeof proyectos.$inferSelect;
export type NuevoProyecto = typeof proyectos.$inferInsert;
