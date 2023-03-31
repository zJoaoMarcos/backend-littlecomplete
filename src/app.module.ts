import { Module } from '@nestjs/common';
import { DepartmentsController } from './controllers/departments.controller';
import { DepartmentsRepository } from './repositories/equipments-repository';
import PrismaDepartmentsRepository from './repositories/prisma/prisma-departments-repository';
import { PrismaService } from './services/database/prisma.service';

@Module({
  imports: [],
  controllers: [DepartmentsController],
  providers: [
    PrismaService,
    {
      provide: DepartmentsRepository,
      useClass: PrismaDepartmentsRepository,
    },
  ],
})
export class AppModule {}
