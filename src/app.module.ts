import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentSchema } from './infra/repository/typeorm/entities/department.schema';
import { EquipmentSchema } from './infra/repository/typeorm/entities/equipments-schema';
import { EquipmentUserSchema } from './infra/repository/typeorm/entities/equipments-user.schema';
import { UserSchema } from './infra/repository/typeorm/entities/user.schema';
import { DepartmentsModule } from './modules/departments/departments.module';
import { EquipmentsModule } from './modules/equipments/equipments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'dev',
      host: 'localhost',
      port: 5432,
      username: 'docker',
      password: 'docker',
      entities: [
        DepartmentSchema,
        EquipmentSchema,
        EquipmentUserSchema,
        UserSchema,
      ],
    }),
    DepartmentsModule,
    EquipmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
