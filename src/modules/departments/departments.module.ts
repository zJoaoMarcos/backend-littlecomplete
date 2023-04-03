import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/database/prisma.service';
import { DepartmentsController } from './departments.controller';
import { DepartmentsRepository } from './repositories/departments-repository';
import PrismaDepartmentsRepository from './repositories/prisma/prisma-departments-repository';

@Module({
  controllers: [DepartmentsController],
  providers: [
    PrismaService,
    {
      provide: DepartmentsRepository,
      useClass: PrismaDepartmentsRepository,
    },
  ],
})
export class DepartmentsModule {}
