import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/core/entity/department';
import { Equipment } from 'src/core/entity/equipment';
import { DepartmentRepositoryInterface } from 'src/core/repository/department-repository';
import { EquipmentRepositoryInterface } from 'src/core/repository/equipment-repository';
import { CreateEquipmentUseCase } from 'src/core/use-cases/equipment/create-equipment';
import { FindAllEquipmentsUseCase } from 'src/core/use-cases/equipment/find-all-equipments';
import { InMemoryDepartmentRepository } from 'src/infra/repository/in-memory/in-memory-department-repository';
import { InMemoryEquipmentRepository } from 'src/infra/repository/in-memory/in-memory-equipment-repository';
import { EquipmentsController } from './equipments.controller';
import { EquipmentsService } from './equipments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Equipment])],
  controllers: [EquipmentsController],
  providers: [
    EquipmentsService,
    {
      provide: InMemoryEquipmentRepository,
      useClass: InMemoryEquipmentRepository,
    },
    {
      provide: InMemoryDepartmentRepository,
      useClass: InMemoryDepartmentRepository,
    },
    {
      provide: CreateEquipmentUseCase,
      useFactory: (
        equipmentRepo: EquipmentRepositoryInterface,
        departmentRepo: DepartmentRepositoryInterface,
      ) => {
        return new CreateEquipmentUseCase(equipmentRepo, departmentRepo);
      },
      inject: [InMemoryEquipmentRepository, InMemoryDepartmentRepository],
    },
    {
      provide: FindAllEquipmentsUseCase,
      useFactory: (equipmentRepo: EquipmentRepositoryInterface) => {
        return new FindAllEquipmentsUseCase(equipmentRepo);
      },
      inject: [InMemoryEquipmentRepository],
    },
  ],
})
export class EquipmentsModule {}
