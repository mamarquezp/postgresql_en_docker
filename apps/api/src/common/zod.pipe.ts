import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ZodPipe implements PipeTransform {
  constructor(private readonly esquema: ZodType) {}

  transform(valor: unknown) {
    const r = this.esquema.safeParse(valor);
    if (!r.success) {
      const errores = r.error.issues.map((err) => ({
        campo: err.path.join('.'),
        motivo: err.message,
      }));
      throw new BadRequestException({
        title: 'Datos inválidos',
        errors: errores,
      });
    }
    return r.data;
  }
}
