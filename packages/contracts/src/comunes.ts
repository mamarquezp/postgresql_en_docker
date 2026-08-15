import { z, ZodType } from 'zod';

export const paginado = <T extends ZodType>(item: T) =>
  z.object({
    datos: z.array(item),
    siguiente: z.string().nullable(),
    total: z.number().int(),
  });