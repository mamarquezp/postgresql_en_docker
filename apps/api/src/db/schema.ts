import { pgTable, uuid, varchar, pgEnum, timestamp } from 'drizzle-orm/pg-core';

export const rolEnum = pgEnum('rol', ['admin', 'usuario']);

export const usuarios = pgTable('usuarios', {
  id: uuid('id').primaryKey().defaultRandom(),
  nombre: varchar('nombre', { length: 80 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  rol: rolEnum('rol').notNull().default('usuario'),
  creadoEn: timestamp('creado_en', { withTimezone: true }).notNull().defaultNow(),
});
