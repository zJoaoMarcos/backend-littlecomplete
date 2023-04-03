import { departments, Prisma } from '@prisma/client';

export abstract class DepartmentsRepository {
  abstract register(data: Prisma.departmentsCreateInput): Promise<departments>;
  abstract findById(
    departmentsWhereUniqueInput: Prisma.departmentsWhereUniqueInput,
  ): Promise<departments | null>;
  abstract findAll(): Promise<departments[]>;
}
