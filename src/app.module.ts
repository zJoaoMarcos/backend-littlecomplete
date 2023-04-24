import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentSchema } from './infra/repository/typeorm/entities/department.schema';
import { EquipmentSchema } from './infra/repository/typeorm/entities/equipments-schema';
import { EquipmentUserSchema } from './infra/repository/typeorm/entities/equipments-user.schema';
import { UserSchema } from './infra/repository/typeorm/entities/user.schema';
import { DepartmentsModule } from './modules/departments/departments.module';
import { EquipmentsModule } from './modules/equipments/equipments.module';
import { UsersModule } from './modules/users/users.module';
import { UserAssignmentsModule } from './modules/user-assignments/user-assignments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      entities: [
        DepartmentSchema,
        EquipmentSchema,
        EquipmentUserSchema,
        UserSchema,
      ],
    }),
    DepartmentsModule,
    EquipmentsModule,
    UsersModule,
    UserAssignmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
