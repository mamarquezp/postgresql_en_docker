import { z } from 'zod';
import { paginado } from './comunes';

export const crearUsuario = z.object({
  nombre: z.string().trim().min(3).max(80),
  email: z.string().trim().email(),
  rol: z.enum(['admin', 'usuario']).default('usuario'),
}).strict(); // .strict() para rechazar campos no definidos con 400

export type CrearUsuario = z.infer<typeof crearUsuario>;

export const actualizarUsuario = crearUsuario.partial();
export type ActualizarUsuario = z.infer<typeof actualizarUsuario>;

export const usuario = crearUsuario.extend({
  id: z.string().uuid(),
  creadoEn: z.string().datetime(),
});
export type Usuario = z.infer<typeof usuario>;

export const listarUsuarios = z.object({
  limite: z.coerce.number().int().min(1).max(100).default(20),
  cursor: z.string().optional(),
  buscar: z.string().trim().toLowerCase().optional(),
});
export type ListarUsuarios = z.infer<typeof listarUsuarios>;

export const usuariosPagina = paginado(usuario);