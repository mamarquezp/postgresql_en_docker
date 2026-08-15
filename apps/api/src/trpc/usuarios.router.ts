import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { crearUsuario, listarUsuarios } from '@flowcommerce/contracts';
import { UsuariosService } from '../usuarios/usuarios.service';

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

export const crearAppRouter = (svc: UsuariosService) => {
  const usuariosRouter = router({
    listar: publicProcedure
      .input(listarUsuarios)
      .query(({ input }) => svc.listar(input)),

    porId: publicProcedure
      .input(z.object({ id: z.uuid() }))
      .query(({ input }) => svc.buscar(input.id)),

    crear: publicProcedure
      .input(crearUsuario)
      .mutation(({ input }) => svc.crear(input)),
  });

  return router({
    usuarios: usuariosRouter,
  });
};

export type AppRouter = ReturnType<typeof crearAppRouter>;
